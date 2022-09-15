import { BASE_BTN_STYLES } from "./style";

interface IPaginationButtonProps {
  value: string | number;
  onClick: () => void;
  selected?: boolean;
}

export function PaginationButton({
  value,
  onClick,
  selected = false,
}: IPaginationButtonProps) {
  return (
    <div
      className={`${BASE_BTN_STYLES} ${
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
