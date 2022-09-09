import { useMemo } from "react";

const baseStyles =
  "text-lg px-6 py-1 backdrop-blur-sm border-solid  border-2 text-gray-700 transition duration-35 hover:bg-gray-500/10 border-neutral-800 capitalize rounded-lg ";

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
    <div className="flex justify-between mb-8">
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

interface IPaginationButtonProps {
  value: string | number;
  onClick: () => void;
  selected?: boolean;
  enabled?: boolean;
}

function DirectionButton({
  value,
  onClick,
  enabled = true,
}: IPaginationButtonProps) {
  return (
    <div
      className={`${baseStyles} ${
        enabled
          ? "cursor-pointer "
          : "cursor-not-allowed bg-gray-900/80 text-gray-100"
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

function PaginationButton({
  value,
  onClick,
  selected = false,
  enabled = true,
}: IPaginationButtonProps) {
  return (
    <div
      className={`${baseStyles} ${
        selected
          ? "bg-gray-300 text-gray-500 hover:text-gray-500 hover:border-neutral-800 "
          : " text-gray-500"
      }
		 `}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
