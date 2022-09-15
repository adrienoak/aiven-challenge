import { ReactNode, useContext, useMemo } from "react";
import type { InterpreterFrom, StateFrom } from "xstate";
import { createContext } from "react";
import {
  geoLocationMachine,
  GeoLocationMachineSchema,
} from "../machine/geo-location.machine";
import { useInterpret, useSelector } from "@xstate/react";

// Heavily Inspired on https://github.com/nicknisi/quiz-game

type IGeoLocationMachine = typeof geoLocationMachine;

interface IGeoLocationProps {
  children?: ReactNode;
}

type IGeoContext = null | {
  service: InterpreterFrom<IGeoLocationMachine>;
};

export const GeoContext = createContext<IGeoContext>(null);

export function GeoLocationProvider({ children }: IGeoLocationProps) {
  const service = useInterpret(geoLocationMachine);

  return (
    <GeoContext.Provider value={{ service }}>{children}</GeoContext.Provider>
  );
}

export function useGeoLocation() {
  const context = useContext(GeoContext);

  if (!context?.service) {
    throw new Error("useGeoLocation must be used within a GeoLocationProvider");
  }

  return context.service;
}

export function useGeoSelector<T>(
  selector: (state: StateFrom<IGeoLocationMachine>) => T
) {
  const service = useGeoLocation();

  return useSelector(service, selector);
}

export function useIsGeoLocationAccepted() {
  return useGeoSelector((state) => state.matches("accepted"));
}

export function useCoordinates() {
  return useGeoSelector((state) => {
    const { latitude, longitude } = state.context as Required<
      Omit<GeoLocationMachineSchema, "error">
    >;

    return { latitude, longitude };
  });
}

export function useIsNoGeoLocationDecision() {
  return useGeoSelector((state) => state.matches("idle"));
}
