import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import reactLogo from "./assets/react.svg";
import { useCloudInfo } from "./cloud-info.hook";
import { DbChoices } from "./screen/db-choices";
import "./App.css";
import { useInterpret, useSelector } from "@xstate/react";
import {
  geoLocationMachine,
  GeoLocationMachineSchema,
} from "./machine/geo-location.machine";
import { InterpreterFrom, StateFrom } from "xstate";

function Selection() {
  return <div>Welcome to the Aiven Database Selector</div>;
}

function App() {
  // const { isPreSelection, context } = useCloudInfo();

  // if (isPreSelection) {
  //   return <Selection />;
  // }

  return (
    <div className="App">
      {" "}
      <DbChoices />{" "}
    </div>
  );
}

export default App;

type GeoLocationContext = InterpreterFrom<typeof geoLocationMachine>;

export interface GameProviderProps {
  children?: ReactNode;
}

type IGeoContext = null | {
  service: InterpreterFrom<typeof geoLocationMachine>;
};

export const GeoContext = createContext<IGeoContext>(null);

export function GeoProvider({ children }: GameProviderProps) {
  const service = useInterpret(geoLocationMachine, { devTools: true });
  return (
    <GeoContext.Provider value={{ service }}>{children}</GeoContext.Provider>
  );
}

function useGeoLocation() {
  const context = useContext(GeoContext);

  if (!context?.service) {
    throw new Error("useGameService must be used within a GameProvider");
  }

  const { service } = context;

  return service;
}

export function useIsAccepted() {
  return useGeoSelector((state) => state.matches("accepted"));
}

export function useGeoSelector<T>(
  selector: (state: StateFrom<typeof geoLocationMachine>) => T
) {
  const service = useGeoLocation();

  return useSelector(service, selector);
}

export function useCoordinates() {
  const service = useGeoLocation();

  return useSelector(service, (state) => {
    const { latitude, longitude } = state.context as Required<
      Omit<GeoLocationMachineSchema, "error">
    >;

    return { latitude, longitude };
  });
}
