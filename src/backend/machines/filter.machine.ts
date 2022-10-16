import { MAIN_DATA, Property } from '@-backend/data/main';
import { TIME_BETWEEN_REQUESTS } from '@-constants/numbers';
import { ERRORS } from '@-constants/objects';
import { ALL_OPTIONS, LOCAL_STORAGE_ID } from '@-constants/strings';
import { isBrowser } from '@-utils/environment';
import { assign } from '@xstate/immer';
import { createMachine } from 'xstate';
import { escalate } from 'xstate/lib/actions';

export type QueryFilter = {
  country?: string;
  type?: string;
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

export const filterMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./filter.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      services: {} as {
        saveFiltered: { data: void };
        filterProperties: { data: Property[] | undefined };
      },
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
              cond: 'isBrowser',
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
          cond: 'noHydrate',
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
        data: ({ filtered }) => filtered,
      },
    },
  },
  {
    services: {
      filterProperties: async ({
        country: currentCountry,
        type: currentType,
        inferiorOrEqualTo,
        superiorOrEqualTo,
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
      },

      saveFiltered: async ({ filtered, ...filters }) => {
        const data: HydrationData = {
          ...filters,
          date: Date.now(),
        };
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(data));
      },
    },

    actions: {
      filter: assign((context, { data }) => {
        context.filtered = data;
      }),

      sendParentQueryError: escalate(ERRORS.FETCH.DATA),
      sendParentHydrationError: escalate(ERRORS.FETCH.HYDRATION),
    },

    guards: {
      isBrowser,
      noHydrate: (context) => !!context.noHydrate,
    },

    delays: {
      TIME_BETWEEN_REQUESTS,
    },
  }
);
