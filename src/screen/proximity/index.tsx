import { Container } from "../../components/Container";
import { DbRenderer } from "../../components/DbRenderer";
import { Spinner } from "../../components/Spinner";
import { useProximity } from "./proximity.hooks";
import { ProximityNotEnabled } from "./ProximityNotEnabled";

export function Promixity() {
  const { isLoading, options, isNotDecision, isAccepted } = useProximity();

  if (isNotDecision) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-80">
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
      <DbRenderer options={options} />
    </Container>
  );
}
