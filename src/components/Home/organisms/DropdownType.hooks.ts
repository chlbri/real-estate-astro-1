import { context, sender } from 'src/hooks/main.service';

export const getTypes = context((context) => {
  const types = context.cache.types ?? [];
  return Array.from(types);
});

export const getCurrent = context(
  (context) =>
    context.ui.dropdowns.type.current ?? context.ui.dropdowns.type.default
);

export function isCurrent(type?: string) {
  return getCurrent() === type;
}

export const canBeOpened = context(
  (context) => context.ui.dropdowns.type.open
);

export const filter = sender('FILTER_BY_TYPE');

export const toggle = sender('TOGGLE_DROPDOWN_TYPE');
