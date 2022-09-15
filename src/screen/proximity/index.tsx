import { Container } from "../../components/Container";
import { DbRendered } from "../../components/DbRendered";
import { Spinner } from "../../components/Spinner";
import { useProximity } from "./proximity.hooks";
import { ProximityNotEnabled } from "./ProximityNotEnabled";

export function Promixity() {
  const { isLoading, options, isNotDecision, isAccepted } = useProximity();

  if (isNotDecision) {
    return (
      <Container>
        <div className="h-80 flex items-center justify-center flex-col">
          <p className="mb-10 text-xl text-gray-900">
            This feature needs geolocation to function correctly
          </p>
          <Spinner />
        </div>
      </Container>
    );
  }

  if (!isAccepted) {
    return <ProximityNotEnabled />;
  }

  // if (!isLoading) {
  // }

  return (
    <Container>
      <DbRendered options={options} />
    </Container>
  );
}
