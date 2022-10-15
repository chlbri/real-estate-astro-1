import { MAIN_DATA, Property } from '@-backend/data/main';
import { ERRORS } from '@-constants/objects';
import {
  DEFAULT_EVENT_DELIMITER,
  LOCAL_STORAGE_ID,
} from '@-constants/strings';
import { isBrowser } from '@-utils/environment';
import { assign } from '@xstate/immer';
import { createMachine, sendParent } from 'xstate';

export type QueryFilter = {
  country?: string;
  type?: string;
  inferiorOrEqualTo?: number;
  superiorOrEqualTo?: number;
};

export type Context = {
  filtered?: Property[];
  name: string;
} & QueryFilter;

type HydrationData = {
  filtered?: Property[];
  filters?: QueryFilter;
  date?: number;
};

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
            (!currentCountry || country === currentCountry) &&
            (!currentType || type === currentType) &&
            (!inferiorOrEqualTo || price <= inferiorOrEqualTo) &&
            (superiorOrEqualTo === undefined || price >= superiorOrEqualTo)
        );

        return out;
      },

      saveFiltered: async ({ filtered, name, ...filters }) => {
        const data: HydrationData = {
          filtered,
          filters,
          date: Date.now(),
        };
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(data));
      },
    },

    actions: {
      filter: assign((context, { data }) => {
        context.filtered = data;
      }),

      // #region Parent
      sendParentQueryError: sendParent((context) => ({
        type: `${context.name}${DEFAULT_EVENT_DELIMITER}${ERRORS.FETCH.DATA}`,
      })),

      sendParentHydrationError: sendParent((context) => ({
        type: `${context.name}${DEFAULT_EVENT_DELIMITER}${ERRORS.FETCH.HYDRATION}`,
      })),
      // #endregion
    },

    guards: {
      isBrowser,
    },
  }
);
