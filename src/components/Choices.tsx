interface IChoice {
  option: string;
  onClick: () => Promise<void> | void;
  selected: boolean;
}

export function Choice({ option, onClick, selected }: IChoice) {
  return (
    <div
      className={`cursor-pointer p-2 rounded-lg text-lg backdrop-blur-sm border-solid  border-2 text-gray-700 transition duration-35 hover:bg-gray-500/10 border-neutral-800 capitalize ${
        selected
          ? "bg-gray-300 text-gray-500 hover:text-gray-500 hover:border-neutral-800 "
          : " text-gray-500"
      }`}
      onClick={onClick}
    >
      {option}
    </div>
  );
}
