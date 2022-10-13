import { assign } from '@xstate/immer';
import { createMachine, EventFrom, StateFrom, StateMachine } from 'xstate';
import { MAIN_DATA, Property, PropertyType } from '../data/main';

export type Context = {
  cache: {
    countries?: Set<string>;
    types?: Set<PropertyType>;
  };

  ui: {
    dropdowns: {
      country: {
        editing: boolean;
        current?: string;
      };
      type: {
        editing: boolean;
        current?: string;
      };
    };
    inputs: {
      price: {
        inferiorOrEqualTo: {
          editing: boolean;
          current?: number;
        };
        superiorOrEqualTo: {
          editing: boolean;
          current?: number;
        };
      };
    };
    data: {
      filtered?: Property[];
    };
  };
};

export const intialContext: Context = {
  cache: {},
  ui: {
    dropdowns: {
      country: {
        editing: false,
      },
      type: {
        editing: false,
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
  },
};

export const THROTTLE_TIME = 1000;
export const TIME_BETWEEN_REQUESTS = 200;

export const INTERVAL_SWITCH = 3.5 * 1000;
export const INTERVAL_RETURN = 5 * 1000;

export const superiorOrEqualToID = 'superiorOrEqualToID';
export const inferiorOrEqualToID = 'inferiorOrEqualToID';

let inferiorFocusInterval: any;
let superiorFocusInterval: any;

export const machine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./main.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as
        | { type: '__RINIT__' }
        | { type: 'RESET_INPUTS' }
        | { type: 'SET_PRICE_INFERIOR'; inferiorOrEqualTo?: number }
        | { type: 'SET_PRICE_SUPERIOR'; superiorOrEqualTo?: number }
        | { type: 'TOGGLE_DROPDOWN_COUNTRY' }
        | { type: 'TOGGLE_DROPDOWN_TYPE' }
        | { type: 'FILTER_BY_COUNTRY'; country?: string }
        | { type: 'FILTER_BY_TYPE'; propertyType?: PropertyType },

      services: {} as {
        generateLists: {
          data: { types?: Set<PropertyType>; countries?: Set<string> };
        };

        filterProperties: { data: Property[] };
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
          onDone: {
            target: 'working',
            actions: ['generateLists'],
          },
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
                initial: 'idle',
                states: {
                  idle: {
                    on: {
                      TOGGLE_DROPDOWN_COUNTRY: { target: 'filter' },
                    },
                  },
                  filter: {
                    on: {
                      TOGGLE_DROPDOWN_COUNTRY: { target: 'idle' },
                      FILTER_BY_COUNTRY: {
                        actions: ['assignFilterCountry'],
                        target: 'filter',
                      },
                    },
                    after: {
                      THROTTLE_TIME: {
                        cond: 'isCountryEditing',
                        target: 'filtering',
                      },
                    },
                  },
                  filtering: {
                    tags: ['busy'],
                    exit: ['resetFilterCountry'],
                    invoke: {
                      src: 'filterProperties',
                      onDone: {
                        actions: ['filter'],
                        target: 'busy',
                      },
                    },
                  },
                  busy: {
                    tags: ['busy'],
                    after: {
                      TIME_BETWEEN_REQUESTS: { target: 'idle' },
                    },
                  },
                },
              },
              type: {
                initial: 'idle',
                states: {
                  idle: {
                    on: {
                      TOGGLE_DROPDOWN_TYPE: { target: 'filter' },
                    },
                  },
                  filter: {
                    on: {
                      TOGGLE_DROPDOWN_TYPE: { target: 'idle' },
                      FILTER_BY_TYPE: {
                        actions: ['assignFilterType'],
                        target: 'filter',
                      },
                    },
                    after: {
                      THROTTLE_TIME: {
                        cond: 'isTypeEditing',
                        target: 'filtering',
                      },
                    },
                  },
                  filtering: {
                    tags: ['busy'],
                    exit: ['resetFilterType'],
                    invoke: {
                      src: 'filterProperties',
                      onDone: {
                        actions: ['filter'],
                        target: 'busy',
                      },
                    },
                  },
                  busy: {
                    tags: ['busy'],
                    after: {
                      TIME_BETWEEN_REQUESTS: { target: 'idle' },
                    },
                  },
                },
              },
            },
            on: {
              // '*': {
              //   actions: [
              //     'resetFilterSuperiorOrEqualTo',
              //     'resetFilterInferiorOrEqualTo',
              //   ],
              // },
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
                    initial: 'focus',
                    states: {
                      focus: {
                        on: {
                          SET_PRICE_INFERIOR: {
                            target: 'focus',
                            actions: ['setPriceInferior'],
                          },
                        },
                        after: {
                          THROTTLE_TIME: {
                            cond: 'isInferiorOrEqualEditing',
                            target: 'filter',
                          },
                        },
                      },
                      filter: {
                        entry: [
                          'resetFilterSuperiorOrEqualTo',
                          'resetFilterInferiorOrEqualTo',
                        ],
                        always: [
                          {
                            cond: 'inferiorAndSuperiorAreSet',
                            target: 'filtering',
                          },
                          {
                            target: 'focus',
                            actions: ['focusSuperiorOrEqualTo'],
                          },
                        ],
                      },
                      filtering: {
                        tags: ['busy'],
                        invoke: {
                          src: 'filterProperties',
                          onDone: {
                            actions: ['filter'],
                            target: 'busy',
                          },
                        },
                      },
                      busy: {
                        tags: ['busy'],
                        after: {
                          TIME_BETWEEN_REQUESTS: 'focus',
                        },
                      },
                    },
                  },
                  superiorTo: {
                    id: 'superiorTo',
                    initial: 'focus',
                    states: {
                      focus: {
                        on: {
                          SET_PRICE_SUPERIOR: {
                            target: 'focus',
                            actions: ['setPriceSuperior'],
                          },
                        },
                        after: {
                          THROTTLE_TIME: {
                            cond: 'isSuperiorOrEqualEditing',
                            target: 'filter',
                          },
                        },
                      },
                      filter: {
                        entry: [
                          'resetFilterSuperiorOrEqualTo',
                          'resetFilterInferiorOrEqualTo',
                        ],
                        always: [
                          {
                            cond: 'inferiorAndSuperiorAreSet',
                            target: 'filtering',
                          },
                          {
                            target: 'focus',
                            actions: ['focusInferiorOrEqualTo'],
                          },
                        ],
                      },
                      filtering: {
                        tags: ['busy'],
                        // exit: ['resetFilterSuperiorOrEqualTo'],
                        invoke: {
                          src: 'filterProperties',
                          onDone: {
                            actions: ['filter'],
                            target: 'busy',
                          },
                        },
                      },
                      busy: {
                        tags: ['busy'],
                        after: {
                          TIME_BETWEEN_REQUESTS: 'focus',
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
      resetCache: assign((context) => {
        context.cache = {};
      }),

      generateLists: assign((context, { data }) => {
        context.cache.countries = data.countries;
        context.cache.types = data.types;
      }),

      resetInputs: assign((context) => {
        context.ui.dropdowns.country = { editing: false };
        context.ui.dropdowns.type = { editing: false };
        context.ui.inputs.price = {
          inferiorOrEqualTo: { editing: false },
          superiorOrEqualTo: { editing: false },
        };
      }),

      // #region regionName
      assignFilterCountry: assign((context, { country }) => {
        context.ui.dropdowns.country = { current: country, editing: true };
      }),

      resetFilterCountry: assign((context) => {
        context.ui.dropdowns.country.editing = false;
      }),
      // #endregion

      // #region regionName
      assignFilterType: assign((context, { propertyType }) => {
        context.ui.dropdowns.type = {
          current: propertyType,
          editing: true,
        };
      }),

      resetFilterType: assign((context) => {
        context.ui.dropdowns.type.editing = false;
      }),
      // #endregion

      // #region Price
      setPriceInferior: assign((context, { inferiorOrEqualTo }) => {
        inferiorFocusInterval = null;
        context.ui.inputs.price.inferiorOrEqualTo = {
          current: inferiorOrEqualTo,
          editing: true,
        };
        clearTimeout(inferiorFocusInterval);
      }),

      setPriceSuperior: assign((context, { superiorOrEqualTo }) => {
        context.ui.inputs.price.superiorOrEqualTo = {
          current: superiorOrEqualTo,
          editing: true,
        };
        clearTimeout(superiorFocusInterval);
      }),

      resetFilterInferiorOrEqualTo: assign((context) => {
        context.ui.inputs.price.inferiorOrEqualTo.editing = false;
      }),

      resetFilterSuperiorOrEqualTo: assign((context) => {
        context.ui.inputs.price.superiorOrEqualTo.editing = false;
      }),

      focusInferiorOrEqualTo: () => {
        const isBrowser = () => typeof window !== `undefined`;
        if (isBrowser()) {
          inferiorFocusInterval = setTimeout(
            () =>
              document
                ?.getElementById(inferiorOrEqualToID)
                ?.classList.add('border-red-300', 'border-2'),
            INTERVAL_SWITCH
          );
          superiorFocusInterval = setTimeout(
            () =>
              document
                ?.getElementById(inferiorOrEqualToID)
                ?.classList.remove('border-red-300', 'border-2'),
            INTERVAL_RETURN
          );
        }
      },

      focusSuperiorOrEqualTo: () => {
        const isBrowser = () => typeof window !== `undefined`;
        if (isBrowser()) {
          superiorFocusInterval = setTimeout(
            () =>
              document
                ?.getElementById(superiorOrEqualToID)
                ?.classList.add('border-red-300', 'border-2'),
            INTERVAL_SWITCH
          );
          inferiorFocusInterval = setTimeout(
            () =>
              document
                ?.getElementById(superiorOrEqualToID)
                ?.classList.remove('border-red-300', 'border-2'),
            INTERVAL_RETURN
          );
        }
      },
      // #endregion

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
        const countries = new Set(MAIN_DATA.map((data) => data.country));
        return { types, countries };
      },

      filterProperties: async (context) => {
        // #region Variables
        const currentCountry = context.ui.dropdowns.country.current;
        const currentType = context.ui.dropdowns.type.current;
        const inferiorOrEqualTo =
          context.ui.inputs.price.inferiorOrEqualTo.current;
        const superiorOrEqualTo =
          context.ui.inputs.price.superiorOrEqualTo.current;
        // #endregion

        const out = MAIN_DATA.filter(
          ({ country, type, price }) =>
            (!currentCountry || country === currentCountry) &&
            (!currentType || type === currentType) &&
            (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
            (superiorOrEqualTo === undefined || price >= superiorOrEqualTo)
        );

        return out;
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
export type ContextFrom<T extends any> = T extends StateMachine<
  infer U,
  any,
  any,
  any,
  any,
  any,
  any
>
  ? U
  : never;
