// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.(machine).filtering:invocation[0]": {
      type: "done.invoke.(machine).filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).hydration:invocation[0]": {
      type: "done.invoke.(machine).hydration:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.(machine).filtering:invocation[0]": {
      type: "error.platform.(machine).filtering:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).hydration:invocation[0]": {
      type: "error.platform.(machine).hydration:invocation[0]";
      data: unknown;
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).busy";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    filterProperties: "done.invoke.(machine).filtering:invocation[0]";
    saveFiltered: "done.invoke.(machine).hydration:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: "TIME_BETWEEN_REQUESTS";
  };
  eventsCausingActions: {
    filter: "done.invoke.(machine).filtering:invocation[0]";
    sendParentHydrationError: "error.platform.(machine).hydration:invocation[0]";
    sendParentQueryError: "error.platform.(machine).filtering:invocation[0]";
  };
  eventsCausingServices: {
    filterProperties: "xstate.init";
    saveFiltered: "done.invoke.(machine).filtering:invocation[0]";
  };
  eventsCausingGuards: {
    isBrowser: "done.invoke.(machine).filtering:invocation[0]";
  };
  eventsCausingDelays: {
    TIME_BETWEEN_REQUESTS:
      | "done.invoke.(machine).filtering:invocation[0]"
      | "done.invoke.(machine).hydration:invocation[0]"
      | "error.platform.(machine).filtering:invocation[0]"
      | "error.platform.(machine).hydration:invocation[0]";
  };
  matchesStates: "busy" | "done" | "filtering" | "hydration";
  tags: never;
}
