import { assign } from '@xstate/immer';
import { createMachine, EventFrom, StateFrom } from 'xstate';
import { MAIN_DATA, Property, PropertyType } from '../data/main';

const countries = new Set(MAIN_DATA.map((data) => data.country));

const types = new Set(MAIN_DATA.map((data) => data.type));

export const initialContext = {
  back: {
    countries,
    types,
    data: MAIN_DATA,
  },
  front: {
    dropDowns: {
      country: {
        selected: false,
        open: false,
      },
      type: {
        selected: false,
        open: false,
      },
    },
  },
};

const context = {
  back: {
    countries,
    types,
    data: MAIN_DATA,
  },
  front: {
    dropDowns: {
      country: {
        selected: false,
        open: false,
      },
      type: {
        selected: false,
        open: false,
      },
    },
  },
};

export const machine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./main.machine.typegen').Typegen0,
    schema: {
      context: {} as {
        back: {
          countries: Set<string>;
          types: Set<string>;
          data: Property[];
          filtered?: Property[];
        };
        front: {
          dropDowns: {
            country: {
              selected: boolean;
              open: boolean;
              current?: string;
            };
            type: {
              selected: boolean;
              open: boolean;
              current?: string;
            };
          };
        };
      },
      events: {} as
        | { type: 'TOGGLE_DROPDOWN_COUNTRY' }
        | { type: 'TOGGLE_DROPDOWN_TYPE' }
        | { type: 'FILTER_BY_COUNTRY'; country: string }
        | {
            type: 'FILTER_BY_PRICE';
            inferiorOrEqualTo: number;
            superiorOrEqualTo: number;
          }
        | { type: 'FILTER_BY_TYPE'; propertyType: PropertyType },
      services: {} as {},
    },

    context,

    initial: 'dropdowns',
    states: {
      idle: {},

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
                always: {
                  target: 'filter',
                },
              },
              filtering: {
                always: {
                  actions: ['filterByCountry'],
                  target: 'busy',
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
              busy: {
                after: {
                  200: { target: 'filter' },
                },
                on: {
                  TOGGLE_DROPDOWN_COUNTRY: 'idle',
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
                    actions: ['filterByType'],
                    target: 'busy',
                  },
                },
              },
              busy: {
                after: {
                  200: 'filter',
                },
                on: {
                  TOGGLE_DROPDOWN_TYPE: 'idle',
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
      assignFilterCountry: assign((context, { country }) => {
        context.front.dropDowns.country.current = country;
      }),
      filterByCountry: assign((context) => {
        context.back.filtered = context.back.data.filter(({ country }) => {
          const currentCountry = context.front.dropDowns.country.current;
          const match = !!currentCountry && currentCountry === country;
          return match;
        });
      }),
      filterByType: assign((context, { propertyType }) => {
        context.back.filtered = (
          context.back.filtered ?? context.back.data
        ).filter((data) => data.type === propertyType);
      }),
      // filterByPrice: assign(
      //   (context, { inferiorOrEqualTo, superiorOrEqualTo }) => {
      //     context.back.filtered = (
      //       context.back.filtered ?? context.back.data
      //     ).filter(
      //       ({ price }) =>
      //         price >= superiorOrEqualTo && price <= inferiorOrEqualTo
      //     );
      //   }
      // ),
      // assignCurrentCountry: assign((context, { country }) => {
      //   context.front.dropDowns.country.current = country;
      // }),
      // removeSelectedCountry: assign((context) => {
      //   context.front.dropDowns.country.current = undefined;
      // }),
    },
    guards: {},
  }
);

export type MainMachine = typeof machine;
export type EventMachine = EventFrom<MainMachine>;
export type State = StateFrom<MainMachine>;
