import { assign, createMachine } from "xstate";

type PossibleStates =
  import("./cloud-options.machine.typegen").Typegen0["matchesStates"];

type EventOptions =
  | { type: PossibleStates }
  | {
      type: "UPDATE_CTX";
      data: boolean;
    };

export const cloudOptionsMachine = (enabled = true) =>
  createMachine(
    {
      schema: {
        events: {} as EventOptions,
      },
      tsTypes: {} as import("./cloud-options.machine.typegen").Typegen0,
      context: {
        hasAccepted: enabled,
      },
      initial: "By Provider",
      states: {
        "By Provider": {},
        "By Proximity": {},
        "By Location": {},
      },
      on: {
        "By Location": "By Location",
        "By Provider": "By Provider",
        "By Proximity": { cond: "hasAccepted", target: "By Proximity" },
        UPDATE_CTX: { actions: "update" },
      },
    },
    {
      actions: {
        update: assign({
          hasAccepted: (_, event) => event.data,
        }),
      },
      guards: {
        hasAccepted(ctx) {
          return ctx.hasAccepted;
        },
      },
    }
  );
