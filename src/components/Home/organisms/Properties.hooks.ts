import { context, hasTag } from 'src/hooks/main.service';

export const getFilteredData = context(
  (context) => context.ui.data.filtered
);

export const isBusy = () => {
  return hasTag('busy');
};
