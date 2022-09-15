interface IOptionHeaderProps<T> {
  options: T[];
  renderItem: (element: T, index: number) => React.ReactElement;
  sm?: boolean;
}

export function OptionHeader<T>({
  options,
  renderItem,
  sm = false,
}: IOptionHeaderProps<T>) {
  const colClasses = {
    default: "grid grid-cols-3 sm:grid-cols-auto gap-x-2 gap-y-4",
    sm: "flex gap-4 flex-wrap justify-start ld:justify-center",
  };

  return (
    <div
      className={`justify-center mb-12 ${
        sm ? colClasses.sm : colClasses.default
      }`}
    >
      {options.map(renderItem)}
    </div>
  );
}
