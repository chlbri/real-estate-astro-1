
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.(machine).filtering:invocation[0]": { type: "done.invoke.(machine).filtering:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.(machine).hydration:invocation[0]": { type: "done.invoke.(machine).hydration:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.queryBuilderMachine": { type: "done.invoke.queryBuilderMachine"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.(machine).filtering:invocation[0]": { type: "error.platform.(machine).filtering:invocation[0]"; data: unknown };
"error.platform.(machine).hydration:invocation[0]": { type: "error.platform.(machine).hydration:invocation[0]"; data: unknown };
"error.platform.queryBuilderMachine": { type: "error.platform.queryBuilderMachine"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "filterMachine": "done.invoke.(machine).filtering:invocation[0]";
"hydrate": "done.invoke.(machine).hydration:invocation[0]";
"queryBuilderMachine": "done.invoke.queryBuilderMachine";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "buildQuery": "done.invoke.queryBuilderMachine";
"filter": "done.invoke.(machine).filtering:invocation[0]";
"hydrate": "done.invoke.(machine).hydration:invocation[0]";
"rethrow": "error.platform.(machine).filtering:invocation[0]" | "error.platform.(machine).hydration:invocation[0]" | "error.platform.queryBuilderMachine";
"sendQuery": "done.invoke.(machine).hydration:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "filterMachine": "done.invoke.queryBuilderMachine";
"hydrate": "xstate.init";
"queryBuilderMachine": "done.invoke.(machine).hydration:invocation[0]";
        };
        matchesStates: "building" | "error" | "filtering" | "hydration" | "success";
        tags: never;
      }
  