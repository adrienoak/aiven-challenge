import { assign, createMachine } from "xstate";

type PaginationEvent<T> =
  | {
      type: "TOTAL_PAGES";
      data: T[];
    }
  | {
      type: "NEXT_PAGE";
    }
  | { type: "PREV_PAGE" };

export const makePaginationMachine = <T>(data: T[], perPage = 10) => {
  return createMachine(
    {
      initial: "idle",
      schema: {
        events: {} as PaginationEvent<T>,
      },
      tsTypes: {} as import("./pagination.machine.typegen").Typegen0,
      context: {
        total: 0,
        current: 1,
        perPage,
        data,
        display: undefined as undefined | T[],
      },
      on: {
        TOTAL_PAGES: {
          target: "canChange",
          actions: "assignTotal",
        },
      },
      states: {
        idle: {},
        canChange: {
          on: {
            NEXT_PAGE: {
              cond: "canGoNext",
              actions: "goNext",
            },
            PREV_PAGE: {
              cond: "canGoPrev",
              actions: "goPrev",
            },
          },
        },
      },
    },
    {
      guards: {
        canGoNext(context) {
          return context.current < context.total;
        },
        canGoPrev(context) {
          return context.current > 1;
        },
      },
      actions: {
        assignTotal: assign({
          total: (_, event) => {
            const calc = event.data.length / perPage;

            const highLevel = Math.ceil(calc);

            return highLevel;
          },
        }),
        goNext: assign({
          current: (ctx) => {
            console.log("HERE?");
            return ++ctx.current;
          },
        }),
        goPrev: assign({ current: (ctx) => --ctx.current }),
      },
    }
  );
};
