import { ReactNode } from "react";

interface IContainerProps {
  children: ReactNode;
}

export function Container({ children }: IContainerProps) {
  return <div className=" mx-auto max-w-7xl mt-10">{children}</div>;
}
