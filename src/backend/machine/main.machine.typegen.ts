// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.after(200)#(machine).ui.dropdowns.country.busy": {
      type: "xstate.after(200)#(machine).ui.dropdowns.country.busy";
    };
    "xstate.after(200)#(machine).ui.dropdowns.type.busy": {
      type: "xstate.after(200)#(machine).ui.dropdowns.type.busy";
    };
    "xstate.after(200)#(machine).ui.inputs.price.focus.inferiorTo.busy": {
      type: "xstate.after(200)#(machine).ui.inputs.price.focus.inferiorTo.busy";
    };
    "xstate.after(200)#(machine).ui.inputs.price.focus.superiorTo.busy": {
      type: "xstate.after(200)#(machine).ui.inputs.price.focus.superiorTo.busy";
    };
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
    assignFilterCountry: "FILTER_BY_COUNTRY";
    assignFilterType: "FILTER_BY_TYPE";
    filterByCountry: "";
    filterByPrice: "";
    filterByType: "";
    generation: "";
    resetFilteredCountry: "";
    resetFilteredPrice: "";
    resetFilteredType: "";
    resetInputs: "RESET_INPUTS";
    setPriceInferior: "SET_PRICE_INFERIOR";
    setPriceSuperior: "SET_PRICE_SUPERIOR";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    inferiorAndSuperiorAreSet: "";
    isAlreadyFilteredByCountry: "";
    isAlreadyFilteredByPrice: "";
    isAlreadyFilteredByType: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "idle"
    | "ui"
    | "ui.dropdowns"
    | "ui.dropdowns.country"
    | "ui.dropdowns.country.busy"
    | "ui.dropdowns.country.checkFiltering"
    | "ui.dropdowns.country.filter"
    | "ui.dropdowns.country.filtering"
    | "ui.dropdowns.country.idle"
    | "ui.dropdowns.type"
    | "ui.dropdowns.type.busy"
    | "ui.dropdowns.type.checkFiltering"
    | "ui.dropdowns.type.filter"
    | "ui.dropdowns.type.filtering"
    | "ui.dropdowns.type.idle"
    | "ui.inputs"
    | "ui.inputs.price"
    | "ui.inputs.price.focus"
    | "ui.inputs.price.focus.inferiorTo"
    | "ui.inputs.price.focus.inferiorTo.busy"
    | "ui.inputs.price.focus.inferiorTo.checkPreviousFilter"
    | "ui.inputs.price.focus.inferiorTo.filter"
    | "ui.inputs.price.focus.inferiorTo.filtering"
    | "ui.inputs.price.focus.inferiorTo.focus"
    | "ui.inputs.price.focus.superiorTo"
    | "ui.inputs.price.focus.superiorTo.busy"
    | "ui.inputs.price.focus.superiorTo.checkPreviousFilter"
    | "ui.inputs.price.focus.superiorTo.filter"
    | "ui.inputs.price.focus.superiorTo.filtering"
    | "ui.inputs.price.focus.superiorTo.focus"
    | "ui.inputs.price.idle"
    | {
        ui?:
          | "dropdowns"
          | "inputs"
          | {
              dropdowns?:
                | "country"
                | "type"
                | {
                    country?:
                      | "busy"
                      | "checkFiltering"
                      | "filter"
                      | "filtering"
                      | "idle";
                    type?:
                      | "busy"
                      | "checkFiltering"
                      | "filter"
                      | "filtering"
                      | "idle";
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
                                  | "checkPreviousFilter"
                                  | "filter"
                                  | "filtering"
                                  | "focus";
                                superiorTo?:
                                  | "busy"
                                  | "checkPreviousFilter"
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
