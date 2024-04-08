import { send } from '@-backend/main.service';

export function rinit() {
  return send('__RINIT__');
}
