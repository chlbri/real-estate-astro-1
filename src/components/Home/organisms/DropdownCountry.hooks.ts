import { context, sender } from 'src/hooks/main.service';

export const getCountries = context((context) => {
  const countries = context.cache.countries ?? [];
  return Array.from(countries);
});

export const getCurrent = context(
  (context) => context.ui.dropdowns.country.current
);

export function isCurrent(country?: string) {
  return getCurrent() === country;
}

export const filter = sender('FILTER_BY_COUNTRY');

export const toggle = sender('TOGGLE_DROPDOWN_COUNTRY');