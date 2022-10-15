/** @jsxImportSource solid-js */

import { Spinner } from '@-components/shared/atoms/Spinner';
import { Component, For } from 'solid-js';
import { Property } from '../molecules/Property';
import { getFilteredData, isBusy } from './Properties.hooks';

type Props = {};

export const Properties: Component<Props> = ({}) => {
  return (
    <div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 w-full gap-6 mt-10'>
      {isBusy() && (
        <div class='w-full h-96 flex items-center justify-center'>
          <Spinner />
        </div>
      )}
      <For each={getFilteredData()}>
        {(property) => <Property {...{ property }} />}
      </For>
    </div>
  );
};
