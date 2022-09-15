import { Choice } from "../../components/Choices";
import { Container } from "../../components/Container";
import { DbRenderer } from "../../components/DbRenderer";
import { OptionHeader } from "../../components/OptionHeader";
import { CLOUD_PROVIDERS, IProviders } from "../../internal/providers";
import { useCombined } from "./combined.hook";

export function Combined() {
  const {
    allRegions,
    byRegionedProvider,
    providersOnly,
    setProvider,
    setRegion,
  } = useCombined();

  return (
    <Container>
      <OptionHeader
        options={providersOnly}
        renderItem={(key, i) => (
          <Choice
            key={key}
            choice={CLOUD_PROVIDERS[key as IProviders]}
            onClick={() => {
              setProvider(key);
            }}
            selected
          />
        )}
      />

      <OptionHeader
        options={allRegions}
        sm
        renderItem={(key) => {
          return (
            <Choice
              key={key}
              choice={key}
              onClick={() => {
                setRegion(key);
              }}
              selected
              sm
            />
          );
        }}
      />

      <DbRenderer options={byRegionedProvider} />
    </Container>
  );
}
