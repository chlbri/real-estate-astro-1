import type { Property, PropertyType } from '@-backend/data/main';
import { EVENTS, MACHINES } from '@-constants/objects';
import { DEFAULT_EVENT_DELIMITER } from '@-constants/strings';
import { isBrowser } from '@-utils/environment';
import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';
import { raise, send } from 'xstate/lib/actions';
import type { QueryFilter } from './filter.machine';
import type { BeforeQuery } from './queryBuilder.machine';

type HydrationData = {
  filtered?: Property[];
  filters?: BeforeQuery;
};

export type Context = {
  cache: {
    countries?: Set<string>;
    types?: Set<PropertyType>;
    query?: QueryFilter;
    //TODO: To implement a invalidating system
    prevQuery?: QueryFilter;
    lastQueryDate?: number;
  };
  ui: {
    dropdowns: {
      country: {
        current?: string;
        open?: boolean;
        default: string;
      };
      type: {
        current?: string;
        open?: boolean;
        default: string;
      };
    };
    inputs: {
      price: {
        inferiorOrEqualTo: {
          editing: boolean;
          current?: string;
          default: string;
        };
        superiorOrEqualTo: {
          editing: boolean;
          current?: string;
          default: string;
        };
      };
    };
    data: {
      filtered?: Property[];
    };
    timeouts: {
      inferiorFocusInterval?: ReturnType<typeof setTimeout>;
      superiorFocusInterval?: ReturnType<typeof setTimeout>;
    };
  };
};

const COUNTRY_EVENTS = {
  TOGGLE: `${MACHINES.DROPDOWNS.COUNTRY}${DEFAULT_EVENT_DELIMITER}${EVENTS.TOGGLE}`,
  VALUE: `${MACHINES.DROPDOWNS.COUNTRY}${DEFAULT_EVENT_DELIMITER}${EVENTS.VALUE}`,
} as const;

const TYPE_EVENTS = {
  TOGGLE: `${MACHINES.DROPDOWNS.TYPE}${DEFAULT_EVENT_DELIMITER}${EVENTS.TOGGLE}`,
  VALUE: `${MACHINES.DROPDOWNS.TYPE}${DEFAULT_EVENT_DELIMITER}${EVENTS.VALUE}`,
} as const;

export type Events =
  | { type: '__RINIT__' }
  | { type: 'RESET_INPUTS' }
  | { type: 'SET_PRICE_INFERIOR'; value?: string }
  | { type: 'SET_PRICE_SUPERIOR'; value?: string }
  | {
      type: typeof COUNTRY_EVENTS['TOGGLE'] | typeof TYPE_EVENTS['TOGGLE'];
    }
  | { type: 'QUERY'; query?: BeforeQuery }
  | {
      type: typeof COUNTRY_EVENTS['VALUE'] | typeof TYPE_EVENTS['VALUE'];
      value?: string;
    };

