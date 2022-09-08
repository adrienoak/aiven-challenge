import { useMemo } from "react";
import { getCloudsByProviders, ICloudInformation } from "../api/clouds";
import { CLOUD_PROVIDERS, IProviders } from "../internal/providers";

export function ByProvider({
  data = [],
}: {
  data: ICloudInformation[] | undefined;
}) {
  const regions = useMemo(() => {
    return getCloudsByProviders(data);
  }, [data]);

  const options = useMemo(() => {
    const length = Object.fromEntries(
      Object.keys(regions).map((e) => [
        e,
        Object.values(regions[e as keyof typeof regions]).length,
      ])
    );

    return {
      length,
    };
  }, [regions]);

  return (
    <div style={{ display: "flex", textAlign: "left" }}>
      {Object.entries(options.length).map(([key, length], i) => {
        return (
          <div key={key}>
            <h2 style={{ margin: "0 12px 0 0" }}>
              {CLOUD_PROVIDERS[key as IProviders]}
            </h2>
            <p style={{ margin: "0 12px 0 0" }}>{length}</p>
          </div>
        );
      })}
    </div>
  );
}
