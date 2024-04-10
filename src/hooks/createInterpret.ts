import { Accessor, createMemo, createRoot, from } from 'solid-js';
import {
  AreAllImplementationsAssumedToBeProvided,
  BaseActionObject,
  EventObject,
  InterpreterOptions,
  MissingImplementationsError,
  NoInfer,
  Prop,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  StateMachine,
  StateValueFrom,
  TypegenDisabled,
  TypegenEnabled,
  Typestate,
  interpret,
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
  machine: AreAllImplementationsAssumedToBeProvided<TResolvedTypesMeta> extends true
    ? StateMachine<
        TContext,
        any,
        TEvent,
        TTypestate,
        any,
        any,
        TResolvedTypesMeta
      >
    : MissingImplementationsError<TResolvedTypesMeta>,
  options?: InterpreterOptions
) {
  const service = interpret(machine, options);
  const store = createRoot(() => from(service.start())) as Accessor<
    State<TContext, TEvent, any, TTypestate, TResolvedTypesMeta>
  >;

  const context = <T>(
    accessor?: (ctx: TContext) => T,
    equals?: (prev: T, next: T) => boolean
  ) => {
    const memo = createRoot(() =>
      createMemo(
        () => {
          const _accessor = !!accessor
            ? accessor(store()?.context)
            : (store().context as unknown as T);
          return _accessor;
        },
        undefined,
        { equals }
      )
    );
    return memo;
  };

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

  type Matchers = StateValueFrom<
    StateMachine<
      TContext,
      any,
      TEvent,
      TTypestate,
      any,
      any,
      TResolvedTypesMeta
    >
  >;

  const output = {
    send: service.send,
    sender,
    subscribe: service.subscribe.bind(service),
    matches: (match: Matchers) => matches(store().value)(match as string),
    context,
    hasTag: (
      value: TResolvedTypesMeta extends TypegenEnabled
        ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
        : string
    ) => store().hasTag(value),
  } as const;

  return output;
}
