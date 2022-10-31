import { MAIN_DATA, Property, PropertyType } from '@-backend/data/main';
import { EVENTS, MACHINES } from '@-constants/objects';
import { ALL_OPTIONS, LOCAL_STORAGE_ID } from '@-constants/strings';
import { isBrowser } from '@-utils/environment';
import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';
import { forwardTo, send } from 'xstate/lib/actions';
import { dropdownMachine } from './dropdown.machine';
import { filterMachine, QueryFilter } from './filter.machine';
import { hydrationMachine } from './hydration.machine';
import { inputMachine } from './input.machine';
import { BeforeQuery, queryBuilderMachine } from './queryBuilder.machine';

type HydrationData = {
  filtered?: Property[];
  currentQuery: BeforeQuery;
};

export type Context = {
  cache: {
    countries?: Set<string>;
    types?: Set<PropertyType>;
    query?: QueryFilter;
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
          current?: string;
          default: string;
        };
        superiorOrEqualTo: {
          current?: string;
          default: string;
        };
      };
    };
    data: {
      filtered?: Property[];
      currentQuery?: BeforeQuery;
      previousQuery?: BeforeQuery;
    };
    timeouts: {
      inferiorFocusInterval?: ReturnType<typeof setTimeout>;
      superiorFocusInterval?: ReturnType<typeof setTimeout>;
    };
  };
};

// #region Events
export type Events =
  | {
      type:
        | '__RINIT__'
        | 'RESET_INPUTS'
        | 'COUNTRY/TOGGLE'
        | 'TYPE/TOGGLE'
        | 'HYDRATE'
        | 'START_QUERY';
    }
  | {
      type: 'CHILD/COUNTRY/TOGGLE' | 'CHILD/TYPE/TOGGLE';
      open?: boolean;
    }
  | { type: 'QUERY'; query?: BeforeQuery }
  | {
      type:
        | 'COUNTRY/INPUT'
        | 'CHILD/COUNTRY/INPUT'
        | 'TYPE/INPUT'
        | 'CHILD/TYPE/INPUT'
        | 'SUPERIOR_OR_EQUAL_TO/INPUT'
        | 'CHILD/SUPERIOR_OR_EQUAL_TO/INPUT'
        | 'INFERIOR_OR_EQUAL_TO/INPUT'
        | 'CHILD/INFERIOR_OR_EQUAL_TO/INPUT';

      input?: string;
    };
// #endregion

