import { THROTTLE_TIME } from '@-constants/numbers';
import { EVENTS } from '@-constants/objects';
import { DEFAULT_EVENT_DELIMITER } from '@-constants/strings';
import { assign } from '@xstate/immer';
import { createMachine, sendParent } from 'xstate';

export type Context = {
  editing?: boolean;
  open?: boolean;
  current?: string;
  name: string;
};

export type Events =
  | { type: 'FILTER'; value?: string }
  | { type: 'TOGGLE' };

export const dropdownMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./dropDown.machine.typegen').Typegen0,
    schema: { context: {} as Context, events: {} as Events },

    initial: 'idle',
    on: {
      FILTER: {
        target: '.idle',
        actions: ['filter', 'sendParentFilter'],
        internal: false,
      },
      TOGGLE: {
        actions: ['toggle', 'sendParentToggle'],
      },
    },

    entry: ['initializeToggle'],
    states: {
      idle: {
        exit: 'resetEdititng',
        after: {
          THROTTLE_TIME: {
            target: 'done',
            cond: 'isEditing',
          },
        },
      },
      done: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      initializeToggle: assign((context) => {
        context.open = false;
      }),

      filter: assign((context, { value }) => {
        context.current = value;
        context.editing = true;
      }),

      resetEdititng: assign((context) => {
        context.editing = false;
      }),

      sendParentToggle: sendParent(({ name, open }) => ({
        type: `${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.TOGGLE}`,
        open,
      })),

      sendParentFilter: sendParent(({ name, current }) => ({
        type: `${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.VALUE}`,
        current,
      })),

      toggle: assign((context) => {
        context.open = !context.open;
      }),
    },

    guards: {
      isEditing: (context) => !!context.editing,
    },

    delays: { THROTTLE_TIME },
  }
);
