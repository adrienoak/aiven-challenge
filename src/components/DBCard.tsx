import { ICloudInformation } from "../api/clouds";

export function DbCard({ db }: { db: ICloudInformation }) {
  return (
    <article className="box-content max-w-sm text-gray-900 bg-blue-200/80  pt-2 flex px-8 flex-col space-y-3 pb-6 rounded-lg border-4 border-blue-200/80 cursor-pointer  hover:border-blue-900 transition duration-35 ease-in ">
      <div className=" text-lg">
        Name:
        <strong className="pl-4">{db.cloud_name}</strong>
      </div>
      <div>Description: {db.cloud_description}</div>
      <div>Location: {db.geo_region}</div>
    </article>
  );
}
