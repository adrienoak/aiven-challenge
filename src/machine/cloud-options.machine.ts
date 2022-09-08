import { createMachine } from "xstate";

type PossibleStates =
  import("./cloud-options.machine.typegen").Typegen0["matchesStates"];

type EventOptions = { type: PossibleStates };

export const cloudOptionsMachine = createMachine({
  schema: {
    events: {} as EventOptions,
  },
  tsTypes: {} as import("./cloud-options.machine.typegen").Typegen0,

  initial: "By Provider",
  states: {
    "By Provider": {},
    "By Proximity": {},
    "By Location": {},
  },
  on: {
    "By Location": "By Location",
    "By Provider": "By Provider",
    "By Proximity": "By Proximity",
  },
});
