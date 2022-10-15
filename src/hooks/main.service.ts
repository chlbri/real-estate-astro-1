import { machine } from '@-backend/machines/main.machine';
import { createInterpret } from './createInterpret';

export const { sender, context, matches, subscribe, hasTag } =
  createInterpret(machine);
