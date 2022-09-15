import { Choice } from "../../components/Choices";
import { Container } from "../../components/Container";
import { DbRenderer } from "../../components/DbRenderer";
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
            choice={e}
            selected={e === selected}
          />
        )}
      />

      <DbRenderer options={dbList} />
    </Container>
  );
}
