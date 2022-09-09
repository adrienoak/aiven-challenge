interface IOption {
  option: string;
  onClick: () => Promise<void> | void;
  enabled?: boolean;
}

export function Option({ option, onClick, enabled = true }: IOption) {
  return (
    <div
      className={`${
        enabled ? "cursor-pointer" : "cursor-not-allowed"
      } px-14 py-4 rounded-lg text-3xl backdrop-blur-sm bg-orange-600/50 text-white ${
        enabled && "hover:bg-orange-600"
      } transition duration-75`}
      onClick={onClick}
    >
      {option}
    </div>
  );
}
