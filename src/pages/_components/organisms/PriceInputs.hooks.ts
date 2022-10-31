import { context, send } from '@-hooks/main.service';

export function setPriceInferiorOrEqual(input?: string) {
  return send({ type: 'INFERIOR_OR_EQUAL_TO/INPUT', input });
}

export const getPriceInferiorOrEqual = context(
  (context) => context.ui.inputs.price.inferiorOrEqualTo.current ?? ''
);

export function setPriceSuperiorOrEqual(input?: string) {
  return send({ type: 'SUPERIOR_OR_EQUAL_TO/INPUT', input });
}

export const getPriceSuperiorOrEqual = context(
  (context) => context.ui.inputs.price.superiorOrEqualTo.current ?? ''
);
