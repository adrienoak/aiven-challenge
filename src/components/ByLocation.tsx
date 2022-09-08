import { useEffect, useMemo, useState } from "react";
import { getRegions, ICloudInformation } from "../api/clouds";

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
  console.log("selected:", selected);

  useEffect(() => {
    setSelected(Object.keys(struct)[0]);
  }, [struct]);

  const userRegion = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("userRegion:", userRegion);
  console.log("providers:", getRegions(data));

  return (
    <div>
      <div style={{ display: "flex" }}>
        {regions.map((e) => {
          return (
            <div
              style={{
                margin: "0 12px 0 0",
                borderRight: "1px solid green",
                cursor: "pointer",
                borderBottom: selected === e ? "1px solid yellow" : "",
              }}
              key={e}
              onClick={() => setSelected(e)}
            >
              {e}
            </div>
          );
        })}
      </div>
      <hr />
      {Object.values(struct[selected] ?? {}).map((e) => {
        return <div key={e.cloud_description}>{e.cloud_name}</div>;
      })}
    </div>
  );
}
