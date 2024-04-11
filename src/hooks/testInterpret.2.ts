import { StateMatching } from '@bemedev/decompose';
import buildMatches from '@bemedev/x-matches';
import { dequal } from 'dequal';
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
  StateMachine,
  StateValue,
  TypegenDisabled,
  TypegenEnabled,
  Typestate,
  interpret,
} from 'xstate';
import { SimulatedClock } from 'xstate/lib/SimulatedClock';

// #region SubType
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];

export type SubType<Base extends object, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;
// #endregion

type Fn<P extends any[] = any, R = any> = (...arg: P) => R;
type KeysFn<T extends object = object> = keyof SubType<T, Fn>;

type MatchOptions<T extends string = string> =
  | {
      or: MatchOptions<T>[];
    }
  | {
      and: MatchOptions<T>[];
    }
  | T;

type TSV<TResolvedTypesMeta> = TResolvedTypesMeta extends TypegenEnabled
  ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'matchesStates'>
  : never;

export type MatchesProps<TResolvedTypesMeta> = MatchOptions<
  StateMatching<
    TSV<TResolvedTypesMeta> extends StateValue
      ? TSV<TResolvedTypesMeta>
      : StateValue
  >
>[];

function _reFunction<P extends any[] = any[], R = any>(
  fn: Fn<P, R>,
  bind: any
) {
  return (...args: P) => fn.bind(bind)(...args);
}

export function reFunction<
  T extends object = object,
  FnKey extends KeysFn<T> = KeysFn<T>
>(object: T, fn: FnKey) {
  const _fn = object[fn];
  type Pm = T[FnKey] extends (...args: infer P) => any ? P : any[];
  type Re = T[FnKey] extends (...args: any) => infer R ? R : any;
  return _reFunction<Pm, Re>(_fn as any, object);
}

export function _expect<T>(actual: T, expected: T, error = defaultError) {
  const check = dequal(actual, expected);
  if (!check) throw new Error(error(actual, expected));
}

export function defaultError(actual: any, expected: any) {
  const actualJSON = JSON.stringify(actual, null, 2);
  const expectedJSON = JSON.stringify(expected, null, 2);
  return `not equal`;
}

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
    : MissingImplementationsError<TResolvedTypesMeta>,
  options?: Omit<InterpreterOptions, 'clock'>
) {
  const clock = new SimulatedClock();
  const service = interpret(machine, { clock, ...options });

  const start = reFunction(service, 'start');
  const stop = reFunction(service, 'stop');

  const getSnapshot = reFunction(service, 'getSnapshot');

  const advanceTime = async (ms = 0) => {
    await Promise.resolve();
    return clock.increment(ms);
  };

  const send = reFunction(service, 'send');

  const context = <T = TContext>(
    expected: T,
    selector?: (context: TContext) => T
  ) => {
    const innerContext = service.getSnapshot().context;
    const actual = selector ? selector(innerContext) : innerContext;
    _expect(actual, expected);
  };

  const sender = <T extends TEvent['type']>(type: T) => {
    type E = TEvent extends {
      type: T;
    } & infer U
      ? // eslint-disable-next-line @typescript-eslint/ban-types
        U extends {}
        ? Omit<U, 'type'>
        : never
      : never;

    const fn = (...data: E extends never ? [] : [event: E]) => {
      // @ts-ignore Ignore for undefined event
      service.send({ type, ...data?.[0] } as any);
    };
    return fn;
  };

  // #region Matches
  type _MatchesProps = MatchesProps<TResolvedTypesMeta>;

  const matches = (...nodes: _MatchesProps) => {
    const value = service.getSnapshot().value;
    const _matches = buildMatches(value);
    const actual = _matches(...nodes);
    _expect(actual, true);
  };
  // #endregion

  // #region HasTags
  type Tags = (TResolvedTypesMeta extends TypegenEnabled
    ? Prop<Prop<TResolvedTypesMeta, 'resolved'>, 'tags'>
    : string)[];

  const hasTags = (...values: Tags) => {
    const state = service.getSnapshot();
    const actual = values.every((value) => state.hasTag(value));
    _expect(actual, true);
  };
  // #endregion

  const __status = () => service.status;

  return {
    sender,
    context,
    matches,
    start,
    send,
    stop,
    hasTags,
    advanceTime,
    getSnapshot,
    __status,
  };
}
