import { ToolTip } from "./Tooltips";

interface IOption {
  option: string;
  onClick: () => Promise<void> | void;
  enabled?: boolean;
}

export function Option({ option, onClick, enabled = true }: IOption) {
  const enabledClass = enabled
    ? "cursor-pointer hover:bg-orange-600"
    : "cursor-not-allowed";

  return (
    <div
      className={`px-14 py-4 rounded-lg text-3xl backdrop-blur-sm bg-orange-600/50 text-white ${enabledClass} transition duration-75 group relative`}
      onClick={onClick}
    >
      {option}
      {!enabled && (
        <ToolTip>
          Feature not enabled. Please allow website to know your location
        </ToolTip>
      )}
    </div>
  );
}

{
  /* <div className="mt-20">
<a
  href="#"
  className="group relative inline-block text-blue-500 underline hover:text-red-500 duration-300"
>
  Link with top tooltip
  <span className="absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
    This is some extra useful information
  </span>
</a>
</div> */
}
