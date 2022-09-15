import { useMachine } from "@xstate/react";
import { useEffect, useMemo } from "react";
import { makePaginationMachine } from "../../machine/pagination.machine";
import { ICloudInformation } from "../../api/service";
import { DbCard } from "../DBCard";
import { Pagination } from "../Pagination";

interface IDbRenderedProps {
  options: ICloudInformation[];
}

export function DbRenderer({ options }: IDbRenderedProps) {
  const machineMaker = useMemo(() => makePaginationMachine(options), [options]);

  const [state, send] = useMachine(machineMaker);

  const context2 = state.context;

  useEffect(() => {
    send({ type: "TOTAL_PAGES", data: options });
  }, [options]);

  const paginatedOptions = useMemo(() => {
    return options.slice(
      context2.current * context2.perPage,
      context2.perPage * (context2.current + 1)
    );
  }, [options, context2.current, context2.perPage]);

  return (
    <div className="mb-8">
      <div className="grid justify-center gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-min">
        {paginatedOptions.map((e) => (
          <DbCard key={e.cloud_name} db={e} />
        ))}
      </div>
      {context2.total > 1 && (
        <Pagination
          size={context2.total}
          onPrev={() => send("PREV_PAGE")}
          onNext={() => send("NEXT_PAGE")}
          onTarget={(page) => send({ type: "JUMP_TO_PAGE", page })}
          selected={context2.current}
          canNext={state.can("NEXT_PAGE")}
          canPrev={state.can("PREV_PAGE")}
        />
      )}
    </div>
  );
}
