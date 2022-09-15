interface IOptionHeaderProps<T> {
  options: T[];
  renderItem: (element: T, index: number) => React.ReactElement;
}

export function OptionHeader<T>({
  options,
  renderItem,
}: IOptionHeaderProps<T>) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-auto gap-x-2 gap-y-4 justify-center mb-12">
      {options.map(renderItem)}
    </div>
  );
}
