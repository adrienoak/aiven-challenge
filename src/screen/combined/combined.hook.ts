import { useMemo } from "react";
import { useGetCloudData } from "../../api/service";
import { useParamsDefaultValue } from "../../hook/params-default-value";
import { IProviders } from "../../internal/providers";
import { getCloudsByCombinedStatus } from "../../utils/cloud-utils";

export function useCombined() {
  const { data = [] } = useGetCloudData();

  const regions = useMemo(() => {
    return getCloudsByCombinedStatus(data);
  }, [data]);

  const providersOnly = useMemo(() => {
    return Object.keys(regions);
  }, [regions]);

  const {
    search: provider,
    searchParams,
    setSearchParams,
  } = useParamsDefaultValue<IProviders>(providersOnly, "provider");

  function setProvider(key: string) {
    if (provider === key) {
      return;
    }

    setSearchParams({ provider: key });
  }

  const allRegions = useMemo(() => {
    if (!provider) {
      return [];
    }

    return Object.keys(regions[provider] ?? {});
  }, [provider, regions]);

  const { search: region } = useParamsDefaultValue(allRegions, "region");

  function setRegion(key: string) {
    if (region === key) {
      return;
    }

    searchParams.set("region", key);
    setSearchParams(searchParams);
  }

  const byRegionedProvider = useMemo(() => {
    if (!provider || !region) {
      return [];
    }

    const selectedData = regions?.[provider]?.[region];

    return Object.values(selectedData ?? {});
  }, [regions, provider, region]);

  return {
    providersOnly,
    setProvider,
    allRegions,
    setRegion,
    byRegionedProvider,
  };
}
