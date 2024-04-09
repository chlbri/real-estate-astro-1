
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"xstate.after(THROTTLE_TIME)#(machine).idle": { type: "xstate.after(THROTTLE_TIME)#(machine).idle" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "input": "INPUT";
"resetEdititng": "xstate.after(THROTTLE_TIME)#(machine).idle";
"resetInput": "" | "INPUT" | "xstate.stop";
"sendParentInput": "INPUT";
"startQuery": "";
        };
        eventsCausingDelays: {
          "THROTTLE_TIME": "" | "INPUT" | "xstate.init";
        };
        eventsCausingGuards: {
          "isEditing": "xstate.after(THROTTLE_TIME)#(machine).idle";
        };
        eventsCausingServices: {
          
        };
        matchesStates: "done" | "idle";
        tags: never;
      }
  