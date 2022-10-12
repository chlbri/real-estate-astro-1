// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.after(200)#(machine).dropdowns.country.busy": {
      type: "xstate.after(200)#(machine).dropdowns.country.busy";
    };
    "xstate.after(200)#(machine).dropdowns.type.busy": {
      type: "xstate.after(200)#(machine).dropdowns.type.busy";
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
    filterByCountry: "";
    filterByType: "FILTER_BY_TYPE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "dropdowns"
    | "dropdowns.country"
    | "dropdowns.country.busy"
    | "dropdowns.country.filter"
    | "dropdowns.country.filtering"
    | "dropdowns.country.idle"
    | "dropdowns.type"
    | "dropdowns.type.busy"
    | "dropdowns.type.filter"
    | "dropdowns.type.idle"
    | "idle"
    | {
        dropdowns?:
          | "country"
          | "type"
          | {
              country?: "busy" | "filter" | "filtering" | "idle";
              type?: "busy" | "filter" | "idle";
            };
      };
  tags: never;
}
