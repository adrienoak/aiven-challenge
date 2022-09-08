import { useQuery } from "@tanstack/react-query";
import { useMachine } from "@xstate/react";
import { useMemo } from "react";
import { getCloudData } from "./api/clouds";
import { geoLocationMachine } from "./machine/geo-location.machine";

export function useCloudInfo() {
  const [state] = useMachine(geoLocationMachine);
  const context = state.context;

  const isAccepted = state.matches("accepted");
  const currentState = state.value;

  const isPreSelection = state.matches("idle");

  return {
    isAccepted,
    isPreSelection,
    currentState,
    context,
  };
}
