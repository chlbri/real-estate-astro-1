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
    "done.invoke.(machine).working.working.querying.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.working.querying.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.working.ui.idle.dropdowns.country:invocation[0]": {
      type: "done.invoke.(machine).working.working.ui.idle.dropdowns.country:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.working.ui.idle.dropdowns.type:invocation[0]": {
      type: "done.invoke.(machine).working.working.ui.idle.dropdowns.type:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.working.ui.idle.inputs.inferiorOrEqualTo:invocation[0]": {
      type: "done.invoke.(machine).working.working.ui.idle.inputs.inferiorOrEqualTo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.working.ui.idle.inputs.superiorOrEqualTo:invocation[0]": {
      type: "done.invoke.(machine).working.working.ui.idle.inputs.superiorOrEqualTo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.queryBuilderMachine": {
      type: "done.invoke.queryBuilderMachine";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
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
      | "done.invoke.(machine).working.working.ui.idle.dropdowns.country:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.dropdowns.type:invocation[0]";
    filterMachine: "done.invoke.(machine).working.working.querying.filtering:invocation[0]";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrationMachine: "done.invoke.(machine).hydration:invocation[0]";
    inputMachine:
      | "done.invoke.(machine).working.working.ui.idle.inputs.superiorOrEqualTo:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.inputs.inferiorOrEqualTo:invocation[0]";
    queryBuilderMachine: "done.invoke.queryBuilderMachine";
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
    concatValuesForQuery:
      | "done.invoke.(machine).working.working.ui.idle.dropdowns.country:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.dropdowns.type:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.inputs.inferiorOrEqualTo:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.inputs.superiorOrEqualTo:invocation[0]";
    filter: "done.invoke.(machine).working.working.querying.filtering:invocation[0]";
    forward: "QUERY";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrate: "done.invoke.(machine).hydration:invocation[0]";
    resetCache: "__RINIT__";
    resetInputs: "__RINIT__" | "done.invoke.(machine).starting:invocation[0]";
    resetQuery: "";
    sendInputCountry: "COUNTRY/INPUT";
    sendInputInferior: "INFERIOR_OR_EQUAL_TO/INPUT";
    sendInputSuperior: "SUPERIOR_OR_EQUAL_TO/INPUT";
    sendInputType: "TYPE/INPUT";
    sendQuery:
      | "done.invoke.(machine).working.working.ui.idle.dropdowns.country:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.dropdowns.type:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.inputs.inferiorOrEqualTo:invocation[0]"
      | "done.invoke.(machine).working.working.ui.idle.inputs.superiorOrEqualTo:invocation[0]";
    sendToggleCountry: "COUNTRY/TOGGLE";
    sendToggleType: "TYPE/TOGGLE";
    toggleCountry: "CHILD/COUNTRY/TOGGLE";
    toggleType: "CHILD/TYPE/TOGGLE";
  };
  eventsCausingServices: {
    dropdownMachine: "";
    filterMachine: "done.invoke.queryBuilderMachine";
    generateLists: "";
    hydrationMachine: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting";
    inputMachine: "";
    queryBuilderMachine: "";
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
    | "working.idle"
    | "working.working"
    | "working.working.querying"
    | "working.working.querying.building"
    | "working.working.querying.filtering"
    | "working.working.ui"
    | "working.working.ui.idle"
    | "working.working.ui.idle.dropdowns"
    | "working.working.ui.idle.dropdowns.country"
    | "working.working.ui.idle.dropdowns.type"
    | "working.working.ui.idle.inputs"
    | "working.working.ui.idle.inputs.inferiorOrEqualTo"
    | "working.working.ui.idle.inputs.superiorOrEqualTo"
    | "working.working.ui.querying"
    | {
        working?:
          | "idle"
          | "working"
          | {
              working?:
                | "querying"
                | "ui"
                | {
                    querying?: "building" | "filtering";
                    ui?:
                      | "idle"
                      | "querying"
                      | {
                          idle?:
                            | "dropdowns"
                            | "inputs"
                            | {
                                dropdowns?: "country" | "type";
                                inputs?:
                                  | "inferiorOrEqualTo"
                                  | "superiorOrEqualTo";
                              };
                        };
                  };
            };
      };
  tags: "busy";
}
