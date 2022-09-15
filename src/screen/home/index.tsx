import { Choice } from "../../components/Choices";
import { Container } from "../../components/Container";
import { DbRendered } from "../../components/DbRendered";
import { OptionHeader } from "../../components/OptionHeader";
import { CLOUD_PROVIDERS, IProviders } from "../../internal/providers";
import { useHome } from "./home.hook";

export function HomePage() {
  const { isLoading, options, selected, setSelected, dbList } = useHome();

  return (
    <Container>
      <OptionHeader
        options={Object.entries(options.length)}
        renderItem={([key], i) => (
          <Choice
            key={key}
            option={CLOUD_PROVIDERS[key as IProviders]}
            onClick={() => setSelected(key as IProviders)}
            selected={key === selected}
          />
        )}
      />

      <DbRendered options={dbList} />
    </Container>
  );
}
