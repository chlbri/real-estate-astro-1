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
    "done.invoke.(machine).rinit:invocation[0]": {
      type: "done.invoke.(machine).rinit:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).starting:invocation[0]": {
      type: "done.invoke.(machine).starting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.querying.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.querying.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.queryBuilderMachine": {
      type: "done.invoke.queryBuilderMachine";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.(machine).hydration:invocation[0]": {
      type: "error.platform.(machine).hydration:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).rinit:invocation[0]": {
      type: "error.platform.(machine).rinit:invocation[0]";
      data: unknown;
    };
    "error.platform.queryBuilderMachine": {
      type: "error.platform.queryBuilderMachine";
      data: unknown;
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
    hydrationMachine: "done.invoke.(machine).hydration:invocation[0]";
    inputMachine:
      | "done.invoke.(machine).working.ui.inputs.superiorOrEqualTo:invocation[0]"
      | "done.invoke.(machine).working.ui.inputs.inferiorOrEqualTo:invocation[0]";
    queryBuilderMachine: "done.invoke.queryBuilderMachine";
    resestLocalQuery: "done.invoke.(machine).rinit:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignInputCountry: "CHILD/COUNTRY/INPUT";
    assignInputInferior: "CHILD/INFERIOR_OR_EQUAL_TO/INPUT";
    assignInputSuperior: "CHILD/SUPERIOR_OR_EQUAL_TO/INPUT";
    assignInputType: "CHILD/TYPE/INPUT";
    buildQuery: "done.invoke.queryBuilderMachine";
    concatValuesForQuery: "START_QUERY";
    filter: "done.invoke.(machine).working.querying.filtering:invocation[0]";
    forward: "QUERY";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrate: "done.invoke.(machine).hydration:invocation[0]";
    resetCache: "__RINIT__";
    resetFiltered: "done.invoke.(machine).rinit:invocation[0]";
    resetInputs: "__RINIT__" | "done.invoke.(machine).starting:invocation[0]";
    resetQuery:
      | "START_QUERY"
      | "done.invoke.(machine).hydration:invocation[0]"
      | "done.invoke.(machine).starting:invocation[0]"
      | "done.invoke.(machine).working.querying.filtering:invocation[0]"
      | "error.platform.(machine).hydration:invocation[0]";
    sendInputCountry: "COUNTRY/INPUT";
    sendInputInferior: "INFERIOR_OR_EQUAL_TO/INPUT";
    sendInputSuperior: "SUPERIOR_OR_EQUAL_TO/INPUT";
    sendInputType: "TYPE/INPUT";
    sendQuery: "START_QUERY";
    sendToggleCountry: "COUNTRY/TOGGLE";
    sendToggleType: "TYPE/TOGGLE";
    toggleCountry: "CHILD/COUNTRY/TOGGLE";
    toggleType: "CHILD/TYPE/TOGGLE";
  };
  eventsCausingServices: {
    dropdownMachine:
      | "done.invoke.(machine).hydration:invocation[0]"
      | "done.invoke.(machine).starting:invocation[0]"
      | "error.platform.(machine).hydration:invocation[0]";
    filterMachine: "done.invoke.queryBuilderMachine";
    generateLists:
      | ""
      | "done.invoke.(machine).rinit:invocation[0]"
      | "error.platform.(machine).rinit:invocation[0]";
    hydrationMachine: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting";
    inputMachine:
      | "done.invoke.(machine).hydration:invocation[0]"
      | "done.invoke.(machine).starting:invocation[0]"
      | "error.platform.(machine).hydration:invocation[0]";
    queryBuilderMachine: "";
    resestLocalQuery: "__RINIT__";
  };
  eventsCausingGuards: {
    isBrowser: "__RINIT__" | "done.invoke.(machine).starting:invocation[0]";
  };
  eventsCausingDelays: {
    TIME_BETWEEN_REQUESTS: "done.invoke.(machine).starting:invocation[0]";
  };
  matchesStates:
    | "hydration"
    | "idle"
    | "rinit"
    | "starting"
    | "waiting"
    | "working"
    | "working.querying"
    | "working.querying.building"
    | "working.querying.filtering"
    | "working.querying.idle"
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
              querying?: "building" | "filtering" | "idle";
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
