import { Accessor, createMemo, createRoot, from } from 'solid-js';
import {
  ActorOptions,
  AnyActorLogic,
  AnyActorRef,
  ConditionalRequired,
  EventObject,
  InputFrom,
  IsNotNever,
  MachineContext,
  MachineSnapshot,
  ParameterizedObject,
  ProvidedActor,
  StateMachine,
  StateValue,
  createActor,
} from 'xstate';
import { matches } from './helpers/matches';

type RequiredOptions<TLogic extends AnyActorLogic> =
  undefined extends InputFrom<TLogic> ? never : 'input';

export function createInterpret<
  TContext extends MachineContext,
  TEvent extends EventObject,
  TChildren extends Record<string, AnyActorRef | undefined>,
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TStateValue extends StateValue,
  TTag extends string,
  TInput,
  TOutput,
  TEmitted extends EventObject = EventObject
>(
  machine: StateMachine<
    TContext,
    TEvent,
    TChildren,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TStateValue,
    TTag,
    TInput,
    TOutput,
    TEmitted
  >,
  ...[options]: ConditionalRequired<
    [
      options?: ActorOptions<typeof machine> & {
        [K in RequiredOptions<typeof machine>]: unknown;
      }
    ],
    IsNotNever<RequiredOptions<typeof machine>>
  >
) {
  const service = createActor(machine, options);
  service.start();
  const store = createRoot(() => from(service.start())) as Accessor<
    MachineSnapshot<
      TContext,
      TEvent,
      TChildren,
      TStateValue,
      TTag,
      TOutput
    >
  >;

  const context = <T>(
    accessor?: (ctx: TContext) => T,
    equals?: (prev: T, next: T) => boolean
  ) => {
    const memo = createRoot(() =>
      createMemo(
        () =>
          !!accessor
            ? accessor(store()?.context)
            : (store().context as unknown as T),
        undefined,
        { equals }
      )
    );
    return memo;
  };

  type Test<T> = T extends { type: string } & infer U
    ? Required<U> extends Record<string, any>
      ? Omit<U, 'type'>
      : never
    : never;

  type Test2<T> = (
    ...[event]: Test<T> extends never ? [] : [event: Test<T>]
  ) => any;

  type T1 = Test2<{ type: 'toto'; rr?: '' }>;
  const func: T1 = () => {};
  func({});

  const sender = <T extends TEvent['type']>(type: T) => {
    type E = TEvent extends {
      type: T;
    }
      ? Omit<TEvent, 'type'>
      : never;

    return (...[event]: E extends never ? [] : [event: E]) => {
      const sendOptions: any = { type, ...event };
      service.send(sendOptions);
    };
  };

  store().value;
  const output = {
    send: service.send,
    sender,
    subscribe: service.subscribe.bind(service),
    matches: matches(store().value as any),
    context,
    hasTag: (value: TTag) => store().hasTag(value),
  } as const;

  return output;
}
