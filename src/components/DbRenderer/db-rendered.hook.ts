import { useMachine } from "@xstate/react";
import { useMemo, useEffect } from "react";
import { ICloudInformation } from "../../api/service";
import { makePaginationMachine } from "../../machine/pagination.machine";

export function useDbRenderer(options: ICloudInformation[]) {
  const machineMaker = useMemo(() => makePaginationMachine(options), [options]);

  const [state, send] = useMachine(machineMaker);

  const { context } = state;

  useEffect(() => {
    send({ type: "TOTAL_PAGES", data: options });
  }, [options]);

  const paginatedOptions = useMemo(() => {
    return options.slice(
      context.current * context.perPage,
      context.perPage * (context.current + 1)
    );
  }, [options, context.current, context.perPage]);

  return {
    paginatedOptions,
    total: context.total,
    send,
    selected: context.current,
    canNext: state.can("NEXT_PAGE"),
    canPrev: state.can("PREV_PAGE"),
  };
}
