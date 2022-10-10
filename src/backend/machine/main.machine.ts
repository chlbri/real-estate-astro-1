import { createMachine } from 'xstate';

export const machine = createMachine({
  tsTypes: {} as import('./main.machine.typegen').Typegen0,
  schema: {
    context: {} as {
      back: {
        countries: string[];
      };
      front: {
        dropDowns: {
          country: {
            current: string;
            open: boolean;
          };
        };
      };
    },
    events: {} as { type: 'SEARCH' },
    services: {} as {},
  },

  initial: 'idle',
  states: {
    idle: {},
  },
});
