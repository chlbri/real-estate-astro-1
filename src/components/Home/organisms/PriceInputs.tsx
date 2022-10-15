/** @jsxImportSource solid-js */

import {
  inferiorOrEqualToID,
  superiorOrEqualToID,
} from '@-constants/strings';
import type { Component } from 'solid-js';

import { InputRange } from '../molecules/InputRange';
import {
  getPriceInferiorOrEqual,
  getPriceSuperiorOrEqual,
  setPriceInferiorOrEqual,
  setPriceSuperiorOrEqual,
} from './PriceInputs.hooks';

type Props = {};

export const PriceInputs: Component<Props> = ({}) => {
  return (
    <div class='flex space-x-6 lg:flex-col lg:space-x-0 lg:space-y-6 xl:flex-row xl:space-y-0 xl:space-x-6 '>
      <InputRange
        setValue={setPriceSuperiorOrEqual}
        id={superiorOrEqualToID}
        value={getPriceSuperiorOrEqual}
      />
      <InputRange
        setValue={setPriceInferiorOrEqual}
        id={inferiorOrEqualToID}
        value={getPriceInferiorOrEqual}
      />
    </div>
  );
};
