import { useMemo } from "react";
import { useGetCloudData, getCloudsByProviders } from "../../api/service";
import { useSelectedOption } from "../../hook/selected-hook";

export function useHome() {
  const { data = [], isLoading } = useGetCloudData();

  const regions = useMemo(() => {
    return getCloudsByProviders(data);
  }, [data]);

  const [selected, setSelected] = useSelectedOption(regions, "provider");

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

  const dbList = useMemo(() => {
    return Object.values(regions[selected] ?? {});
  }, [regions, selected]);

  return {
    options,
    isLoading,
    selected,
    setSelected,
    dbList,
  };
}
