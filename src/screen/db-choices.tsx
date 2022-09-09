import { useQuery } from "@tanstack/react-query";
import { useMachine } from "@xstate/react";
import { useMemo } from "react";
import { getCloudData } from "../api/clouds";
import { ByRegion } from "../components/ByLocation";
import { ByProvider } from "../components/ByProvider";
import { ByProximity } from "../components/ByProximity";
import { cloudOptionsMachine } from "../machine/cloud-options.machine";
import { GeoLocationMachineSchema } from "../machine/geo-location.machine";

export function DbChoices({ context }: { context: GeoLocationMachineSchema }) {
  const { data, isLoading } = useQuery(["KEY"], ({ signal }) =>
    getCloudData(signal)
  );

  const organizedByLocation = useMemo(() => {
    if (isLoading || !data) {
      return [];
    }

    return Array.from(new Set(data.map((e) => e.geo_region)));
  }, [isLoading, data]);

  const [state, send] = useMachine(cloudOptionsMachine);
  console.log("state:", state.value);

  return (
    <div>
      <h1 className="text-xl"> Heloo {state.value.toString()}</h1>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
          background: "red",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={() => send("By Provider")}>
          By Provider
        </div>
        <div style={{ cursor: "pointer" }} onClick={() => send("By Location")}>
          By Region
        </div>

        <div style={{ cursor: "pointer" }} onClick={() => send("By Proximity")}>
          By Proximity
        </div>
      </nav>

      {state.matches("By Location") && <ByRegion data={data} />}
      {state.matches("By Provider") && <ByProvider data={data} />}
      {state.matches("By Proximity") && (
        <ByProximity data={data} context={context} />
      )}
    </div>
  );
}
