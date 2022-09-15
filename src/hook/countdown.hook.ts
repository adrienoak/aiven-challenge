import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { useMachine } from "@xstate/react";
import { countdownMachine } from "../machine/countdown.machine";

export function useCountdown() {
  const navigate = useNavigate();

  return useMachine(countdownMachine, {
    actions: {
      goSomewhereElse: () => {
        navigate(ROUTES.HOME_PAGE);
      },
    },
  });
}
