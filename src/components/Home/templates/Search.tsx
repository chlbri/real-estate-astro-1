/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import { subscribe } from 'src/hooks/main.service';
import { DropdownCountry } from '../organisms/DropdownCountry';
import { DropdownType } from '../organisms/DropdownType';
import { PriceInputs } from '../organisms/PriceInputs';

type Props = {};

export const Search: Component<Props> = ({}) => {
  subscribe((state) => {
    if (state.changed) console.log('StateValue =>', state.value);
  });
  return (
    <div class='flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0 items-center w-full xl:w-5/6'>
      <DropdownCountry />
      <DropdownType />
      <PriceInputs />
    </div>
  );
};
