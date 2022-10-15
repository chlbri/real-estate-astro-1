import { context, sender } from '@-hooks/main.service';

export const setPriceInferiorOrEqual = sender('SET_PRICE_INFERIOR');
export const getPriceInferiorOrEqual = context(
  (context) => context.ui.inputs.price.inferiorOrEqualTo.current ?? ''
);

export const setPriceSuperiorOrEqual = sender('SET_PRICE_SUPERIOR');
export const getPriceSuperiorOrEqual = context(
  (context) => context.ui.inputs.price.superiorOrEqualTo.current ?? ''
);
