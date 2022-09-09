import { useMachine } from "@xstate/react";
import { useEffect, useMemo, useState } from "react";
import { getByLocation, ICloudInformation } from "../api/clouds";
import { useCoordinates } from "../App";
import { makePaginationMachine } from "../machine/pagination.machine";
import { Container } from "./Container";
import { DbRendered } from "./DbRendered";
import { Pagination } from "./Pagination";

const perPage = 15;

export function ByProximity({
  data = [],
}: {
  data: ICloudInformation[] | undefined;
}) {
  const { latitude, longitude } = useCoordinates();

  const options = useMemo(() => {
    return getByLocation(
      { latitude, longitude },
      data
    ) as unknown as ICloudInformation[];
  }, [latitude, longitude, data]);

  const machineMaker = useMemo(() => {
    return makePaginationMachine(options);
  }, [options]);

  const [state, send] = useMachine(machineMaker);

  const context2 = state.context;

  useEffect(() => {
    send({ type: "TOTAL_PAGES", data: options });
  }, options);

  const paginatedOptions = useMemo(() => {
    return options.slice(
      context2.current * context2.perPage,
      context2.perPage * (context2.current + 1)
    );
  }, [options, context2.current, context2.perPage]);

  return (
    <Container>
      <Pagination
        size={context2.total}
        onPrev={() => send("PREV_PAGE")}
        onNext={() => send("NEXT_PAGE")}
        onTarget={(page) => send({ type: "JUMP_TO_PAGE", page })}
        selected={context2.current}
        canNext={state.can("NEXT_PAGE")}
        canPrev={state.can("PREV_PAGE")}
      />

      <DbRendered options={paginatedOptions} />
    </Container>
  );
}
