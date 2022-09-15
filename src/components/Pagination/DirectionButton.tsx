import { BASE_BTN_STYLES } from "./style";

interface IPaginationButtonProps {
  value: string | number;
  onClick: () => void;
  selected?: boolean;
  enabled?: boolean;
}

export function DirectionButton({
  value,
  onClick,
  enabled = true,
}: IPaginationButtonProps) {
  return (
    <div
      className={`${BASE_BTN_STYLES} ${
        enabled
          ? "cursor-pointer "
          : "cursor-not-allowed bg-gray-900/80 text-gray-100 hover:text-gray-700 hover:bg-gray-900/90"
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
