/** @jsxImportSource solid-js */

import { send } from '@-hooks/main.service';
import { Component, onMount } from 'solid-js';
import { RinitSearch } from '../atoms/RinitSearch';
import { DropdownCountry } from '../organisms/DropdownCountry';
import { DropdownType } from '../organisms/DropdownType';
import { PriceInputs } from '../organisms/PriceInputs';

type Props = {};

export const Search: Component<Props> = ({}) => {
  onMount(() => {
    send('HYDRATE');
  });
  return (
    <div class='flex flex-col space-y-6 lg:flex-row lg:space-x-4 lg:space-y-0 items-center w-full xl:w-5/6'>
      <DropdownCountry />
      <DropdownType />
      <PriceInputs />
      <div class='flex pt-4 lg:pt-0 lg:pl-12'>
        <RinitSearch />
      </div>
    </div>
  );
};
