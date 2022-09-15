import { Choice } from "../../components/Choices";
import { Container } from "../../components/Container";
import { DbRendered } from "../../components/DbRendered";
import { OptionHeader } from "../../components/OptionHeader";
import { useRegion } from "./region.hook";

export function Region() {
  const { regions, selected, setSelected, dbList } = useRegion();

  return (
    <Container>
      <OptionHeader
        options={regions}
        renderItem={(e) => (
          <Choice
            key={e}
            onClick={() => setSelected(e)}
            option={e}
            selected={e === selected}
          />
        )}
      />

      <DbRendered options={dbList} />
    </Container>
  );
}
