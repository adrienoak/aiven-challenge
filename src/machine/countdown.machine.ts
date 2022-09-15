import { assign, createMachine } from "xstate";

type Events = { type: "TICK" };

export const countdownMachine = createMachine(
  {
    tsTypes: {} as import("./countdown.machine.typegen").Typegen0,
    schema: {
      events: {} as Events,
    },
    id: "countdown",
    initial: "running",
    context: {
      duration: 5,
    },
    states: {
      running: {
        always: [
          {
            actions: "goSomewhereElse",
            target: "done",
            cond: "doneWithTimer",
          },
        ],
        invoke: {
          id: "timer",
          src: () => (cb) => {
            const intervalId = setInterval(() => {
              cb("TICK");
            }, 1000);

            return () => clearInterval(intervalId);
          },
        },
      },
      done: {},
    },
    on: {
      TICK: {
        actions: "secondPassed",
      },
    },
  },
  {
    actions: {
      secondPassed: assign({
        duration: (ctx) => --ctx.duration,
      }),
    },
    guards: {
      doneWithTimer(ctx) {
        return ctx.duration <= 0;
      },
    },
  }
);
