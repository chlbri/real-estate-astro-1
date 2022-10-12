import { assign } from '@xstate/immer';
import { createMachine, EventFrom, StateFrom } from 'xstate';
import { MAIN_DATA, Property, PropertyType } from '../data/main';

export const machine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./main.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        back: {
          countries?: Set<string>;
          types?: Set<string>;
          data: Property[];
          filtered?: Property[];
        };
        front: {
          dropdowns: {
            country: { current?: string; alreadyFiltered: boolean };
            type: { current?: string; alreadyFiltered: boolean };
          };
          inputs: {
            price: {
              inferiorOrEqualTo?: number;
              superiorOrEqualTo?: number;
              alreadyFiltered: boolean;
            };
          };
        };
      },
      events: {} as
        | { type: 'SET_PRICE_INFERIOR'; inferiorOrEqualTo: number }
        | { type: 'SET_PRICE_SUPERIOR'; superiorOrEqualTo: number }
        | { type: 'FOCUS_PRICE_INFERIOR' }
        | { type: 'FOCUS_PRICE_SUPERIOR' }
        | { type: 'RESET_INPUTS' }
        | { type: 'TOGGLE_DROPDOWN_COUNTRY' }
        | { type: 'TOGGLE_DROPDOWN_TYPE' }
        | { type: 'FILTER_BY_COUNTRY'; country: string }
        | { type: 'FILTER_BY_TYPE'; propertyType: PropertyType },
      services: {} as {},
    },

    context: {
      back: {
        data: MAIN_DATA,
      },
      front: {
        dropdowns: {
          country: {
            alreadyFiltered: false,
          },
          type: {
            alreadyFiltered: false,
          },
        },
        inputs: {
          price: {
            alreadyFiltered: false,
          },
        },
      },
    },

    initial: 'idle',
    states: {
      idle: {
        always: {
          actions: ['generation'],
          target: 'ui',
        },
      },
      ui: {
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
                        target: 'checkFiltering',
                      },
                    },
                  },
                  checkFiltering: {
                    always: [
                      {
                        cond: 'isAlreadyFilteredByCountry',
                        actions: ['resetFilteredCountry'],
                        target: 'filtering',
                      },
                      'filtering',
                    ],
                  },
                  filtering: {
                    always: {
                      actions: ['filterByCountry'],
                      target: 'busy',
                    },
                  },
                  busy: {
                    after: {
                      200: { target: 'idle' },
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
                        target: 'checkFiltering',
                      },
                    },
                  },
                  checkFiltering: {
                    always: [
                      {
                        cond: 'isAlreadyFilteredByType',
                        actions: ['resetFilteredType'],
                        target: 'filtering',
                      },
                      'filtering',
                    ],
                  },
                  filtering: {
                    always: {
                      actions: ['filterByType'],
                      target: 'busy',
                    },
                  },
                  busy: {
                    after: {
                      200: { target: 'idle' },
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
                            always: {
                              target: 'filter',
                            },
                          },
                          filter: {
                            on: {
                              SET_PRICE_INFERIOR: {
                                target: 'checkPreviousFilter',
                                actions: ['setPriceInferior'],
                              },
                              FOCUS_PRICE_SUPERIOR: {
                                target: '#superiorTo',
                              },
                            },
                          },
                          checkPreviousFilter: {
                            always: [
                              {
                                cond: 'isAlreadyFilteredByPrice',
                                actions: ['resetFilteredPrice'],
                                target: 'filtering',
                              },
                              'filtering',
                            ],
                          },
                          filtering: {
                            always: [
                              {
                                cond: 'inferiorAndSuperiorAreSet',
                                actions: ['filterByPrice'],
                                target: 'busy',
                              },
                              '#superiorTo',
                            ],
                          },
                          busy: {
                            after: {
                              200: '#price_idle',
                            },
                          },
                        },
                      },
                      superiorTo: {
                        id: 'superiorTo',
                        initial: 'focus',
                        states: {
                          focus: {
                            always: {
                              target: 'filter',
                            },
                          },
                          filter: {
                            on: {
                              SET_PRICE_SUPERIOR: {
                                target: 'checkPreviousFilter',
                                actions: ['setPriceSuperior'],
                              },
                              FOCUS_PRICE_INFERIOR: {
                                target: '#inferiorTo',
                              },
                            },
                          },
                          checkPreviousFilter: {
                            always: [
                              {
                                cond: 'isAlreadyFilteredByPrice',
                                actions: ['resetFilteredPrice'],
                                target: 'filtering',
                              },
                              'filtering',
                            ],
                          },
                          filtering: {
                            always: [
                              {
                                cond: 'inferiorAndSuperiorAreSet',
                                actions: ['filterByPrice'],
                                target: 'busy',
                              },
                              '#inferiorTo',
                            ],
                          },
                          busy: {
                            after: {
                              200: '#price_idle',
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
      generation: assign((context) => {
        context.back.countries = new Set(
          context.back.data.map((data) => data.country)
        );
        context.back.types = new Set(
          context.back.data.map((data) => data.type)
        );
      }),

      resetInputs: assign((context) => {
        context.front.dropdowns.country = { alreadyFiltered: false };
        context.front.dropdowns.type = { alreadyFiltered: false };
        context.front.inputs.price = { alreadyFiltered: false };
      }),

      // #region Country
      assignFilterCountry: assign((context, { country }) => {
        context.front.dropdowns.country = {
          current: country,
          alreadyFiltered: true,
        };
      }),

      filterByCountry: assign((context) => {
        context.back.filtered = (
          context.back.filtered ?? context.back.data
        ).filter(({ country }) => {
          const currentCountry = context.front.dropdowns.country.current;
          const match = !!currentCountry && currentCountry === country;
          return match;
        });
        context.front.dropdowns.country.alreadyFiltered = true;
      }),

      resetFilteredCountry: assign((context) => {
        context.front.dropdowns.country.alreadyFiltered = false;
        const currentType = context.front.dropdowns.type.current;
        const inferiorOrEqualTo =
          context.front.inputs.price.inferiorOrEqualTo;
        const superiorOrEqualTo =
          context.front.inputs.price.superiorOrEqualTo;
        context.back.filtered = context.back.data.filter(
          ({ type, price }) =>
            (!currentType || type === currentType) &&
            (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
            (!superiorOrEqualTo || price >= superiorOrEqualTo)
        );
      }),
      // #endregion

      // #region PropertyType
      assignFilterType: assign((context, { propertyType }) => {
        context.front.dropdowns.type = {
          current: propertyType,
          alreadyFiltered: true,
        };
      }),

      filterByType: assign((context) => {
        context.back.filtered = (
          context.back.filtered ?? context.back.data
        ).filter(({ type }) => {
          const currentPropertyType = context.front.dropdowns.type.current;
          const match =
            !!currentPropertyType && currentPropertyType === type;
          return match;
        });
        context.front.dropdowns.type.alreadyFiltered = true;
      }),

      resetFilteredType: assign((context) => {
        context.front.dropdowns.type.alreadyFiltered = false;
        const currentCountry = context.front.dropdowns.country.current;
        const inferiorOrEqualTo =
          context.front.inputs.price.inferiorOrEqualTo;
        const superiorOrEqualTo =
          context.front.inputs.price.superiorOrEqualTo;
        context.back.filtered = context.back.data.filter(
          ({ country, price }) =>
            (!currentCountry || country === currentCountry) &&
            (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
            (!superiorOrEqualTo || price >= superiorOrEqualTo)
        );
      }),
      // #endregion

      // #region Price
      setPriceInferior: assign((context, { inferiorOrEqualTo }) => {
        context.front.inputs.price.inferiorOrEqualTo = inferiorOrEqualTo;
      }),

      setPriceSuperior: assign((context, { superiorOrEqualTo }) => {
        context.front.inputs.price.superiorOrEqualTo = superiorOrEqualTo;
      }),

      filterByPrice: assign((context) => {
        // #region Variables
        const inferiorOrEqualTo =
          context.front.inputs.price.inferiorOrEqualTo!;
        const superiorOrEqualTo =
          context.front.inputs.price.superiorOrEqualTo!;
        // #endregion

        context.back.filtered = (
          context.back.filtered ?? context.back.data
        ).filter(
          ({ price }) =>
            price >= superiorOrEqualTo && price <= inferiorOrEqualTo
        );
        context.front.inputs.price.alreadyFiltered = true;
      }),

      resetFilteredPrice: assign((context) => {
        context.front.inputs.price.alreadyFiltered = false;
        const currentCountry = context.front.dropdowns.country.current;
        const currentType = context.front.dropdowns.type.current;
        context.back.filtered = context.back.data.filter(
          ({ country, type }) =>
            (!currentType || type === currentType) &&
            (!currentCountry || country === currentCountry)
        );
      }),
      // #endregion
    },
    guards: {
      // #region Price
      inferiorAndSuperiorAreSet: (context) => {
        // #region Variables
        const inferiorOrEqualTo =
          context.front.inputs.price.inferiorOrEqualTo;
        const superiorOrEqualTo =
          context.front.inputs.price.superiorOrEqualTo;
        // #endregion

        return !!inferiorOrEqualTo && !!superiorOrEqualTo;
      },

      isAlreadyFilteredByPrice: (context) => {
        return context.front.inputs.price.alreadyFiltered;
      },
      // #endregion

      isAlreadyFilteredByCountry: (context) => {
        return context.front.dropdowns.country.alreadyFiltered;
      },

      isAlreadyFilteredByType: (context) => {
        return context.front.dropdowns.type.alreadyFiltered;
      },
    },
  }
);

export type MainMachine = typeof machine;
export type EventMachine = EventFrom<MainMachine>;
export type State = StateFrom<MainMachine>;
