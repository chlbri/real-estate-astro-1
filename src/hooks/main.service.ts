import { machine } from 'src/backend/machine/main.machine';
import { createInterpret } from './createInterpret';

export const { sender, context, matches, subscribe, hasTag } =
  createInterpret(machine);