export const machine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./main.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as {
        generateLists: {
          data: { types?: Set<PropertyType>; countries?: Set<string> };
        };
        saveFiltered: { data: void };
        hydrationMachine: { data: HydrationData | undefined };
        filterMachine: { data: Property[] | undefined };
        dropdownMachine: { data: void };
        inputMachine: { data: void };
        queryBuilderMachine: { data: QueryFilter | undefined };
      },
    },

    on: {
      __RINIT__: [
        {
          cond: 'isBrowser',
          actions: ['resetCache', 'resetInputs'],
          target: 'rinit',
        },
        {
          actions: ['resetCache', 'resetInputs'],
          target: 'idle',
        },
      ],
    },

    initial: 'idle',

    states: {
      idle: {
        always: 'starting',
      },
      rinit: {
        invoke: {
          src: 'resestLocalQuery',
          onDone: { target: 'starting', actions: ['resetFiltered'] },
          onError: { target: 'starting' },
        },
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
        on: {
          HYDRATE: 'hydration',
        },
      },
      hydration: {
        tags: ['busy'],
        invoke: {
          src: 'hydrationMachine',
          onDone: {
            target: 'working',
            actions: ['hydrate'],
          },
          onError: 'working',
        },
      },
      working: {
        id: 'working',
        on: {
          // #region Country
          'COUNTRY/INPUT': {
            actions: ['sendInputCountry'],
          },
          'CHILD/COUNTRY/INPUT': {
            actions: ['assignInputCountry'],
          },
          'COUNTRY/TOGGLE': {
            actions: ['sendToggleCountry'],
          },
          'CHILD/COUNTRY/TOGGLE': {
            actions: ['toggleCountry'],
          },
          // #endregion

          // #region Type
          'TYPE/INPUT': {
            actions: ['sendInputType'],
          },
          'CHILD/TYPE/INPUT': {
            actions: ['assignInputType'],
          },
          'TYPE/TOGGLE': {
            actions: ['sendToggleType'],
          },
          'CHILD/TYPE/TOGGLE': {
            actions: ['toggleType'],
          },
          // #endregion

          // #region Price
          'SUPERIOR_OR_EQUAL_TO/INPUT': {
            actions: ['sendInputSuperior'],
          },
          'CHILD/SUPERIOR_OR_EQUAL_TO/INPUT': {
            actions: ['assignInputSuperior'],
          },

          'INFERIOR_OR_EQUAL_TO/INPUT': {
            actions: ['sendInputInferior'],
          },
          'CHILD/INFERIOR_OR_EQUAL_TO/INPUT': {
            actions: ['assignInputInferior'],
          },
          // #endregion

          // #region Query
          START_QUERY: {
            actions: ['concatValuesForQuery', 'sendQuery'],
            target: '.querying',
          },

          QUERY: {
            actions: ['forward'],
          },
          // #endregion
        },
        type: 'parallel',
        states: {
          ui: {
            type: 'parallel',
            states: {
              dropdowns: {
                type: 'parallel',
                states: {
                  country: {
                    invoke: {
                      id: MACHINES.DROPDOWNS.COUNTRY,
                      src: 'dropdownMachine',
                      data: {
                        name: MACHINES.DROPDOWNS.COUNTRY,
                      },
                      onError: '#(machine)',
                    },
                  },
                  type: {
                    invoke: {
                      id: MACHINES.DROPDOWNS.TYPE,
                      src: 'dropdownMachine',
                      data: {
                        name: MACHINES.DROPDOWNS.TYPE,
                      },
                      onError: '#(machine)',
                    },
                  },
                },
              },
              inputs: {
                type: 'parallel',
                states: {
                  superiorOrEqualTo: {
                    invoke: {
                      id: MACHINES.INPUTS.PRICE.SUPERIOR_OR_EQUAL_TO,
                      src: 'inputMachine',
                      data: {
                        name: MACHINES.INPUTS.PRICE.SUPERIOR_OR_EQUAL_TO,
                      },
                      onError: '#(machine)',
                    },
                  },
                  inferiorOrEqualTo: {
                    invoke: {
                      id: MACHINES.INPUTS.PRICE.INFERIOR_OR_EQUAL_TO,
                      src: 'inputMachine',
                      data: {
                        name: MACHINES.INPUTS.PRICE.INFERIOR_OR_EQUAL_TO,
                      },
                      onError: '#(machine)',
                    },
                  },
                },
              },
            },
          },
          querying: {
            initial: 'idle',
            states: {
              idle: {
                entry: ['resetQuery'],
                always: 'building',
              },
              building: {
                invoke: {
                  id: 'queryBuilderMachine',
                  src: 'queryBuilderMachine',
                  data: (context) => {
                    const previousQuery = context.ui.data.previousQuery;
                    const currentQuery = context.ui.data.previousQuery;
                    const date = context.cache.lastQueryDate;
                    return {
                      previousQuery,
                      currentQuery,
                      date,
                    };
                  },
                  onDone: {
                    actions: ['buildQuery'],
                    target: 'filtering',
                  },
                  onError: '#(machine)',
                },
              },
              filtering: {
                tags: ['busy'],
                invoke: {
                  src: 'filterMachine',
                  data: (context) => {
                    return {
                      name: 'ALL',
                      ...context.cache.query,
                    };
                  },
                  onDone: {
                    actions: ['filter'],
                    target: 'idle',
                  },
                  onError: '#(machine)',
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
      // #region Begining
      resetCache: assign((context) => {
        context.cache = {};
      }),

      resetFiltered: assign((context) => {
        context.ui.data.filtered = undefined;
      }),

      resetInputs: assign((context) => {
        context.ui.dropdowns.country.open = false;
        context.ui.dropdowns.country.current = undefined;

        context.ui.dropdowns.type.open = false;
        context.ui.dropdowns.type.current = undefined;

        context.ui.inputs.price.inferiorOrEqualTo.current = undefined;
        context.ui.inputs.price.superiorOrEqualTo.current = undefined;
      }),

      generateLists: assign((context, { data }) => {
        context.cache.countries = data.countries;
        context.cache.types = data.types;
      }),

      hydrate: assign((context, { data }) => {
        context.ui.data.filtered = data?.filtered;
        context.ui.dropdowns.country.current = data?.currentQuery.country;
        context.ui.dropdowns.type.current = data?.currentQuery.type;
        context.ui.inputs.price.inferiorOrEqualTo.current =
          data?.currentQuery.inferiorOrEqualTo;
        context.ui.inputs.price.superiorOrEqualTo.current =
          data?.currentQuery.superiorOrEqualTo;
      }),
      // #endregion

      // #region Country
      assignInputCountry: assign((context, { input }) => {
        context.ui.dropdowns.country.current = input;
      }),

      sendInputCountry: send(
        (_, { input }) => ({
          type: EVENTS.INPUT,
          input,
        }),
        { to: MACHINES.DROPDOWNS.COUNTRY }
      ),

      toggleCountry: assign((context, { open }) => {
        context.ui.dropdowns.country.open = open;
      }),

      sendToggleCountry: send('TOGGLE', {
        to: MACHINES.DROPDOWNS.COUNTRY,
      }),
      // #endregion

      // #region Type
      assignInputType: assign((context, { input }) => {
        context.ui.dropdowns.type.current = input;
      }),

      sendInputType: send(
        (_, { input }) => ({
          type: EVENTS.INPUT,
          input,
        }),
        { to: MACHINES.DROPDOWNS.TYPE }
      ),

      toggleType: assign((context, { open }) => {
        context.ui.dropdowns.type.open = open;
      }),

      sendToggleType: send('TOGGLE', {
        to: MACHINES.DROPDOWNS.TYPE,
      }),
      // #endregion

      // #region Price
      sendInputSuperior: send(
        (_, { input }) => ({
          type: EVENTS.INPUT,
          input,
        }),
        { to: MACHINES.INPUTS.PRICE.SUPERIOR_OR_EQUAL_TO, delay: 10 }
      ),

      assignInputSuperior: assign((context, { input }) => {
        context.ui.inputs.price.superiorOrEqualTo.current = input;
      }),

      sendInputInferior: send(
        (_, { input }) => ({
          type: EVENTS.INPUT,
          input,
        }),
        { to: MACHINES.INPUTS.PRICE.INFERIOR_OR_EQUAL_TO, delay: 10 }
      ),

      assignInputInferior: assign((context, { input }) => {
        context.ui.inputs.price.inferiorOrEqualTo.current = input;
      }),
      // #endregion

      // #region Query
      concatValuesForQuery: assign((context) => {
        const country = context.ui.dropdowns.country.current;
        const type = context.ui.dropdowns.type.current;
        const superiorOrEqualTo =
          context.ui.inputs.price.superiorOrEqualTo.current;
        const inferiorOrEqualTo =
          context.ui.inputs.price.inferiorOrEqualTo.current;

        context.ui.data.currentQuery = {
          country,
          type,
          superiorOrEqualTo,
          inferiorOrEqualTo,
        };
      }),

      sendQuery: send((context) => {
        const query = context.ui.data.currentQuery;
        return { type: 'QUERY', query };
      }),

      forward: forwardTo('queryBuilderMachine'),

      buildQuery: assign((context, { data }) => {
        context.cache.query = data;
      }),

      filter: assign((context, { data }) => {
        context.ui.data.filtered = data;
      }),

      resetQuery: assign((context) => {
        context.cache.query = undefined;
      }),

      // #endregion
    },

    guards: {
      isBrowser,
    },

    services: {
      dropdownMachine,
      filterMachine,
      inputMachine,
      queryBuilderMachine,
      hydrationMachine,

      generateLists: async () => {
        const types = new Set(MAIN_DATA.map((data) => data.type));
        types.add(ALL_OPTIONS);
        const countries = new Set(MAIN_DATA.map((data) => data.country));
        countries.add(ALL_OPTIONS);
        return { types, countries };
      },

      resestLocalQuery: async () => {
        localStorage.removeItem(LOCAL_STORAGE_ID);
      },
    },
  }
);

export default machine;
