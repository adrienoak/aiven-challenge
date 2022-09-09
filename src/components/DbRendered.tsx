import { ReactElement } from "react";
import { ICloudInformation } from "../api/clouds";
import { DbCard } from "./DBCard";

interface IDbRenderedProps {
  options: ICloudInformation[];
}

export function DbRendered({ options }: IDbRenderedProps) {
  return (
    <div className=" grid gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-min justify-center">
      {options.map((e) => (
        <DbCard key={e.cloud_name} db={e} />
      ))}
    </div>
  );
}
