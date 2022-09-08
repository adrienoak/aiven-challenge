import { useMachine } from "@xstate/react";
import { useEffect, useMemo, useState } from "react";
import { getByLocation, ICloudInformation } from "../api/clouds";
import { GeoLocationMachineSchema } from "../machine/geo-location.machine";
import { makePaginationMachine } from "../machine/pagination.machine";

const perPage = 10;

export function ByProximity({
  context,
  data = [],
}: {
  data: ICloudInformation[] | undefined;
  context: GeoLocationMachineSchema;
}) {
  const { latitude, longitude } = context as Required<
    Omit<GeoLocationMachineSchema, "error">
  >;

  const options = useMemo(() => {
    return getByLocation({ latitude, longitude }, data);
  }, [latitude, longitude, data]);

  console.log("options:", options);
  const machineMaker = useMemo(() => {
    return makePaginationMachine(options);
  }, [options]);

  const [state, send] = useMachine(machineMaker);

  const context2 = state.context;

  useEffect(() => {
    send({ type: "TOTAL_PAGES", data: options });
  }, options);

  const [page, setPage] = useState(0);

  function setPagination(number: -1 | 1) {
    if (page === 0 && number === -1) {
      return;
    }

    if (page >= options.length / perPage) {
      console.log("LETS TEST?");
    }

    setPage((p) => p + 1);
  }

  const totalPages = context2.total;
  console.log("context2:", context2);

  return (
    <div>
      <h2 onClick={() => send("PREV_PAGE")}>OPREV</h2>
      <h2 onClick={() => send("NEXT_PAGE")}>NEXT</h2>
      <div onClick={() => setPagination(1)}>
        {options
          .slice(
            context2.current,
            context2.perPage * context2.current || context2.perPage
          )
          .map((e) => {
            return <div>{JSON.stringify(e)}</div>;
          })}
      </div>
    </div>
  );
}
