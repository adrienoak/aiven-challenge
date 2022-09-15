import { ToolTip } from "./Tooltips";

interface IOption {
  option: string;
  onClick: () => Promise<void> | void;
  enabled?: boolean;
  current: boolean;
}

export function Option({ option, onClick, enabled = true, current }: IOption) {
  const enabledClass = enabled
    ? "cursor-pointer active:shadow-orangeShadow "
    : "cursor-not-allowed";

  return (
    <button
      disabled={!enabled}
      aria-disabled={!enabled}
      className={`px-6 py-5 rounded-full min-w-[218px] text-2xl font-medium backdrop-blur-sm bg-aiven text-white ${enabledClass} transition  group relative hover:bg-hoverAiven hover:shadow-orangeShadow active:shadow-orangeShadow ${
        current && "shadow-orangeShadow"
      }`}
      onClick={onClick}
    >
      {option}
      {!enabled && (
        <ToolTip>
          Feature not enabled. Please allow website to know your location
        </ToolTip>
      )}
    </button>
  );
}
