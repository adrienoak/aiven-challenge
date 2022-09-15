import { useMemo } from "react";
import { useGetCloudData, getRegions } from "../../api/service";
import { useSelectedOption } from "../../hook/selected-hook";

export function useRegion() {
  const { data = [], isLoading } = useGetCloudData();

  const regions = useMemo(() => {
    return Array.from(new Set(data.map((e) => e.geo_region)));
  }, [data]);

  const struct = useMemo(() => {
    return getRegions(data);
  }, [data]);

  const [selected, setSelected] = useSelectedOption(struct, "location");

  const dbList = useMemo(
    () => Object.values(struct[selected] ?? {}),
    [struct, selected]
  );

  return {
    regions,
    selected,
    setSelected,
    dbList,
    isLoading,
  };
}
