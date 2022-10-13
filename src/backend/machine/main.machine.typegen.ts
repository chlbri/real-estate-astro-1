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
    "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.focus": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.focus";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.focus": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.focus";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.country.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.country.busy";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.type.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.type.busy";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.inferiorTo.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.inferiorTo.busy";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.superiorTo.busy": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.superiorTo.busy";
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {
    filterProperties:
      | "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
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
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
    focusInferiorOrEqualTo: "";
    focusSuperiorOrEqualTo: "";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    resetCache: "__RINIT__";
    resetFilterCountry:
      | "__RINIT__"
      | "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]"
      | "xstate.stop";
    resetFilterInferiorOrEqualTo:
      | "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.focus"
      | "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.focus";
    resetFilterSuperiorOrEqualTo:
      | "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.focus"
      | "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.focus";
    resetFilterType:
      | "__RINIT__"
      | "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]"
      | "xstate.stop";
    resetInputs: "RESET_INPUTS" | "__RINIT__";
    setPriceInferior: "SET_PRICE_INFERIOR";
    setPriceSuperior: "SET_PRICE_SUPERIOR";
  };
  eventsCausingServices: {
    filterProperties:
      | ""
      | "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter"
      | "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter";
    generateLists: "";
  };
  eventsCausingGuards: {
    inferiorAndSuperiorAreSet: "";
    isCountryEditing: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter";
    isInferiorOrEqualEditing: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.focus";
    isSuperiorOrEqualEditing: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.focus";
    isTypeEditing: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter";
  };
  eventsCausingDelays: {
    THROTTLE_TIME:
      | ""
      | "FILTER_BY_COUNTRY"
      | "FILTER_BY_TYPE"
      | "SET_PRICE_INFERIOR"
      | "SET_PRICE_SUPERIOR"
      | "TOGGLE_DROPDOWN_COUNTRY"
      | "TOGGLE_DROPDOWN_TYPE"
      | "done.invoke.(machine).starting:invocation[0]"
      | "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.inferiorTo.busy"
      | "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.superiorTo.busy";
    TIME_BETWEEN_REQUESTS:
      | "done.invoke.(machine).working.dropdowns.country.filtering:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
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
    | "working.inputs.price.inferiorTo"
    | "working.inputs.price.inferiorTo.busy"
    | "working.inputs.price.inferiorTo.filter"
    | "working.inputs.price.inferiorTo.filtering"
    | "working.inputs.price.inferiorTo.focus"
    | "working.inputs.price.superiorTo"
    | "working.inputs.price.superiorTo.busy"
    | "working.inputs.price.superiorTo.filter"
    | "working.inputs.price.superiorTo.filtering"
    | "working.inputs.price.superiorTo.focus"
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
  tags: "busy";
}
