// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(THROTTLE_TIME)#(machine).idle": {
      type: "xstate.after(THROTTLE_TIME)#(machine).idle";
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    filter: "FILTER";
    initializeToggle: "xstate.init";
    resetEdititng: "xstate.after(THROTTLE_TIME)#(machine).idle" | "xstate.stop";
    sendParentFilter: "FILTER";
    sendParentToggle: "TOGGLE";
    toggle: "TOGGLE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isEditing: "xstate.after(THROTTLE_TIME)#(machine).idle";
  };
  eventsCausingDelays: {
    THROTTLE_TIME: "FILTER" | "xstate.init";
  };
  matchesStates: "done" | "idle";
  tags: never;
}
