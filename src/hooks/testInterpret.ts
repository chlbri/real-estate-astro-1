import {
  AreAllImplementationsAssumedToBeProvided,
  BaseActionObject,
  EventObject,
  MissingImplementationsError,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  StateMachine,
  TypegenDisabled,
  Typestate,
} from 'xstate';
import { SimulatedClock } from 'xstate/lib/SimulatedClock';
import { createInterpret } from './createInterpret';

export function testInterpret<
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
    : MissingImplementationsError<TResolvedTypesMeta>
) {
  const clock = new SimulatedClock();
  const {
    send,
    sender,
    subscribe,
    matches,
    hasTag,
    context: _context,
  } = createInterpret(machine, { clock });

  type ContextArgs<T = any> = {
    expected: T;
    accessor?: (ctx: TContext) => T;
    equals?: (prev: T, next: T) => boolean;
  };

  const context = <T>({ expected, accessor, equals }: ContextArgs<T>) => {
    const __context = _context(accessor, equals);
    const actual = JSON.stringify(__context());
    const _expected = JSON.stringify(expected);

    return actual === _expected;
  };

  const advanceTime = async (ms = 0) => {
    await Promise.resolve();
    return clock.increment(ms);
  };

  const out = {
    context,
    send,
    sender,
    subscribe,
    matches,
    hasTag,
    advanceTime,
  } as const;

  return out;
}