const machine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./main2.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as {
        generateLists: {
          data: { types?: Set<PropertyType>; countries?: Set<string> };
        };
        saveFiltered: { data: void };
        hydrateResearch: { data: HydrationData | undefined };
        filterMachine: { data: Property[] };
        dropdownMachine: { data: string };
        queryBuilderMachine: { data: QueryFilter | undefined };
      },
    },

    on: {
      __RINIT__: {
        actions: ['resetCache', 'resetInputs'],
        target: 'idle',
      },
      QUERY: '#querying',
    },

    initial: 'idle',

    states: {
      idle: {
        always: 'starting',
      },
      starting: {
        invoke: {
          src: 'generateLists',
          onDone: [
            {
              target: 'waiting',
              cond: 'isBrowser',
              actions: ['generateLists', 'resetInputs'],
            },
            {
              target: 'working',
              actions: ['generateLists', 'resetInputs'],
            },
          ],
        },
      },
      waiting: {
        tags: ['busy'],
        after: {
          TIME_BETWEEN_REQUESTS: 'hydration',
        },
      },
      hydration: {
        tags: ['busy'],
        invoke: {
          src: 'hydrateResearch',
          onDone: [
            {
              target: 'working',
              actions: ['hydrateResearch'],
            },
          ],
        },
      },
      working: {
        initial: 'ui',
        states: {
          ui: {
            id: 'ui',
            type: 'parallel',
            states: {
              dropdowns: {
                states: {
                  country: {
                    invoke: {
                      id: MACHINES.DROPDOWNS.COUNTRY,
                      src: 'dropdownMachine',
                      data: {
                        name: MACHINES.DROPDOWNS.COUNTRY,
                      },
                      onDone: { actions: 'sendQuery' },
                      onError: '#(machine)',
                    },
                    on: {
                      [COUNTRY_EVENTS.TOGGLE]: {
                        actions: [
                          'sendFilterCountry',
                          'assignCountryFilter',
                        ],
                      },
                      [COUNTRY_EVENTS.VALUE]: {
                        actions: ['sendToggleCountry', 'toggleCountry'],
                      },
                    },
                  },

                  type: {
                    invoke: {
                      id: MACHINES.DROPDOWNS.TYPE,
                      src: 'dropdownMachine',
                      data: {
                        name: MACHINES.DROPDOWNS.TYPE,
                      },
                      onDone: '#querying',
                      onError: '#(machine)',
                    },
                    on: {
                      [TYPE_EVENTS.TOGGLE]: {
                        actions: ['sendFilterType', 'assignTypeFilter'],
                      },
                      [TYPE_EVENTS.VALUE]: {
                        actions: ['sendToggleType', 'toggleType'],
                      },
                    },
                  },
                },
              },
              inputs: {
                type: 'parallel',
                states: {
                  superiorOrEqualTo: {},
                  inferiorOrEqualTo: {},
                },
              },
            },
          },
          querying: {
            id: 'querying',
            initial: 'building',
            states: {
              building: {
                entry: ['query'],
                invoke: {
                  src: 'queryBuilderMachine',
                  data: (context) => {
                    return {
                      name: 'INFERIOR',
                      ...context.cache.query,
                    };
                  },
                  onError: '#ui',
                  onDone: {
                    actions: ['buildQuery'],
                    target: 'filtering',
                  },
                },
              },
              filtering: {
                invoke: {
                  src: 'filterMachine',
                  data: (context) => {
                    return {
                      name: 'INFERIOR',
                      ...context.cache.query,
                    };
                  },
                  onDone: {
                    actions: ['filter'],
                    target: '#ui',
                  },
                  onError: '#ui',
                },
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      generateLists: assign((context, { data }) => {
        context.cache.countries = data.countries;
        context.cache.types = data.types;
      }),

      query: send(
        (context) => {
          const country = context.ui.dropdowns.country.current;
          const type = context.ui.dropdowns.type.current;
          const inferiorOrEqualTo =
            context.ui.inputs.price.inferiorOrEqualTo.current;
          const superiorOrEqualTo =
            context.ui.inputs.price.superiorOrEqualTo.current;

          return {
            type: 'QUERY',
            query: {
              country,
              type,
              inferiorOrEqualTo,
              superiorOrEqualTo,
            },
          };
        },
        { to: 'queryBuilderMachine' }
      ),

      sendQuery: raise<Context, Events>('QUERY') as any,

      buildQuery: assign((context, { data }) => {
        context.cache.query = data;
      }),

      hydrateResearch: assign((context, { data }) => {
        context.ui.data.filtered = data?.filtered;
        context.ui.dropdowns.country.current = data?.filters?.country;
        context.ui.dropdowns.type.current = data?.filters?.type;
        context.ui.inputs.price.inferiorOrEqualTo.current =
          data?.filters?.inferiorOrEqualTo;
        context.ui.inputs.price.superiorOrEqualTo.current =
          data?.filters?.superiorOrEqualTo;
      }),

      filter: assign((context, { data }) => {
        context.ui.data.filtered = data;
      }),
    },
    guards: {
      isBrowser,
    },
  }
);

export default machine;
