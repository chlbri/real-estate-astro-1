/** @jsxImportSource solid-js */

import { Component, createSignal } from 'solid-js';
import { LocationPin } from '../atoms/icons/LocationPin';
import { ArrowToggle } from '../molecules/ArrowToggle';
import {
  filter,
  getCurrent,
  getTypes,
  isCurrent,
  toggle,
} from './DropdownType.hooks';

type Props = {};

export const DropdownType: Component<Props> = ({}) => {
  const [opened, setOpened] = createSignal(false);
  const [defaultValue, setDefaultValue] = createSignal('Select type');

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
        <div class='text-[13px]'> {getCurrent() ?? defaultValue()}</div>
        <ArrowToggle open={opened} />
      </button>
      <ul
        class='px-6 py-8 text-[15px] space-y-6 shadow-md bg-white  w-full z-10 list-none rounded-b-lg absolute opacity-0'
        classList={{
          'opacity-100': opened(),
        }}
      >
        {[undefined, ...getTypes()].map((propertyType) => (
          <li
            class='cursor-pointer transition hover:text-violet-500'
            onclick={() => {
              filter({ propertyType });
              setOpened(false);
              setDefaultValue((value) =>
                value !== '< All >' ? '< All >' : value
              );
            }}
            classList={{
              'text-violet-900': isCurrent(propertyType),
            }}
          >
            {propertyType ?? '< All >'}
          </li>
        ))}
      </ul>
    </div>
  );
};
