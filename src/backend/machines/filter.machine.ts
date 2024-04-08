import { MAIN_DATA, Property } from '@-backend/data/main';
import { ALL_OPTIONS, LOCAL_STORAGE_ID } from '@-constants/strings';
import { isBrowser } from '@-utils/environment';
import { assign, fromPromise, setup } from 'xstate';

export type QueryFilter = {
  country?: string;
  type?: string;
  name?: string;
  inferiorOrEqualTo?: number;
  superiorOrEqualTo?: number;
};

export type Context = {
  filtered?: Property[];
  noHydrate?: boolean;
} & QueryFilter;

export type HydrationData = {
  date?: number;
} & QueryFilter;

export const filterMachine = setup({
  types: {
    context: {} as Context,
  },
  actors: {
    filterProperties: fromPromise(
      async ({
        input: {
          country: currentCountry,
          type: currentType,
          inferiorOrEqualTo,
          superiorOrEqualTo,
        },
      }: {
        input: Omit<QueryFilter, 'name'>;
      }) => {
        const out = MAIN_DATA.filter(
          ({ country, type, price }) =>
            (!currentCountry ||
              currentCountry === ALL_OPTIONS ||
              country === currentCountry) &&
            (!currentType ||
              currentType === ALL_OPTIONS ||
              type === currentType) &&
            (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
            (superiorOrEqualTo === undefined || price >= superiorOrEqualTo)
        );

        return out;
      }
    ),
    saveFiltered: fromPromise(
      async ({
        input: { filtered, name, noHydrate, ...filters },
      }: {
        input: Context;
      }) => {
        const data: HydrationData = {
          ...filters,
          date: Date.now(),
        };
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(data));
      }
    ),
  },
  guards: {
    isBrowser,
  },
  actions: {
    filter: assign({filtered:({event:{}})=>}),
  },
}).createMachine(
  {
    context: {} as Context,
    types: {
      typegen: {} as import('./filter.machine.typegen').Typegen0,

      // actors: {} as {
      //   saveFiltered: { data: void };
      //   filterProperties: { data: Property[] | undefined };
      // },
    },

    initial: 'filtering',
    states: {
      filtering: {
        invoke: {
          src: 'filterProperties',
          onDone: [
            {
              target: 'hydration',
              actions: ['filter'],
              guard: 'isBrowser',
            },
            { target: 'busy', actions: ['filter'] },
          ],
          onError: {
            actions: ['sendParentQueryError'],
            target: 'busy',
          },
        },
      },
      hydration: {
        invoke: {
          src: 'saveFiltered',
          onDone: 'busy',
          onError: {
            actions: ['sendParentHydrationError'],
            target: 'busy',
          },
        },
        always: {
          guard: 'noHydrate',
          target: 'busy',
        },
      },
      busy: {
        after: {
          TIME_BETWEEN_REQUESTS: 'done',
        },
      },
      done: {
        type: 'final',
      },
    },
    output: ({ context: { filtered } }) => filtered,
  }

  // {
  //   actors: {
  //     // filterProperties: async ({
  //     //   country: currentCountry,
  //     //   type: currentType,
  //     //   inferiorOrEqualTo,
  //     //   superiorOrEqualTo,
  //     // }) => {
  //     //   const out = MAIN_DATA.filter(
  //     //     ({ country, type, price }) =>
  //     //       (!currentCountry ||
  //     //         currentCountry === ALL_OPTIONS ||
  //     //         country === currentCountry) &&
  //     //       (!currentType ||
  //     //         currentType === ALL_OPTIONS ||
  //     //         type === currentType) &&
  //     //       (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
  //     //       (superiorOrEqualTo === undefined || price >= superiorOrEqualTo)
  //     //   );

  //     //   return out;
  //     // },

  //     saveFiltered: async ({ filtered, name, noHydrate, ...filters }) => {
  //       const data: HydrationData = {
  //         ...filters,
  //         date: Date.now(),
  //       };
  //       localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(data));
  //     },
  //   },

  //   actions: {
  //     filter: assign((context, { data }) => {
  //       context.filtered = data;
  //     }),

  //     sendParentQueryError: escalate(ERRORS.FETCH.DATA),
  //     sendParentHydrationError: escalate(ERRORS.FETCH.HYDRATION),
  //   },

  //   guards: {
  //     isBrowser,
  //     noHydrate: (context) => !!context.noHydrate,
  //   },

  //   delays: {
  //     TIME_BETWEEN_REQUESTS,
  //   },
  // }
);
