/** @jsxImportSource solid-js */

import type { Component } from 'solid-js';
import type { Property } from 'src/backend/data/main';
import { Spinner } from '../atoms/Spinner';

type Props = {
  toggle: () => void;
  canBeOpened: boolean;
  list: string[];
  filter: (filter: string) => void;
  isCurrent: (current: string) => boolean;
  isBusy: boolean;
  isNotBusy: boolean;
  data: Property[];invite:string
};

export const DropdownCountry: Component<Props> = ({
  canBeOpened,
  filter,
  isBusy,
  isCurrent,
  isNotBusy,
  list,
  toggle,
  data,
  invite
}) => {
  return (
    <div class='relative w-full lg:max-w-[296px] cursor-pointer px-2'>
      <button
        onClick={() => {
          toggle();
        }}
        class='w-full text-left flex h-[64px] items-center px-[18px] border rounded-lg'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
        >
          <path fill='none' d='M0 0h24v24H0z' />
          <path d='M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' />
        </svg>
        <div>
          <div class='text-[15px] font-medium leading-tight'></div>
          <div class='text-[13px]'>Select your place</div>
        </div>
      </button>
      <ul
        class='px-6 py-8 text-[15px] space-y-6 shadow-md bg-white  w-full z-10 list-none rounded-b-lg absolute opacity-0'
        classList={{
          'opacity-100': canBeOpened,
        }}
      >
        {list.map((element) => (
          <li
            class='cursor-pointer transition hover:text-violet-500'
            onclick={() => filter(element)}
            classList={{
              'text-violet-900': isCurrent(element),
            }}
          >
            {element}
          </li>
        ))}
      </ul>
      <div>
        {isBusy && <Spinner size={230} class='absolute' />}
        {isNotBusy && JSON.stringify(data?.map((data) => data.country))}
      </div>
    </div>
  );
};
