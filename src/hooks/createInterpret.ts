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
            ? accessor(store().context)
            : (store().context as unknown as T),
        undefined,
        { equals }
      )
    );
    return memo;
  };

  const sender = <T extends TEvent['type']>(type: T) => {
    type E = TEvent extends {
      type: T;
    } & infer U
      ? U extends {}
        ? Omit<U, 'type'>
        : never
      : never;

    return (...[event]: E extends never ? [] : [event: E]) => {
      const sendOptions: any = event ? { type, ...event } : { type };
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
