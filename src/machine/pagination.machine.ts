import { assign, createMachine } from "xstate";

type PaginationEvent<T> =
  | {
      type: "TOTAL_PAGES";
      data: T[];
    }
  | {
      type: "NEXT_PAGE";
    }
  | { type: "PREV_PAGE" }
  | { type: "JUMP_TO_PAGE"; page: number };

export const makePaginationMachine = <T>(data: T[], perPage = 9) => {
  return createMachine(
    {
      initial: "idle",
      schema: {
        events: {} as PaginationEvent<T>,
      },
      tsTypes: {} as import("./pagination.machine.typegen").Typegen0,
      context: {
        total: 0,
        current: 0,
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
            JUMP_TO_PAGE: {
              actions: "jumpToPage",
              cond: "pageIsPossible",
            },
          },
        },
      },
    },
    {
      guards: {
        canGoNext(context) {
          return context.current + 2 <= context.total;
        },
        canGoPrev(context) {
          return context.current > 0;
        },
        pageIsPossible(ctx, event) {
          const { page } = event;

          return page >= 0 && page <= ctx.total;
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
            return ++ctx.current;
          },
        }),
        goPrev: assign({ current: (ctx) => --ctx.current }),
        jumpToPage: assign({
          current: (_, event) => event.page,
        }),
      },
    }
  );
};
