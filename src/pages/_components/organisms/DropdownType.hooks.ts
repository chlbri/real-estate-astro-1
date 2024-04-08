import { context, send, sender } from '@-backend/main.service';

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
  (context) => !!context.ui.dropdowns.type.open
);

export function filter(input?: string) {
  return send({ type: 'TYPE/INPUT', input });
}

export const toggle = sender('TYPE/TOGGLE');
