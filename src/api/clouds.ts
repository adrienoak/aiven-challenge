import axios from "axios";

export type ICloudInformation = {
  cloud_description: string;
  cloud_name: string;
  geo_latitude: number;
  geo_longitude: number;
  geo_region: string;
};

export type IGetCloud = {
  clouds: ICloudInformation[];
};

const API_URL = "https://api.aiven.io/v1/clouds";

export async function getCloudData(signal?: AbortSignal) {
  const { data } = await axios.get<IGetCloud>(API_URL, { signal });

  return data.clouds;
}
