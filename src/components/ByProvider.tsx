import { useEffect, useMemo, useState } from "react";
import { getCloudsByProviders, ICloudInformation } from "../api/clouds";
import { CLOUD_PROVIDERS, IProviders } from "../internal/providers";
import { Choice } from "./Choices";
import { Container } from "./Container";
import { DbCard } from "./DBCard";
import { DbRendered } from "./DbRendered";
import { OptionHeader } from "./OptionHeader";

export function ByProvider({
  data = [],
}: {
  data: ICloudInformation[] | undefined;
}) {
  const regions = useMemo(() => {
    return getCloudsByProviders(data ?? []);
  }, [data]);

  const [selected, setSelected] = useState("" as keyof typeof regions);

  const options = useMemo(() => {
    const length = Object.fromEntries(
      Object.keys(regions ?? {}).map((e) => [
        e,
        Object.values(regions[e as keyof typeof regions]).length,
      ])
    );

    return {
      length,
    };
  }, [regions]);

  useEffect(() => {
    if (!selected) {
      setSelected(Object.keys(regions)[0] as keyof typeof regions);
    }
  }, [regions]);

  return (
    <Container>
      <OptionHeader
        options={Object.entries(options.length)}
        map={([key], i) => (
          <Choice
            key={key}
            option={CLOUD_PROVIDERS[key as IProviders]}
            onClick={() => setSelected(key as IProviders)}
            selected={key === selected}
          />
        )}
      />

      <DbRendered options={Object.values(regions[selected] ?? {})} />
      {/* <div className="grid gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-min justify-center">
        {Object.values(regions[selected] ?? {}).map((e) => {
          return <DbCard key={e.cloud_name} db={e} />;
        })}
      </div> */}
    </Container>
  );
}
