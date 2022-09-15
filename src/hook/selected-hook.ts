import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSelectedOption<
  Obj extends Record<string, any>,
  NewState extends keyof Obj & string
>(record: Obj, key: string): [NewState, (newState: NewState) => void] {
  const [selected, setSelected] = useState("" as NewState);

  const [searchParam, setSearchParams] = useSearchParams({
    [key]: selected as string,
  });

  const selectedParam = (searchParam.get(key) as NewState) || selected;

  function selectOption(newKey: NewState) {
    if (!newKey) {
      return;
    }

    setSelected(newKey);
    setSearchParams({ [key]: newKey });
  }

  useEffect(() => {
    if (!selected && !selectedParam) {
      selectOption(Object.keys(record)[0] as NewState);
    }
  }, [selected, selectedParam, record]);

  return [selectedParam, selectOption];
}
