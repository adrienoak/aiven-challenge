import axios from "axios";
import { IProviders } from "../internal/providers";

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

export function getCloudsByProviders(clouds: ICloudInformation[]) {
  return clouds.reduce((acc, cloudInfo) => {
    const cloudName = cloudInfo.cloud_name.split("-");

    const cloudProvider = cloudName[0] as IProviders;

    if (acc[cloudProvider]) {
      acc[cloudProvider] = {};
    }

    acc[cloudProvider] = {
      [cloudInfo.cloud_name]: cloudInfo,
    };

    return acc;
  }, {} as Record<IProviders, Record<string, ICloudInformation>>);
}
