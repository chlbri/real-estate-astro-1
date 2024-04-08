import { EVENTS } from '@-constants/objects';
import { DEFAULT_EVENT_DELIMITER } from '@-constants/strings';
import { assign } from '@xstate/immer';
import { createMachine, sendParent } from 'xstate';
import { forwardTo } from 'xstate/lib/actions';
import { inputMachine } from './input.machine';

export type Context = {
  open?: boolean;
  name: string;
};

export type Events =
  | { type: 'INPUT' | 'CHILD/INPUT/INPUT'; input?: string }
  | { type: 'TOGGLE' | 'START_QUERY' };

export const dropdownMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import("./dropdown.machine.typegen.d.ts").Typegen0 ,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as {
        inputMachine: { data: void };
      },
    },

    initial: 'idle',
    on: {
      TOGGLE: {
        actions: ['toggle', 'sendParentToggle'],
      },
      INPUT: {
        actions: ['input'],
      },
    },

    states: {
      idle: {
        invoke: {
          id: 'inputMachine',
          src: 'inputMachine',
          data: () => ({
            name: EVENTS.INPUT,
          }),
        },
        on: {
          'CHILD/INPUT/INPUT': { actions: ['sendParentInput'] },
          START_QUERY: { target: 'done' },
        },
      },
      done: {
        always: {
          actions: ['startQuery'],
          target: 'idle',
        },
      },
    },
  },
  {
    actions: {
      input: forwardTo('inputMachine'),

      sendParentToggle: sendParent(({ name, open }) => ({
        type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.TOGGLE}`,
        open,
      })),

      sendParentInput: sendParent(({ name }, { input }) => ({
        type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.INPUT}`,
        input,
      })),

      startQuery: sendParent('START_QUERY'),

      toggle: assign((context) => {
        context.open = !context.open;
      }),
    },

    services: {
      inputMachine,
    },
  }
);
