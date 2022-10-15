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
    "done.invoke.(machine).working.dropdowns.country.hydration:invocation[0]": {
      type: "done.invoke.(machine).working.dropdowns.country.hydration:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.dropdowns.type.hydration:invocation[0]": {
      type: "done.invoke.(machine).working.dropdowns.type.hydration:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).working.inputs.price.superiorTo.hydration:invocation[0]": {
      type: "done.invoke.(machine).working.inputs.price.superiorTo.hydration:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.(machine).working.dropdowns.country.hydration:invocation[0]": {
      type: "error.platform.(machine).working.dropdowns.country.hydration:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).working.dropdowns.type.hydration:invocation[0]": {
      type: "error.platform.(machine).working.dropdowns.type.hydration:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]": {
      type: "error.platform.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]": {
      type: "error.platform.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).working.inputs.price.superiorTo.filtering:invocation[0]": {
      type: "error.platform.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
      data: unknown;
    };
    "error.platform.(machine).working.inputs.price.superiorTo.hydration:invocation[0]": {
      type: "error.platform.(machine).working.inputs.price.superiorTo.hydration:invocation[0]";
      data: unknown;
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.filter": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.filter";
    };
    "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.filter": {
      type: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.filter";
    };
    "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting": {
      type: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting";
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
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrateResearch: "done.invoke.(machine).hydration:invocation[0]";
    saveFiltered:
      | "done.invoke.(machine).working.dropdowns.country.hydration:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.hydration:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.hydration:invocation[0]";
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
    buildQuery: "";
    clearTimeouts: "SET_PRICE_INFERIOR" | "SET_PRICE_SUPERIOR";
    filter:
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
    focusInferiorOrEqualTo: "";
    focusSuperiorOrEqualTo: "";
    generateLists: "done.invoke.(machine).starting:invocation[0]";
    hydrateResearch: "done.invoke.(machine).hydration:invocation[0]";
    resetCache: "__RINIT__";
    resetFilterCountry: "FILTER_BY_COUNTRY" | "__RINIT__" | "xstate.stop";
    resetFilterInferiorOrEqualTo: "" | "__RINIT__" | "xstate.stop";
    resetFilterSuperiorOrEqualTo: "" | "__RINIT__" | "xstate.stop";
    resetFilterType: "FILTER_BY_TYPE" | "__RINIT__" | "xstate.stop";
    resetInputs:
      | "RESET_INPUTS"
      | "__RINIT__"
      | "done.invoke.(machine).starting:invocation[0]";
    setPriceInferior: "SET_PRICE_INFERIOR";
    setPriceSuperior: "SET_PRICE_SUPERIOR";
    toggleCountryDropdown: "TOGGLE_DROPDOWN_COUNTRY";
    toggleTypeDropdown: "TOGGLE_DROPDOWN_TYPE";
  };
  eventsCausingServices: {
    filterProperties: "";
    generateLists: "";
    hydrateResearch: "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).waiting";
    saveFiltered:
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
  };
  eventsCausingGuards: {
    inferiorAndSuperiorAreSet: "";
    isBrowser:
      | ""
      | "done.invoke.(machine).starting:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]";
    isCountryEditing: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.country.filter";
    isInferiorOrEqualEditing: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.inferiorTo.filter";
    isInputNumber: "SET_PRICE_INFERIOR" | "SET_PRICE_SUPERIOR";
    isSuperiorOrEqualEditing: "xstate.after(THROTTLE_TIME)#(machine).working.inputs.price.superiorTo.filter";
    isTypeEditing: "xstate.after(THROTTLE_TIME)#(machine).working.dropdowns.type.filter";
  };
  eventsCausingDelays: {
    THROTTLE_TIME:
      | ""
      | "FILTER_BY_COUNTRY"
      | "FILTER_BY_TYPE"
      | "SET_PRICE_INFERIOR"
      | "SET_PRICE_SUPERIOR"
      | "done.invoke.(machine).hydration:invocation[0]"
      | "done.invoke.(machine).starting:invocation[0]"
      | "error.platform.(machine).working.dropdowns.country.hydration:invocation[0]"
      | "error.platform.(machine).working.dropdowns.type.hydration:invocation[0]"
      | "error.platform.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "error.platform.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]"
      | "error.platform.(machine).working.inputs.price.superiorTo.filtering:invocation[0]"
      | "error.platform.(machine).working.inputs.price.superiorTo.hydration:invocation[0]"
      | "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.country.busy"
      | "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.dropdowns.type.busy"
      | "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.inferiorTo.busy"
      | "xstate.after(TIME_BETWEEN_REQUESTS)#(machine).working.inputs.price.superiorTo.busy";
    TIME_BETWEEN_REQUESTS:
      | "done.invoke.(machine).starting:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.country.hydration:invocation[0]"
      | "done.invoke.(machine).working.dropdowns.type.hydration:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.inferiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.inferiorTo.hydration:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.filtering:invocation[0]"
      | "done.invoke.(machine).working.inputs.price.superiorTo.hydration:invocation[0]";
  };
  matchesStates:
    | "hydration"
    | "idle"
    | "starting"
    | "waiting"
    | "working"
    | "working.dropdowns"
    | "working.dropdowns.country"
    | "working.dropdowns.country.busy"
    | "working.dropdowns.country.filter"
    | "working.dropdowns.country.filtering"
    | "working.dropdowns.country.hydration"
    | "working.dropdowns.type"
    | "working.dropdowns.type.busy"
    | "working.dropdowns.type.filter"
    | "working.dropdowns.type.filtering"
    | "working.dropdowns.type.hydration"
    | "working.inputs"
    | "working.inputs.price"
    | "working.inputs.price.inferiorTo"
    | "working.inputs.price.inferiorTo.busy"
    | "working.inputs.price.inferiorTo.checking"
    | "working.inputs.price.inferiorTo.filter"
    | "working.inputs.price.inferiorTo.filtering"
    | "working.inputs.price.inferiorTo.hydration"
    | "working.inputs.price.superiorTo"
    | "working.inputs.price.superiorTo.busy"
    | "working.inputs.price.superiorTo.checking"
    | "working.inputs.price.superiorTo.filter"
    | "working.inputs.price.superiorTo.filtering"
    | "working.inputs.price.superiorTo.hydration"
    | {
        working?:
          | "dropdowns"
          | "inputs"
          | {
              dropdowns?:
                | "country"
                | "type"
                | {
                    country?: "busy" | "filter" | "filtering" | "hydration";
                    type?: "busy" | "filter" | "filtering" | "hydration";
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
                            | "checking"
                            | "filter"
                            | "filtering"
                            | "hydration";
                          superiorTo?:
                            | "busy"
                            | "checking"
                            | "filter"
                            | "filtering"
                            | "hydration";
                        };
                  };
            };
      };
  tags: "busy";
}
