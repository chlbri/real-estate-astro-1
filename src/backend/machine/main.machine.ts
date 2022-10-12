import { assign } from '@xstate/immer';
import { createMachine, EventFrom, StateFrom } from 'xstate';
import { MAIN_DATA, Property, PropertyType } from '../data/main';

export const machine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./main.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        cache: {
          countries?: Set<string>;
          types?: Set<string>;
        };

        ui: {
          dropdowns: {
            country?: string;
            type?: string;
          };
          inputs: {
            price: {
              inferiorOrEqualTo?: number;
              superiorOrEqualTo?: number;
            };
          };
          data: {
            filtered?: Property[];
          };
        };
      },

      events: {} as
        | { type: 'RESET_INPUTS' }
        | { type: 'SET_PRICE_INFERIOR'; inferiorOrEqualTo: number }
        | { type: 'SET_PRICE_SUPERIOR'; superiorOrEqualTo: number }
        | { type: 'FOCUS_PRICE_INFERIOR' }
        | { type: 'FOCUS_PRICE_SUPERIOR' }
        | { type: 'TOGGLE_DROPDOWN_COUNTRY' }
        | { type: 'TOGGLE_DROPDOWN_TYPE' }
        | { type: 'FILTER_BY_COUNTRY'; country: string }
        | { type: 'FILTER_BY_TYPE'; propertyType: PropertyType },

      services: {} as {
        generateLists: {
          data: { types?: Set<string>; countries?: Set<string> };
        };

        filterProperties: { data: Property[] };
      },
    },

    context: {
      cache: {},
      ui: {
        dropdowns: {},
        inputs: {
          price: {},
        },
        data: {},
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
                        target: 'filtering',
                      },
                    },
                  },
                  filtering: {
                    invoke: {
                      src: 'filterProperties',
                      onDone: {
                        actions: ['filter'],
                        target: 'busy',
                      },
                    },
                  },
                  busy: {
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
                        target: 'filtering',
                      },
                    },
                  },
                  filtering: {
                    invoke: {
                      src: 'filterProperties',
                      onDone: {
                        actions: ['filter'],
                        target: 'busy',
                      },
                    },
                  },
                  busy: {
                    after: {
                      TIME_BETWEEN_REQUESTS: { target: 'idle' },
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
                initial: 'idle',
                states: {
                  idle: {
                    id: 'price_idle',
                    on: {
                      FOCUS_PRICE_INFERIOR: {
                        target: '#inferiorTo',
                      },
                      FOCUS_PRICE_SUPERIOR: {
                        target: '#superiorTo',
                      },
                    },
                  },
                  focus: {
                    states: {
                      inferiorTo: {
                        id: 'inferiorTo',
                        initial: 'focus',

                        states: {
                          focus: {
                            on: {
                              SET_PRICE_INFERIOR: {
                                target: 'filter',
                                actions: ['setPriceInferior'],
                              },
                              FOCUS_PRICE_SUPERIOR: {
                                target: '#superiorTo',
                              },
                            },
                          },
                          filter: {
                            always: [
                              {
                                cond: 'inferiorAndSuperiorAreSet',
                                target: 'filtering',
                              },
                              '#superiorTo',
                            ],
                          },
                          filtering: {
                            invoke: {
                              src: 'filterProperties',
                              onDone: {
                                actions: ['filter'],
                                target: 'busy',
                              },
                            },
                          },
                          busy: {
                            after: {
                              TIME_BETWEEN_REQUESTS: '#price_idle',
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
                                target: 'filter',
                                actions: ['setPriceSuperior'],
                              },
                              FOCUS_PRICE_INFERIOR: {
                                target: '#inferiorTo',
                              },
                            },
                          },
                          filter: {
                            always: [
                              {
                                cond: 'inferiorAndSuperiorAreSet',
                                target: 'filtering',
                              },
                              '#inferiorTo',
                            ],
                          },
                          filtering: {
                            invoke: {
                              src: 'filterProperties',
                              onDone: {
                                actions: ['filter'],
                                target: 'busy',
                              },
                            },
                          },
                          busy: {
                            after: {
                              TIME_BETWEEN_REQUESTS: '#price_idle',
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
    },
  },
  {
    actions: {
      generateLists: assign((context, { data }) => {
        context.cache.countries = data.countries;
        context.cache.types = data.types;
      }),

      resetInputs: assign((context) => {
        context.ui.dropdowns.country = undefined;
        context.ui.dropdowns.type = undefined;
        context.ui.inputs.price = {};
      }),

      assignFilterCountry: assign((context, { country }) => {
        context.ui.dropdowns.country = country;
      }),

      assignFilterType: assign((context, { propertyType }) => {
        context.ui.dropdowns.type = propertyType;
      }),

      // #region Price
      setPriceInferior: assign((context, { inferiorOrEqualTo }) => {
        context.ui.inputs.price.inferiorOrEqualTo = inferiorOrEqualTo;
      }),

      setPriceSuperior: assign((context, { superiorOrEqualTo }) => {
        context.ui.inputs.price.superiorOrEqualTo = superiorOrEqualTo;
      }),
      // #endregion

      filter: assign((context, { data }) => {
        context.ui.data.filtered = data;
      }),
    },

    guards: {
      inferiorAndSuperiorAreSet: (context) => {
        // #region Variables
        const inferiorOrEqualTo =
          context.ui.inputs.price.inferiorOrEqualTo;
        const superiorOrEqualTo =
          context.ui.inputs.price.superiorOrEqualTo;
        // #endregion

        return !!inferiorOrEqualTo && !!superiorOrEqualTo;
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
        const currentCountry = context.ui.dropdowns.country;
        const currentType = context.ui.dropdowns.type;
        const inferiorOrEqualTo =
          context.ui.inputs.price.inferiorOrEqualTo;
        const superiorOrEqualTo =
          context.ui.inputs.price.superiorOrEqualTo;
        // #endregion

        const out = MAIN_DATA.filter(
          ({ country, type, price }) =>
            (!currentCountry || country === currentCountry) &&
            (!currentType || type === currentType) &&
            (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
            (!superiorOrEqualTo || price >= superiorOrEqualTo)
        );

        return out;
      },
    },

    delays: {
      TIME_BETWEEN_REQUESTS: 200,
    },
  }
);

export type MainMachine = typeof machine;
export type EventMachine = EventFrom<MainMachine>;
export type State = StateFrom<MainMachine>;
