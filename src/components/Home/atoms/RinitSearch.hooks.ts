import { send } from '@-hooks/main.service';

export function rinit() {
  return send('__RINIT__');
}
