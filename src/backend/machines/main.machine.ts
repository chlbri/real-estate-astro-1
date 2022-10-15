import {
  INTERVAL_RETURN,
  INTERVAL_SWITCH,
  THROTTLE_TIME,
  TIME_BETWEEN_REQUESTS,
} from '@-constants/numbers';
import {
  ALL_OPTIONS,
  inferiorOrEqualToID,
  LOCAL_STORAGE_ID,
  superiorOrEqualToID,
} from '@-constants/strings';
import { isBrowser } from '@-utils/environment';
import { assign } from '@xstate/immer';
import { createMachine, EventFrom, StateFrom } from 'xstate';
import { MAIN_DATA, Property, PropertyType } from '../data/main';
import { filterMachine } from './filter.machine';

export type Context = {
  cache: {
    countries?: Set<string>;
    types?: Set<PropertyType>;
    query?: {
      country?: string;
      type?: string;
      inferiorOrEqualTo?: number;
      superiorOrEqualTo?: number;
    };
    //TODO: To implement a invalidating system
    prevQuery?: {
      country?: string;
      type?: string;
      inferiorOrEqualTo?: number;
      superiorOrEqualTo?: number;
      date?: number;
    };
  };
  ui: {
    dropdowns: {
      country: {
        editing: boolean;
        current?: string;
        open: boolean;
        default: string;
      };
      type: {
        editing: boolean;
        current?: string;
        open: boolean;
        default: string;
      };
    };
    inputs: {
      price: {
        inferiorOrEqualTo: {
          editing: boolean;
          current?: string;
        };
        superiorOrEqualTo: {
          editing: boolean;
          current?: string;
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

export type Events =
  | { type: '__RINIT__' }
  | { type: 'RESET_INPUTS' }
  | { type: 'SET_PRICE_INFERIOR'; value?: string }
  | { type: 'SET_PRICE_SUPERIOR'; value?: string }
  | { type: 'TOGGLE_DROPDOWN_COUNTRY' }
  | { type: 'TOGGLE_DROPDOWN_TYPE' }
  | { type: 'FILTER_BY_COUNTRY'; country?: string }
  | { type: 'FILTER_BY_TYPE'; propertyType?: PropertyType };

export type HydrationData = {
  filtered?: Property[];
  filters?: {
    inferiorOrEqualTo?: string;
    superiorOrEqualTo?: string;
    country?: string;
    type?: string;
  };
};

export const intialContext: Context = {
  cache: {},
  ui: {
    dropdowns: {
      country: {
        editing: false,
        open: false,
        default: 'Select yout place',
      },
      type: {
        editing: false,
        open: false,
        default: 'Select type',
      },
    },
    inputs: {
      price: {
        inferiorOrEqualTo: {
          editing: false,
        },
        superiorOrEqualTo: {
          editing: false,
        },
      },
    },
    data: {},
    timeouts: {},
  },
};

const commonStates = {
  filtering: {
    tags: ['busy'],
    entry: ['buildQuery'],
    invoke: {
      src: 'filterMachine',

      onDone: [
        {
          actions: ['filter'],
          target: 'hydration',
          cond: 'isBrowser',
        },
        {
          actions: ['filter'],
          target: 'busy',
        },
      ],
      onError: 'filter',
    },
  },
  hydration: {
    tags: ['busy'],
    invoke: {
      src: 'saveFiltered',
      onDone: 'busy',
      onError: 'filter',
    },
  },
  busy: {
    tags: ['busy'],
    after: {
      TIME_BETWEEN_REQUESTS: 'filter',
    },
  },
};

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
        hydrateResearch: { data: HydrationData | undefined };
        filterMachine: { data: Property[] };
      },
    },
    context: intialContext,

    on: {
      __RINIT__: {
        actions: ['resetCache', 'resetInputs'],
        target: 'idle',
      },
    },

    initial: 'idle',
    states: {
      idle: {
        always: {
          target: 'starting',
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
        type: 'parallel',
        on: {
          RESET_INPUTS: {
            actions: ['resetInputs'],
          },
        },
        states: {
          dropdowns: {
            type: 'parallel',
            states: {
              country: {
                initial: 'filter',
                on: {
                  FILTER_BY_COUNTRY: {
                    actions: ['assignFilterCountry'],
                    target: '.filter',
                    internal: false,
                  },
                  TOGGLE_DROPDOWN_COUNTRY: {
                    actions: ['toggleCountryDropdown'],
                  },
                },
                states: {
                  filter: {
                    after: {
                      THROTTLE_TIME: {
                        cond: 'isCountryEditing',
                        target: 'filtering',
                      },
                    },
                  },
                  filtering: {
                    entry: ['resetFilterCountry', 'buildQuery'],
                    invoke: {
                      src: 'filterMachine',
                      data: (context) => {
                        return {
                          name: 'COUNTRY',
                          ...context.cache.query,
                        };
                      },
                      onDone: {
                        actions: ['filter'],
                        target: 'filter',
                      },
                      onError: 'filter',
                    },
                  },
                },
              },
              type: {
                initial: 'filter',
                on: {
                  FILTER_BY_TYPE: {
                    actions: ['assignFilterType'],
                    target: '.filter',
                    internal: false,
                  },
                  TOGGLE_DROPDOWN_TYPE: {
                    actions: ['toggleTypeDropdown'],
                  },
                },
                states: {
                  filter: {
                    after: {
                      THROTTLE_TIME: {
                        cond: 'isTypeEditing',
                        target: 'filtering',
                      },
                    },
                  },
                  filtering: {
                    entry: ['resetFilterType', 'buildQuery'],
                    invoke: {
                      src: 'filterMachine',
                      data: (context) => {
                        return {
                          name: 'TYPE',
                          ...context.cache.query,
                        };
                      },
                      onDone: {
                        actions: ['filter'],
                        target: 'filter',
                      },
                      onError: 'filter',
                    },
                  },
                },
              },
            },
          },
          inputs: {
            type: 'parallel',
            states: {
              price: {
                type: 'parallel',
                states: {
                  inferiorTo: {
                    id: 'inferiorTo',
                    initial: 'filter',
                    states: {
                      filter: {
                        on: {
                          SET_PRICE_INFERIOR: {
                            target: 'filter',
                            cond: 'isInputNumber',
                            actions: ['setPriceInferior', 'clearTimeouts'],
                          },
                        },
                        after: {
                          THROTTLE_TIME: {
                            cond: 'isInferiorOrEqualEditing',
                            target: 'checking',
                          },
                        },
                      },
                      checking: {
                        exit: [
                          'resetFilterSuperiorOrEqualTo',
                          'resetFilterInferiorOrEqualTo',
                        ],
                        always: [
                          {
                            cond: 'inferiorAndSuperiorAreSet',
                            target: 'filtering',
                          },
                          {
                            target: 'filter',
                            cond: 'isBrowser',
                            actions: ['focusSuperiorOrEqualTo'],
                          },
                          'filter',
                        ],
                      },
                      filtering: {
                        entry: ['buildQuery'],
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
                            target: 'filter',
                          },
                          onError: 'filter',
                        },
                      },
                    },
                  },
                  superiorTo: {
                    id: 'superiorTo',
                    initial: 'filter',
                    states: {
                      filter: {
                        on: {
                          SET_PRICE_SUPERIOR: {
                            target: 'filter',
                            cond: 'isInputNumber',
                            actions: ['setPriceSuperior', 'clearTimeouts'],
                          },
                        },
                        after: {
                          THROTTLE_TIME: {
                            cond: 'isSuperiorOrEqualEditing',
                            target: 'checking',
                          },
                        },
                      },
                      checking: {
                        exit: [
                          'resetFilterSuperiorOrEqualTo',
                          'resetFilterInferiorOrEqualTo',
                        ],
                        always: [
                          {
                            cond: 'inferiorAndSuperiorAreSet',
                            target: 'filtering',
                          },
                          {
                            target: 'filter',
                            cond: 'isBrowser',
                            actions: ['focusInferiorOrEqualTo'],
                          },
                          'filter',
                        ],
                      },
                      filtering: {
                        entry: ['buildQuery'],
                        invoke: {
                          src: 'filterMachine',
                          data: (context) => {
                            return {
                              name: 'SUPERIOR',
                              ...context.cache.query,
                            };
                          },
                          onDone: {
                            actions: ['filter'],
                            target: 'filter',
                          },
                          onError: 'filter',
                        },
                      },
                    },
                  },
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
      // #region Beginning
      hydrateResearch: assign((context, { data }) => {
        context.ui.data.filtered = data?.filtered;
        context.ui.dropdowns.country.current = data?.filters?.country;
        context.ui.dropdowns.type.current = data?.filters?.type;
        context.ui.inputs.price.inferiorOrEqualTo.current =
          data?.filters?.inferiorOrEqualTo;
        context.ui.inputs.price.superiorOrEqualTo.current =
          data?.filters?.superiorOrEqualTo;
      }),

      resetCache: assign((context) => {
        context.cache = {};
      }),

      generateLists: assign((context, { data }) => {
        context.cache.countries = data.countries;
        context.cache.types = data.types;
      }),

      resetInputs: assign((context) => {
        context.ui.dropdowns.country = {
          ...context.ui.dropdowns.country,
          editing: false,
          open: false,
          current: undefined,
        };

        context.ui.dropdowns.type = {
          ...context.ui.dropdowns.type,
          editing: false,
          open: false,
          current: undefined,
        };

        context.ui.inputs.price = {
          inferiorOrEqualTo: { editing: false },
          superiorOrEqualTo: { editing: false },
        };
      }),
      // #endregion

      // #region Country
      assignFilterCountry: assign((context, { country }) => {
        context.ui.dropdowns.country.current = country;
        context.ui.dropdowns.country.editing = true;
      }),

      resetFilterCountry: assign((context) => {
        context.ui.dropdowns.country.editing = false;
      }),

      toggleCountryDropdown: assign((context) => {
        context.ui.dropdowns.country.open =
          !context.ui.dropdowns.country.open;
      }),
      // #endregion

      // #region PropertyType
      assignFilterType: assign((context, { propertyType }) => {
        context.ui.dropdowns.type.current = propertyType;
        context.ui.dropdowns.type.editing = true;
      }),

      resetFilterType: assign((context) => {
        context.ui.dropdowns.type.editing = false;
      }),

      toggleTypeDropdown: assign((context) => {
        context.ui.dropdowns.type.open = !context.ui.dropdowns.type.open;
      }),
      // #endregion

      // #region Price
      setPriceInferior: assign((context, { value: inferiorOrEqualTo }) => {
        context.ui.inputs.price.inferiorOrEqualTo = {
          current: inferiorOrEqualTo,
          editing: true,
        };
      }),

      setPriceSuperior: assign((context, { value: superiorOrEqualTo }) => {
        context.ui.inputs.price.superiorOrEqualTo = {
          current: superiorOrEqualTo,
          editing: true,
        };
      }),

      clearTimeouts: assign((context) => {
        clearTimeout(context.ui.timeouts.inferiorFocusInterval);
        clearTimeout(context.ui.timeouts.superiorFocusInterval);
      }),

      resetFilterInferiorOrEqualTo: assign((context) => {
        context.ui.inputs.price.inferiorOrEqualTo.editing = false;
      }),

      resetFilterSuperiorOrEqualTo: assign((context) => {
        context.ui.inputs.price.superiorOrEqualTo.editing = false;
      }),

      focusInferiorOrEqualTo: assign((context) => {
        context.ui.timeouts.inferiorFocusInterval = setTimeout(
          () =>
            document
              ?.getElementById(inferiorOrEqualToID)
              ?.classList.add('border-red-300', 'border-2'),
          INTERVAL_SWITCH
        );
        context.ui.timeouts.superiorFocusInterval = setTimeout(
          () =>
            document
              ?.getElementById(inferiorOrEqualToID)
              ?.classList.remove('border-red-300', 'border-2'),
          INTERVAL_RETURN
        );
      }),

      focusSuperiorOrEqualTo: assign((context) => {
        context.ui.timeouts.inferiorFocusInterval = setTimeout(
          () =>
            document
              ?.getElementById(inferiorOrEqualToID)
              ?.classList.remove('border-red-300', 'border-2'),
          INTERVAL_RETURN
        );
        context.ui.timeouts.superiorFocusInterval = setTimeout(
          () =>
            document
              ?.getElementById(superiorOrEqualToID)
              ?.classList.add('border-red-300', 'border-2'),
          INTERVAL_SWITCH
        );
      }),
      // #endregion

      buildQuery: assign((context) => {
        const country = context.ui.dropdowns.country.current;
        const type = context.ui.dropdowns.type.current;
        const inferiorOrEqualToBeforeParsing =
          context.ui.inputs.price.inferiorOrEqualTo.current;
        const superiorOrEqualToBeforeParsing =
          context.ui.inputs.price.superiorOrEqualTo.current;

        const inferiorOrEqualTo =
          !!inferiorOrEqualToBeforeParsing &&
          inferiorOrEqualToBeforeParsing.trim() !== ''
            ? Number.parseInt(inferiorOrEqualToBeforeParsing)
            : undefined;

        const superiorOrEqualTo =
          !!superiorOrEqualToBeforeParsing &&
          superiorOrEqualToBeforeParsing.trim() !== ''
            ? Number.parseInt(superiorOrEqualToBeforeParsing)
            : undefined;

        context.cache.query = {
          country,
          type,
          inferiorOrEqualTo,
          superiorOrEqualTo,
        };
      }),

      filter: assign((context, { data }) => {
        context.ui.data.filtered = data;
      }),
    },

    guards: {
      // #region Price
      inferiorAndSuperiorAreSet: (context) => {
        // #region Variables
        const inferiorOrEqualTo =
          context.ui.inputs.price.inferiorOrEqualTo.current !== undefined;
        const superiorOrEqualTo =
          context.ui.inputs.price.superiorOrEqualTo.current !== undefined;
        // #endregion

        return inferiorOrEqualTo && superiorOrEqualTo;
      },

      isInferiorOrEqualEditing: (context) => {
        return context.ui.inputs.price.inferiorOrEqualTo.editing;
      },

      isSuperiorOrEqualEditing: (context) => {
        return context.ui.inputs.price.superiorOrEqualTo.editing;
      },

      isBrowser,

      isInputNumber: (_, { value }) => {
        return !value || /\d+/.test(value);
      },
      // #endregion

      isCountryEditing: (context) => {
        return context.ui.dropdowns.country.editing;
      },

      isTypeEditing: (context) => {
        return context.ui.dropdowns.type.editing;
      },
    },

    services: {
      generateLists: async () => {
        const types = new Set(MAIN_DATA.map((data) => data.type));
        types.add(ALL_OPTIONS);
        const countries = new Set(MAIN_DATA.map((data) => data.country));
        countries.add(ALL_OPTIONS);
        return { types, countries };
      },

      filterMachine,

      hydrateResearch: async () => {
        const raw = localStorage.getItem(LOCAL_STORAGE_ID);
        if (!raw) return;
        const data = JSON.parse(raw) as HydrationData;
        return data;
      },
    },

    delays: {
      TIME_BETWEEN_REQUESTS,
      THROTTLE_TIME,
    },
  }
);

export type MainMachine = typeof machine;
export type EventMachine = EventFrom<MainMachine>;
export type State = StateFrom<MainMachine>;
