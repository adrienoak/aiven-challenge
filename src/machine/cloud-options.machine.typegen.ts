// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
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
    update: "UPDATE_CTX";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    hasAccepted: "By Proximity";
  };
  eventsCausingDelays: {};
  matchesStates: "By Location" | "By Provider" | "By Proximity";
  tags: never;
}
