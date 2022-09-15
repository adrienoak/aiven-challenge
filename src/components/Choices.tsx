interface IChoice {
  choice: string;
  onClick: () => Promise<void> | void;
  selected: boolean;
  sm?: boolean;
}

export function Choice({ onClick, selected, choice, sm = false }: IChoice) {
  const sizeClasses = {
    default: "text-lg p-2",
    sm: "text-sm px-5 max-w-max",
  };

  const baseClasses =
    "text-center rounded-full backdrop-blur-sm border-solid  border-2 font-medium text-gray-700 transition duration-35  capitalize text-brandGrey-orange border-brandGrey-orange   cursor-pointer hover:border-brandGrey-darkOrange hover:text-brandGrey-darkOrange ";

  return (
    <div
      className={`${baseClasses} ${
        sm ? sizeClasses.sm : sizeClasses.default
      }    ${selected ? "text-opacity-80 border-opacity-80" : ""}`}
      onClick={onClick}
    >
      {choice}
    </div>
  );
}
