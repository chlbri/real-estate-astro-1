import { context, hasTag } from '@-backend/main.service';

export const getFilteredData = context(
  (context) => context.ui.data.filtered ?? []
);

export const isBusy = hasTag('busy');
