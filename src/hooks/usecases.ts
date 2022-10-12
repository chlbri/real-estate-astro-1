import { machine } from 'src/backend/machine/main.machine';
import { createInterpret } from './createInterpret';

export const { sender, context, matches } = createInterpret(machine);

export const getCountries = context({
  accessor: (context) => {
    const countries = context.cache.countries ?? [];
    return Array.from(countries);
  },
});

export const getCurrentCountry = context({
  accessor: (context) => context.ui.dropdowns.country,
});

export function isCurrentCountry(country: string) {
  return getCurrentCountry() === country;
}

export const getCurrentType = context({
  accessor: (context) => context.ui.dropdowns.type,
});

export function isCurrentType(type: string) {
  return getCurrentCountry() === type;
}

export function dropdownCountryCanBeOpened() {
  return (
    matches('working.dropdowns.country') &&
    !matches('working.dropdowns.country.idle')
  );
}

export function dropdownCountryIsBusy() {
  return (
    matches('working.dropdowns.country.filtering') ||
    matches('working.dropdowns.country.busy')
  );
}

export function dropdownCountryIsNotBusy() {
  return matches('working.dropdowns.country.idle');
}

export function dropdownTypeCanBeOpened() {
  return (
    matches('working.dropdowns.type') &&
    matches('working.dropdowns.type.idle')
  );
}

export const filterCountries = sender('FILTER_BY_COUNTRY');

export const toggleCountryDropdown = sender('TOGGLE_DROPDOWN_COUNTRY');

export const getFilteredData = context({
  accessor: (context) => context.ui.data.filtered,
});
