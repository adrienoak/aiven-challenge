import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { useGetCloudData } from "../../api/service";
import { useIsGeoLocationAccepted } from "../../context";
import { cloudOptionsMachine } from "../../machine/cloud-options.machine";

export function useLayout() {
  const isAccepted = useIsGeoLocationAccepted();

  //  Making the query, even if we dont wish to use it now? Not sure if this is a pattern
  useGetCloudData();

  const [_, send] = useMachine(cloudOptionsMachine);

  useEffect(() => {
    send({ type: "UPDATE_CTX", data: isAccepted });
  }, [isAccepted, send]);

  return { isAccepted, send };
}
