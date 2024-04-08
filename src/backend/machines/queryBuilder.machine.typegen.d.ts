// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    buildQuery: '';
    errorEquals: '';
    errorFormat: '';
    errorNotDefined: '';
    mergeQuery: 'QUERY';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    currentIsNotDefined: '';
    currentNotWellFormated: '';
    isOlder: '';
    previousEqualsCurrent: '';
  };
  eventsCausingServices: {};
  matchesStates: 'checking' | 'error' | 'idle' | 'success';
  tags: never;
}
