import { machine } from 'src/backend/machine/main.machine';
import { createInterpret } from './createInterpret';

export const { sender, context, matches } = createInterpret(machine);

export const getCountries = context({
  accessor: (context) => {
    const countries = context.back.countries ?? [];
    return Array.from(countries);
  },
});

export const getCurrentCountry = context({
  accessor: (context) => context.front.dropdowns.country.current,
});

export function isCurrentCountry(country: string) {
  return getCurrentCountry() === country;
}

export const getCurrentType = context({
  accessor: (context) => context.front.dropdowns.type.current,
});

export function isCurrentType(type: string) {
  return getCurrentCountry() === type;
}

export function dropdownCountryCanBeOpened() {
  return (
    matches('ui.dropdowns.country') &&
    !matches('ui.dropdowns.country.idle')
  );
}

export function dropdownTypeCanBeOpened() {
  return (
    matches('ui.dropdowns.type') && !matches('ui.dropdowns.type.idle')
  );
}

export const filterCountries = sender('FILTER_BY_COUNTRY');

export const toggleCountryDropdown = sender('TOGGLE_DROPDOWN_COUNTRY');

export const getFilteredData = context({
  accessor: (context) => context.back.filtered,
});

export const getAll = context({
  accessor: (context) => context.back.data,
});
