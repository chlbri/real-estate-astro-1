import { machine } from '@-backend/machines/main.machine';
import { createInterpret } from './createInterpret';

export const { sender, context, matches, subscribe, hasTag, send } =
  createInterpret(
    machine.withContext({
      cache: {},
      ui: {
        data: {},
        dropdowns: {
          country: {
            default: 'select',
          },
          type: {
            default: 'select',
          },
        },
        inputs: {
          price: {
            inferiorOrEqualTo: { default: 'price' },
            superiorOrEqualTo: { default: 'price' },
          },
        },
        timeouts: {},
      },
    })
  );
