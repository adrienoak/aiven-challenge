import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container";
import { useCountdown } from "../../hook/countdown.hook";

export function ProximityNotEnabled() {
  const [state] = useCountdown();
  const { duration } = state.context;
  console.log("duration:", duration);

  return (
    <Container>
      <div className="h-80 flex items-center justify-center flex-col text-gray-900">
        <p className="text-xl w-1/2 text-center">
          This feature does not work , please visit other pages or go to browser
          settings and allow this website to get know your location.
        </p>
        <p className="text-sm">
          Redirecting you to the home page in {duration} second
          {duration > 1 ? "s" : ""}
        </p>
      </div>
    </Container>
  );
}
