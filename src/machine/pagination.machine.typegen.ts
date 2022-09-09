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
    assignTotal: "TOTAL_PAGES";
    goNext: "NEXT_PAGE";
    goPrev: "PREV_PAGE";
    jumpToPage: "JUMP_TO_PAGE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    canGoNext: "NEXT_PAGE";
    canGoPrev: "PREV_PAGE";
    pageIsPossible: "JUMP_TO_PAGE";
  };
  eventsCausingDelays: {};
  matchesStates: "canChange" | "idle";
  tags: never;
}
