import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useParamsDefaultValue<T extends string>(
  arr: string[],
  key: string
): {
  search: T;
  searchParams: URLSearchParams;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
} {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = (searchParams.get(key) || "") as T;
  useEffect(() => {
    if (!search) {
      const newVal = arr[0] || "";

      if (newVal) {
        searchParams.set(key, newVal);
        setSearchParams(searchParams);
      }
    }
  }, [search, searchParams, setSearchParams, arr]);

  return { search, searchParams, setSearchParams };
}
