import { ReactNode } from "react";

interface IToolTipProps {
  children: ReactNode;
}

// Great asset for this tooltip: https://www.kindacode.com/article/tailwind-css-how-to-create-tooltips/

export function ToolTip({ children }: IToolTipProps) {
  return (
    <div className="absolute hidden group-hover:flex w-full left-0 -top-3 justify-center -translate-y-full px-2 py-1 bg-blue-200/80  rounded-lg text-center text-gray-900 text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-blue-200/80">
      {children}
    </div>
  );
}
