/** @jsxImportSource solid-js */

import { Component, createEffect } from 'solid-js';
import {
  inferiorOrEqualToID,
  superiorOrEqualToID,
} from 'src/backend/machine/main.machine';
import { context } from 'src/hooks/main.service';
import { InputRange } from '../molecules/InputRange';
import { setPriceInferior, setPriceSuperior } from './PriceInputs.hooks';

type Props = {};

export const PriceInputs: Component<Props> = ({}) => {
  createEffect(() => {
    console.log(context((ctx) => ctx.ui.data.filtered?.length)());
  });

  // onMount(() => {});

  return (
    <div class='flex space-x-6 lg:flex-col lg:space-x-0 lg:space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6 '>
      <InputRange
        setValue={(superiorOrEqualTo) => {
          setPriceSuperior({ superiorOrEqualTo });
        }}
        id={superiorOrEqualToID}
      />
      <InputRange
        setValue={(inferiorOrEqualTo) => {
          setPriceInferior({ inferiorOrEqualTo });
        }}
        id={inferiorOrEqualToID}
      />
    </div>
  );
};
