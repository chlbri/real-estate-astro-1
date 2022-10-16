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
    mergeQuery: "QUERY";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    currentIsNotDefined: "";
    currentNotWellFormated: "";
    isOlder: "";
    previousEqualsCurrent: "";
  };
  eventsCausingDelays: {};
  matchesStates: "checking" | "error" | "idle" | "success";
  tags: never;
}
