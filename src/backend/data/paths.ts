import { MAIN_DATA } from './main';

export const PATHS = MAIN_DATA.map((property) => ({
  params: { propertyId: '' + property.id },
  props: { property },
}));
