import { useEffect, useMemo, useState } from "react";
import { getRegions, ICloudInformation } from "../api/clouds";
import { Choice } from "./Choices";
import { Container } from "./Container";
import { DbCard } from "./DBCard";
import { DbRendered } from "./DbRendered";
import { OptionHeader } from "./OptionHeader";

export function ByRegion({
  data = [],
}: {
  data: ICloudInformation[] | undefined;
}) {
  const regions = useMemo(() => {
    return Array.from(new Set(data.map((e) => e.geo_region)));
  }, [data]);

  const struct = useMemo(() => {
    return getRegions(data);
  }, [data]);

  const [selected, setSelected] = useState("" as keyof typeof struct);

  useEffect(() => {
    setSelected(Object.keys(struct)[0]);
  }, [struct]);

  return (
    <Container>
      <OptionHeader
        options={regions}
        map={(e) => (
          <Choice
            onClick={() => setSelected(e)}
            option={e}
            selected={e === selected}
          />
        )}
      />
      {/* <div className=" grid gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-min justify-center">
        {Object.values(struct[selected] ?? {}).map((e) => {
          return <DbCard key={e.cloud_name} db={e} />;
        })}

      </div> */}
      <DbRendered options={Object.values(struct[selected] ?? {})} />
    </Container>
  );
}
