import type { ICloudInformation } from "../api/service";

export function DbCard({ db }: { db: ICloudInformation }) {
  const description =
    db.cloud_description.split("-")[1] ?? db.cloud_description;

  return (
    <article className="box-content flex flex-col max-w-sm px-8 py-3 space-y-2 transition ease-in border-2 rounded-lg cursor-pointer text-brandGrey border-brandGrey/20 hover:border-brandGrey duration-35">
      <div className="text-lg font-black">{db.cloud_name}</div>
      <div>{description}</div>
      <div>Location: {db.geo_region}</div>
    </article>
  );
}
