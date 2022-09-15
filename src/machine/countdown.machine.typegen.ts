// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "goSomewhereElse";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    goSomewhereElse: "";
    secondPassed: "TICK";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    doneWithTimer: "";
  };
  eventsCausingDelays: {};
  matchesStates: "done" | "running";
  tags: never;
}
