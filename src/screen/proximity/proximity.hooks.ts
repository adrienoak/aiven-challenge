import { useEffect, useMemo } from "react";
import {
  useGetCloudData,
  getByLocation,
  ICloudInformation,
} from "../../api/service";
import {
  useCoordinates,
  useIsGeoLocationAccepted,
  useIsNoGeoLocationDecision,
} from "../../context";

function allFalsey(...args: unknown[]) {
  return args.every((element) => !element);
}

export function useProximity() {
  const isAccepted = useIsGeoLocationAccepted();
  const isNotDecision = useIsNoGeoLocationDecision();
  const { data = [], isLoading } = useGetCloudData(isAccepted);

  const { latitude, longitude } = useCoordinates();

  const isNotAccepted = allFalsey(latitude, longitude, isAccepted);

  const options = useMemo(() => {
    if (isNotAccepted) {
      return [] as ICloudInformation[];
    }
    return getByLocation(
      { latitude, longitude },
      data
    ) as unknown as ICloudInformation[];
  }, [latitude, longitude, data, isNotAccepted]);

  useEffect(() => {
    if (isNotDecision) {
      return;
    }
  }, [isNotDecision, isAccepted]);

  return {
    isLoading,
    options,
    isNotDecision,
    isAccepted,
  };
}
