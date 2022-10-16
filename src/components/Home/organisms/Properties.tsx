/** @jsxImportSource solid-js */

import { Spinner } from '@-components/shared/atoms/Spinner';
import { Component, For } from 'solid-js';
import { Property } from '../molecules/Property';
import { getFilteredData, isBusy } from './Properties.hooks';

type Props = {};

export const Properties: Component<Props> = ({}) => {
  return (
    <div class='relative min-h-[2500px] md:min-h-[2000px] lg:min-h-[1500px] 2xl:min-h-[1000px]'>
      {isBusy() && (
        <div class='absolute inset-0 pt-60 flex justify-center opacity-70 -z-30'>
          <Spinner size={200} class='!border-violet-500' />
        </div>
      )}
      <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 w-full gap-6 mt-10 px-6'>
        <For each={getFilteredData().slice(0, 20)}>
          {(property) => <Property {...{ property }} />}
        </For>
      </div>
    </div>
  );
};
