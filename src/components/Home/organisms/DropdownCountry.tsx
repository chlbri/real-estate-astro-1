/** @jsxImportSource solid-js */

import { Component, createSignal } from 'solid-js';
import { LocationPin } from '../atoms/icons/LocationPin';
import { ArrowToggle } from '../molecules/ArrowToggle';
import {
  filter,
  getCountries,
  getCurrent,
  isCurrent,
  toggle,
} from './DropdownCountry.hooks';

type Props = {};

export const DropdownCountry: Component<Props> = ({}) => {
  const [opened, setOpened] = createSignal(false);
  const [defaultValue, setDefaultValue] = createSignal(
    'Select your place'
  );

  return (
    <div class='relative w-full lg:max-w-xs h-14 cursor-pointer px-2'>
      <button
        onClick={() => {
          toggle();
          setOpened((value) => !value);
        }}
        class='w-full text-left flex h-full px-[18px] border rounded-lg  items-center justify-between'
      >
        <LocationPin />
        <div class='text-[13px]'>{getCurrent() ?? defaultValue()}</div>
        <ArrowToggle open={opened} />
      </button>
      <ul
        class='px-6 py-8 text-[15px] space-y-6 shadow-md bg-white  w-full z-10 list-none rounded-b-lg absolute opacity-0'
        classList={{
          'opacity-100': opened(),
        }}
      >
        {[undefined, ...getCountries()].map((country) => (
          <li
            class='cursor-pointer transition hover:text-violet-500'
            onclick={() => {
              filter({ country });
              setOpened(false);
              setDefaultValue((value) =>
                value !== '< All >' ? '< All >' : value
              );
            }}
            classList={{
              'text-violet-900': isCurrent(country),
            }}
          >
            {country ?? '< All >'}
          </li>
        ))}
      </ul>
    </div>
  );
};
