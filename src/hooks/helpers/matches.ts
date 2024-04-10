import { decompose, StateValue } from '@bemedev/decompose';

export function matches<T extends StateValue>(value: T) {
  const decomposed = decompose(value);
  return (value: typeof decomposed[number]) =>
    decomposed.includes(value as any);
}
