// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.(machine).idle:invocation[0]": {
      type: "done.invoke.(machine).idle:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.(machine).idle:invocation[0]": {
      type: "error.platform.(machine).idle:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    askGeoLocation: "done.invoke.(machine).idle:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setCoords: "done.invoke.(machine).idle:invocation[0]";
    setError: "error.platform.(machine).idle:invocation[0]";
  };
  eventsCausingServices: {
    askGeoLocation: "xstate.init";
  };
  eventsCausingGuards: {
    isDeniedError: "";
    isNotSupportedError: "";
  };
  eventsCausingDelays: {};
  matchesStates: "accepted" | "denied" | "error" | "idle" | "notSupported";
  tags: never;
}
