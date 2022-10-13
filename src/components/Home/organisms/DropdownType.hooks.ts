import { context, sender } from 'src/hooks/main.service';

export const getTypes = context((context) => {
  const types = context.cache.types ?? [];
  return Array.from(types);
});

export const getCurrent = context(
  (context) => context.ui.dropdowns.type.current
);

export function isCurrent(type?: string) {
  return getCurrent() === type;
}

// export function isBusy() {
//   return (
//     matches('working.dropdowns.type.filtering') ||
//     matches('working.dropdowns.type.busy')
//   );
// }

// export function isNotBusy() {
//   return matches('working.dropdowns.type.idle');
// }

export const filter = sender('FILTER_BY_TYPE');

export const toggle = sender('TOGGLE_DROPDOWN_TYPE');
