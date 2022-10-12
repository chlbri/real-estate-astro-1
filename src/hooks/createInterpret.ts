import cloneDeep from 'lodash.clonedeep';
import { Accessor, batch, createMemo, createRoot } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  BaseActionObject,
  EventFrom,
  EventObject,
  interpret,
  NoInfer,
  ResolveTypegenMeta,
  ServiceMap,
  StateMachine,
  TypegenDisabled,
  Typestate,
} from 'xstate';
import { matches as matchesD } from './helpers/matches';

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
  const { context: _context, value } =
    service.getSnapshot() ?? service.initialState;

  const [store, setStore] = createStore({
    context: cloneDeep(_context),
    matches: matchesD(value),
  });

  service.onTransition((state) => {
    state.changed &&
      batch(() => {
        // diff data to only update values that changes
        setStore('context', cloneDeep(state.context));
        setStore('matches', () => matchesD(state.value));
      });
  });

  type GetContextProps<T> = {
    accessor: (ctx: TContext) => T;
    equals?: (prev: T, next: T) => boolean;
  };

  type CContext = <T>(props: GetContextProps<T>) => Accessor<T>;

  const context: CContext = ({ accessor, equals }) => {
    const memo = createRoot(() =>
      createMemo(() => accessor(store.context), undefined, { equals })
    );
    return memo;
  };

  type SenderProps = EventFrom<typeof machine>['type'];

  const sender = <T extends SenderProps>(type: T) => {
    type E = EventFrom<typeof machine> extends {
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

  service.start();

  const output = {
    send: service.send,
    sender,
    subscribe: service.subscribe.bind(service),
    matches: (value: string) => store.matches(value),
    context,
  } as const;

  return output;
}
