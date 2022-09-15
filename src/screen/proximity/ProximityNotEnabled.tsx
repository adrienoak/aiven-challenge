import { Container } from "../../components/Container";
import { useCountdown } from "../../hook/countdown.hook";

export function ProximityNotEnabled() {
  const [state] = useCountdown();
  const { duration } = state.context;

  return (
    <Container>
      <div className="flex flex-col items-center justify-center text-gray-900 h-80">
        <p className="w-1/2 text-xl text-center">
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
