// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    buildQuery: "";
    errorEquals: "";
    errorFormat: "";
    errorNotDefined: "";
    mergeQuery: "";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    currentIsNotDefined: "";
    currentNotWellFormated: "";
    previousEqualsCurrent: "";
  };
  eventsCausingDelays: {};
  matchesStates: "checking" | "idle" | "success";
  tags: never;
}
