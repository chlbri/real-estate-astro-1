import type { Property } from '@-backend/data/main';
import { LOCAL_STORAGE_ID } from '@-constants/strings';
import { assign } from '@xstate/immer';
import { createMachine, sendTo } from 'xstate';
import { escalate } from 'xstate/lib/actions';
import { QueryFilter, filterMachine } from './filter.machine';
import { BeforeQuery, queryBuilderMachine } from './queryBuilder.machine';

type Context = {
  date?: number;
  filtered?: Property[];
  currentQuery?: BeforeQuery;
  query?: QueryFilter;
};

type HydrationData = {
  date?: number;
} & BeforeQuery;

export const hydrationMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./hydration.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      services: {} as {
        queryBuilderMachine: { data: QueryFilter | undefined };
        filterMachine: { data: Property[] | undefined };
        hydrate: { data: HydrationData | undefined };
      },
    },

    context: {},
    initial: 'hydration',
    states: {
      hydration: {
        invoke: {
          src: 'hydrate',
          onDone: {
            target: 'building',
            actions: ['hydrate'],
          },
          onError: {
            actions: ['rethrow'],
            target: 'error',
          },
        },
      },
      building: {
        entry: ['sendQuery'],
        invoke: {
          id: 'queryBuilderMachine',
          src: 'queryBuilderMachine',
          data: ({ currentQuery, date }) => ({
            currentQuery,
            date,
          }),
          onError: {
            actions: ['rethrow'],
            target: 'error',
          },
          onDone: { target: 'filtering', actions: ['buildQuery'] },
        },
      },
      filtering: {
        invoke: {
          src: 'filterMachine',
          data: ({ query }) => ({ ...query, noHydrate: true }),
          onError: {
            actions: ['rethrow'],
            target: 'error',
          },
          onDone: { target: 'success', actions: ['filter'] },
        },
      },
      success: {
        type: 'final',
        data: ({ filtered, currentQuery }) => ({
          filtered,
          currentQuery,
        }),
      },
      error: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      sendQuery: sendTo('queryBuilderMachine', ({ query }) => ({
        type: 'QUERY',
        query,
      })),

      rethrow: escalate((_, { data }) => data),

      buildQuery: assign((context, { data }) => {
        context.query = data;
      }),

      filter: assign((context, { data }) => {
        context.filtered = data;
      }),

      hydrate: assign((context, { data }) => {
        if (data) {
          const { date, ...query } = data;
          context.currentQuery = query;
          context.date = date;
        }
      }),
    },
    services: {
      hydrate: async () => {
        const raw = localStorage.getItem(LOCAL_STORAGE_ID);
        if (!raw) return;
        const data = JSON.parse(raw) as HydrationData;
        return data;
      },
      filterMachine,
      queryBuilderMachine,
    },
  },
);
