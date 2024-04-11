import type { Component } from 'solid-js';
import { LocationPin } from '../../_shared/atoms/icons/LocationPin';
import { ArrowToggle } from '../molecules/ArrowToggle';
import {
  canBeOpened,
  filter,
  getCountries,
  getCurrent,
  isCurrent,
  toggle,
} from './DropdownCountry.hooks';

type Props = {};

export const DropdownCountry: Component<Props> = ({}) => {
  return (
    <div class='relative w-full lg:max-w-xs h-14 cursor-pointer px-2'>
      <button
        onClick={() => {
          toggle();
        }}
        class='w-full text-left flex h-full px-[18px] border rounded-lg  items-center justify-between'
      >
        <LocationPin />
        <div class='text-[13px]'>{getCurrent()}</div>
        <ArrowToggle open={canBeOpened} />
      </button>
      <ul
        class='px-6 py-8 text-[15px] space-y-6 shadow-md bg-white w-11/12 z-10 list-none rounded-b-lg absolute flex-col opacity-0 transition-opacity duration-300 ease-out pointer-events-none'
        classList={{
          'opacity-90 pointer-events-auto': canBeOpened(),
        }}
      >
        {getCountries().map((input) => (
          <li
            class='cursor-pointer transition hover:text-violet-500'
            onclick={() => {
              filter(input);
              toggle();
            }}
            classList={{
              'text-violet-900': isCurrent(input),
            }}
          >
            {input}
          </li>
        ))}
      </ul>
    </div>
  );
};
