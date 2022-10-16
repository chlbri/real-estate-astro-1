import { context, send } from '@-hooks/main.service';

export const getCountries = context((context) => {
  const countries = context.cache.countries ?? [];
  return Array.from(countries);
});

export const getCurrent = context(
  (context) =>
    context.ui.dropdowns.country.current ??
    context.ui.dropdowns.country.default
);

export function isCurrent(country?: string) {
  return getCurrent() === country;
}

export const canBeOpened = context(
  (context) => !!context.ui.dropdowns.country.open
);

export function filter(input?: string) {
  return send({ type: 'COUNTRY/INPUT', input });
}

export const toggle = () => send('COUNTRY/TOGGLE');
