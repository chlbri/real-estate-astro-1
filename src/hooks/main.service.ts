import { machine } from 'src/backend/machine/main.machine';
import { createInterpret } from './createInterpret';

export const { sender, context, matches } = createInterpret(machine);

export const getCountries = context({
  accessor: (context) => Array.from(context.back.countries),
});

export const getCurrentCountry = context({
  accessor: (context) => context.front.dropDowns.country.current,
});

export function isCurrentCountry(country: string) {
  return getCurrentCountry() === country;
}

export const filterCountries = sender('FILTER_BY_COUNTRY');

export const toggleCountryDropdown = sender('TOGGLE_DROPDOWN_COUNTRY');

export const getFilteredData = context({
  accessor: (context) => context.back.filtered,
});

export const getAll = context({
  accessor: (context) => context.back.data,
});
