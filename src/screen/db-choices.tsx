import { useQuery } from "@tanstack/react-query";
import { useMachine } from "@xstate/react";
import { useEffect, useMemo } from "react";
import { getCloudData } from "../api/clouds";
import { useCoordinates, useIsAccepted } from "../App";
import { ByRegion } from "../components/ByLocation";
import { ByProvider } from "../components/ByProvider";
import { ByProximity } from "../components/ByProximity";
import { Option } from "../components/Option";
import { cloudOptionsMachine } from "../machine/cloud-options.machine";
import { GeoLocationMachineSchema } from "../machine/geo-location.machine";

export function DbChoices() {
  const isAccepted = useIsAccepted();

  const { data, isLoading } = useQuery(["KEY"], ({ signal }) =>
    getCloudData(signal)
  );

  const cloudMachine = useMemo(
    () => cloudOptionsMachine(isAccepted),
    [isAccepted]
  );

  const [state, send] = useMachine(cloudMachine);

  useEffect(() => {
    send({ type: "UPDATE_CTX", data: isAccepted });
  }, [isAccepted, send]);

  return (
    <>
      <nav className="h-20 bg-orange-600/40"></nav>
      <div className="mt-10">
        <div className="flex justify-center space-x-40">
          <Option
            option="Provider"
            onClick={() => {
              send("By Provider");
            }}
          />
          <Option
            option="Region"
            onClick={() => {
              send("By Location");
            }}
          />
          <Option
            onClick={() => {
              send("By Proximity");
            }}
            option="Proximity"
            enabled={isAccepted}
          />
        </div>

        {state.matches("By Location") && <ByRegion data={data} />}
        {state.matches("By Provider") && <ByProvider data={data} />}
        {state.matches("By Proximity") && <ByProximity data={data} />}
      </div>
    </>
  );
}
