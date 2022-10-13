// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.(machine).starting:invocation[0]": {
      type: "done.invoke.(machine).starting:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.focus.inferiorTo.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.focus.inferiorTo.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.focus.superiorTo.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.focus.superiorTo.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.country.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.country.busy";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.type.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.type.busy";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.focus.inferiorTo.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.focus.inferiorTo.busy";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.focus.superiorTo.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.focus.superiorTo.busy";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    filterProperties:
      | "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.focus.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.focus.superiorTo.filtering:invocation[0]";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignFilterCountry: "FILTER_BY_COUNTRY";
    assignFilterType: "FILTER_BY_TYPE";
    filter:
      | "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.focus.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.focus.superiorTo.filtering:invocation[0]";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    resetCache: "__RESET__";
    resetInputs: "RESET_INPUTS" | "__RESET__";
    setPriceInferior: "SET_PRICE_INFERIOR";
    setPriceSuperior: "SET_PRICE_SUPERIOR";
  };
  eventsCausingServices: {
    filterProperties: "" | "FILTER_BY_COUNTRY" | "FILTER_BY_TYPE";
    generateLists: "";
  };
  eventsCausingGuards: {
    inferiorAndSuperiorAreSet: "";
  };
  eventsCausingDelays: {
    TIME_BETWEEN_REQUESTS:
      | "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.focus.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.focus.superiorTo.filtering:invocation[0]";
  };
  matchesStates:
    | "idle"
    | "starting"
    | "working"
    | "working.dropdowns"
    | "working.dropdowns.country"
    | "working.dropdowns.country.busy"
    | "working.dropdowns.country.filter"
    | "working.dropdowns.country.filtering"
    | "working.dropdowns.country.idle"
    | "working.dropdowns.type"
    | "working.dropdowns.type.busy"
    | "working.dropdowns.type.filter"
    | "working.dropdowns.type.filtering"
    | "working.dropdowns.type.idle"
    | "working.inputs"
    | "working.inputs.price"
    | "working.inputs.price.focus"
    | "working.inputs.price.focus.inferiorTo"
    | "working.inputs.price.focus.inferiorTo.busy"
    | "working.inputs.price.focus.inferiorTo.filter"
    | "working.inputs.price.focus.inferiorTo.filtering"
    | "working.inputs.price.focus.inferiorTo.focus"
    | "working.inputs.price.focus.superiorTo"
    | "working.inputs.price.focus.superiorTo.busy"
    | "working.inputs.price.focus.superiorTo.filter"
    | "working.inputs.price.focus.superiorTo.filtering"
    | "working.inputs.price.focus.superiorTo.focus"
    | "working.inputs.price.idle"
    | {
        working?:
          | "dropdowns"
          | "inputs"
          | {
              dropdowns?:
                | "country"
                | "type"
                | {
                    country?: "busy" | "filter" | "filtering" | "idle";
                    type?: "busy" | "filter" | "filtering" | "idle";
                  };
              inputs?:
                | "price"
                | {
                    price?:
                      | "focus"
                      | "idle"
                      | {
                          focus?:
                            | "inferiorTo"
                            | "superiorTo"
                            | {
                                inferiorTo?:
                                  | "busy"
                                  | "filter"
                                  | "filtering"
                                  | "focus";
                                superiorTo?:
                                  | "busy"
                                  | "filter"
                                  | "filtering"
                                  | "focus";
                              };
                        };
                  };
            };
      };
  tags: never;
}
