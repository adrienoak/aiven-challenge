import { Choice } from "../../components/Choices";
import { Container } from "../../components/Container";
import { DbRenderer } from "../../components/DbRenderer";
import { OptionHeader } from "../../components/OptionHeader";
import { CLOUD_PROVIDERS, IProviders } from "../../internal/providers";
import { useHome } from "./home.hook";

export function HomePage() {
  const { isLoading, selected, setSelected, dbList, regions } = useHome();

  return (
    <Container>
      <OptionHeader
        options={Object.keys(regions)}
        renderItem={(key, i) => (
          <Choice
            key={key}
            choice={CLOUD_PROVIDERS[key as IProviders]}
            onClick={() => setSelected(key as IProviders)}
            selected={key === selected}
          />
        )}
      />

      <DbRenderer options={dbList} />
    </Container>
  );
}
