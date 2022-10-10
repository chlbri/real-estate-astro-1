import { decompose, StateValue } from '@bemedev/decompose';

export function matches(value: StateValue) {
  const decomposed = decompose(value);
  return (value: string) => decomposed.includes(value as any);
}
