import { Accessor, createMemo, createRoot, from } from 'solid-js';
import {
  BaseActionObject,
  EventObject,
  interpret,
  NoInfer,
  Prop,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  StateMachine,
  TypegenDisabled,
  TypegenEnabled,
  Typestate,
} from 'xstate';
import { matches } from './helpers/matches';

export function createInterpret<
  TContext,
  TEvent extends EventObject = EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  },
  TAction extends BaseActionObject = BaseActionObject,
  TServiceMap extends ServiceMap = ServiceMap,
  TResolvedTypesMeta = ResolveTypegenMeta<
    TypegenDisabled,
    NoInfer<TEvent>,
    TAction,
    TServiceMap
  >
>(
  machine: StateMachine<
    TContext,
    any,
    TEvent,
    TTypestate,
    TAction,
    TServiceMap,
    TResolvedTypesMeta
  >
) {
  const service = interpret(machine);
  const store = createRoot(() => from(service.start())) as Accessor<
    State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>
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

  const output = {
    send: service.send,
    sender,
    subscribe: service.subscribe.bind(service),
    matches: matches(store().value),
    context,
    hasTag: (
      value: TResolvedTypesMeta extends TypegenEnabled
        ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
        : string
    ) => store().hasTag(value),
  } as const;

  return output;
}
