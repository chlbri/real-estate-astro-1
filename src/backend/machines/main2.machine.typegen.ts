// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.(machine).hydration:invocation[0]": {
      type: "done.invoke.(machine).hydration:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).starting:invocation[0]": {
      type: "done.invoke.(machine).starting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.querying.building:invocation[0]": {
      type: "done.invoke.(machine).working.querying.building:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.querying.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.querying.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.ui.dropdowns.country:invocation[0]": {
      type: "done.invoke.(machine).working.ui.dropdowns.country:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.ui.dropdowns.type:invocation[0]": {
      type: "done.invoke.(machine).working.ui.dropdowns.type:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    dropdownMachine:
      | "done.invoke.(machine).working.ui.dropdowns.country:invocation[0]"
      | "done.invoke.(machine).working.ui.dropdowns.type:invocation[0]";
    filterMachine: "done.invoke.(machine).working.querying.filtering:invocation[0]";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrateResearch: "done.invoke.(machine).hydration:invocation[0]";
    queryBuilderMachine: "done.invoke.(machine).working.querying.building:invocation[0]";
  };
  missingImplementations: {
    actions: "resetCache" | "resetInputs";
    services:
      | "generateLists"
      | "hydrateResearch"
      | "dropdownMachine"
      | "queryBuilderMachine"
      | "filterMachine";
    guards: never;
    delays: "TIME_BETWEEN_REQUESTS";
  };
  eventsCausingActions: {
    buildQuery: "done.invoke.(machine).working.querying.building:invocation[0]";
    filter: "done.invoke.(machine).working.querying.filtering:invocation[0]";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrateResearch: "done.invoke.(machine).hydration:invocation[0]";
    query:
      | "QUERY"
      | "done.invoke.(machine).working.ui.dropdowns.type:invocation[0]";
    resetCache: "__RINIT__";
    resetInputs: "__RINIT__" | "done.invoke.(machine).starting:invocation[0]";
    sendQuery: "done.invoke.(machine).working.ui.dropdowns.country:invocation[0]";
  };
  eventsCausingServices: {
    dropdownMachine: never;
    filterMachine: "done.invoke.(machine).working.querying.building:invocation[0]";
    generateLists: "";
    hydrateResearch: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting";
    queryBuilderMachine:
      | "QUERY"
      | "done.invoke.(machine).working.ui.dropdowns.type:invocation[0]";
  };
  eventsCausingGuards: {
    isBrowser: "done.invoke.(machine).starting:invocation[0]";
  };
  eventsCausingDelays: {
    TIME_BETWEEN_REQUESTS: "done.invoke.(machine).starting:invocation[0]";
  };
  matchesStates:
    | "hydration"
    | "idle"
    | "starting"
    | "waiting"
    | "working"
    | "working.querying"
    | "working.querying.building"
    | "working.querying.filtering"
    | "working.ui"
    | "working.ui.dropdowns"
    | "working.ui.dropdowns.country"
    | "working.ui.dropdowns.type"
    | "working.ui.inputs"
    | "working.ui.inputs.inferiorOrEqualTo"
    | "working.ui.inputs.superiorOrEqualTo"
    | {
        working?:
          | "querying"
          | "ui"
          | {
              querying?: "building" | "filtering";
              ui?:
                | "dropdowns"
                | "inputs"
                | {
                    dropdowns?: "country" | "type";
                    inputs?: "inferiorOrEqualTo" | "superiorOrEqualTo";
                  };
            };
      };
  tags: "busy";
}
