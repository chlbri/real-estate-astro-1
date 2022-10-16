import type { StateMachine } from 'xstate/lib/types';

export type ContextFrom<T extends any> = T extends StateMachine<
  infer U,
  any,
  any,
  any,
  any,
  any,
  any
>
  ? U
  : never;
