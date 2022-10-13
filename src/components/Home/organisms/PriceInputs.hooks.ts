import { createMemo } from 'solid-js';
import { matches, sender } from 'src/hooks/main.service';

export const setPriceInferior = sender('SET_PRICE_INFERIOR');

export const setPriceSuperior = sender('SET_PRICE_SUPERIOR');

export const isFocusOnInferior = createMemo(() =>
  matches('working.inputs.price.focus.inferiorTo.focus')
);

export const isFocusOnSuperior = createMemo(() =>
  matches('working.inputs.price.focus.superiorTo.focus')
);
