import { useMemo } from "react";
import { DirectionButton } from "./DirectionButton";
import { PaginationButton } from "./PaginationButton";

interface IPaginationProps {
  size: number;
  onPrev: () => void;
  onNext: () => void;
  onTarget: (target: number) => void;
  selected: number;
  canPrev: boolean;
  canNext: boolean;
}

export function Pagination({
  size,
  onPrev,
  onNext,
  onTarget,
  selected,
  canNext,
  canPrev,
}: IPaginationProps) {
  const pageArr = useMemo(() => {
    return Array.from({ length: size }, (_, i) => i);
  }, [size]);

  return (
    <div className="flex justify-between mt-8">
      <DirectionButton onClick={onPrev} value="Prev" enabled={canPrev} />
      {pageArr.map((e) => (
        <PaginationButton
          selected={e === selected}
          key={e}
          value={e}
          onClick={() => onTarget(e)}
        />
      ))}
      <DirectionButton onClick={onNext} value="Next" enabled={canNext} />
    </div>
  );
}
