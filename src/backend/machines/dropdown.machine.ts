import { EVENTS } from '@-constants/objects';
import { DEFAULT_EVENT_DELIMITER } from '@-constants/strings';
import {
  ActorLogicFrom,
  assign,
  createMachine,
  forwardTo,
  sendParent,
} from 'xstate';
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
    context: {} as Context,
    types: {
      events: {} as Events,
      actors: {} as {
        src: 'inputMachine';
        logic: ActorLogicFrom<typeof inputMachine>;
      },
      typegen: {} as import('./dropdown.machine.typegen').Typegen0,
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
          input: () => ({
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

      sendParentToggle: sendParent(({ context: { name, open } }) => ({
        type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.TOGGLE}`,
        open,
      })),

      sendParentInput: sendParent(
        ({ context: { name }, event: { input } }) => ({
          type: `CHILD${DEFAULT_EVENT_DELIMITER}${name}${DEFAULT_EVENT_DELIMITER}${EVENTS.INPUT}`,
          input,
        })
      ),

      startQuery: sendParent({ type: 'START_QUERY' }),

      // toggle: assign((context) => {
      //   context.open = !context.open;
      // }),
      toggle: assign({ open: ({ context: { open } }) => !open }),
    },

    actors: {
      inputMachine,
    },
  }
);
