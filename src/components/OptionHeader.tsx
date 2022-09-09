interface IOptionHeaderProps<T> {
  options: T[];
  map: (element: T, index: number) => React.ReactElement;
}

export function OptionHeader<T>({ options, map }: IOptionHeaderProps<T>) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-auto gap-x-2 gap-y-4 justify-center mb-12">
      {options.map(map)}
    </div>
  );
}
