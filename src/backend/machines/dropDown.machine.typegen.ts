// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.inputMachine": {
      type: "done.invoke.inputMachine";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.inputMachine": {
      type: "error.platform.inputMachine";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    inputMachine: "done.invoke.inputMachine";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    input: "INPUT";
    sendParentInput: "CHILD/INPUT/INPUT";
    sendParentToggle: "TOGGLE";
    startQuery: "";
    toggle: "TOGGLE";
  };
  eventsCausingServices: {
    inputMachine: "" | "xstate.init";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "done" | "idle";
  tags: never;
}
