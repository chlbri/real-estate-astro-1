import { ALL_OPTIONS } from '@-constants/strings';

export function getLabel(value?: string) {
  return value ?? ALL_OPTIONS;
}
