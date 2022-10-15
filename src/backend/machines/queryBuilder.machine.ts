import { ERRORS } from '@-constants/objects';
import { isInputNumber } from '@-utils/number';
import { assign } from '@xstate/immer';
import { dequal } from 'dequal';
import { createMachine } from 'xstate';
import { escalate } from 'xstate/lib/actions';
import type { QueryFilter } from './filter.machine';

export type BeforeQuery = {
  [key in keyof QueryFilter]?: string;
};

export type Context = {
  previousQuery?: BeforeQuery;
  currentQuery?: BeforeQuery;
  query?: QueryFilter;
  date?: number;
};

export const queryBuilderMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./queryBuilder.machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as { type: 'QUERY'; query?: BeforeQuery },
    },

    initial: 'idle',
    states: {
      idle: {
        on: {
          QUERY: {
            actions: ['mergeQuery'],
            target: 'checking',
          },
        },
      },
      checking: {
        always: [
          {
            cond: 'currentIsNotDefined',
            actions: ['errorNotDefined'],
          },
          {
            cond: 'previousEqualsCurrent',
            actions: ['errorEquals'],
          },
          {
            cond: 'currentNotWellFormated',
            actions: ['errorFormat'],
          },
          { target: 'success', actions: ['buildQuery'] },
        ],
      },

      success: {
        type: 'final',
        data: (context) => context.query,
      },
    },
  },
  {
    actions: {
      mergeQuery: assign((context, { query }) => {
        context.currentQuery = query ?? context.currentQuery;
      }),

      buildQuery: assign((context) => {
        // #region Variables
        const country = context.currentQuery!.country;
        const type = context.currentQuery!.type;
        const inferiorOrEqualTo = parseInt(
          context.currentQuery!.inferiorOrEqualTo!
        );
        const superiorOrEqualTo = parseInt(
          context.currentQuery!.superiorOrEqualTo!
        );
        // #endregion

        context.query = {
          country,
          type,
          inferiorOrEqualTo,
          superiorOrEqualTo,
        };
      }),

      errorNotDefined: escalate(ERRORS.QUERY.NOT_DEFINED),
      errorEquals: escalate(ERRORS.QUERY.ARE_EQUALS),
      errorFormat: escalate(ERRORS.QUERY.FORMAT),
    },
    guards: {
      currentIsNotDefined: ({ currentQuery }) => !currentQuery,

      previousEqualsCurrent: ({ currentQuery, previousQuery }) => {
        return dequal(currentQuery, previousQuery);
      },

      currentNotWellFormated: ({ currentQuery }) => {
        const { country, type, inferiorOrEqualTo, superiorOrEqualTo } =
          currentQuery!;

        const inferiorIsNotWellFormated =
          !isInputNumber(inferiorOrEqualTo);
        const superiorIsNotWellFormated =
          !isInputNumber(superiorOrEqualTo);

        return (
          !country ||
          !type ||
          inferiorIsNotWellFormated ||
          superiorIsNotWellFormated
        );
      },
    },
  }
);
