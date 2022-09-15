import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useParamsDefaultValue } from "./params-default-value";

export function useSelectedOption<
  Obj extends Record<string, any>,
  NewState extends keyof Obj & string
>(
  record: Obj,
  key: string
): [NewState, (newState: NewState, clear?: boolean) => void, URLSearchParams] {
  const [selected, setSelected] = useState("" as NewState);

  const [searchParam, setSearchParams] = useSearchParams({
    [key]: selected as string,
  });

  const selectedParam = (searchParam.get(key) as NewState) || selected;

  const selectOption = useCallback(
    (newKey: NewState, clear: boolean = false) => {
      if (newKey === selectedParam) {
        return;
      }

      if (!newKey) {
        return;
      }

      setSelected(newKey);
      if (clear) {
        setSearchParams({ [key]: newKey });
        return;
      }

      searchParam.set(key, newKey);
      setSearchParams(searchParam);
    },
    [selected, setSearchParams, key]
  );

  useParamsDefaultValue(Object.keys(record ?? {}), key);

  return [selectedParam, selectOption, searchParam];
}
