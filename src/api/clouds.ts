import axios from "axios";
import { IProviders } from "../internal/providers";
import orderByDistance from "geolib/es/orderByDistance";
import { Coords } from "../machine/geo-location.machine";

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

export function getByLocation(
  currLocation: Coords,
  clouds: ICloudInformation[]
) {
  return orderByDistance(
    currLocation,
    clouds.map((e) => ({
      ...e,
      latitude: e.geo_latitude,
      longitude: e.geo_longitude,
    }))
  );
}

export function getRegions(clouds: ICloudInformation[]) {
  return clouds.reduce((acc, cloudInfo) => {
    const region = cloudInfo.geo_region;
    if (!acc[region]) {
      acc[region] = {};
    }
    acc[region] = {
      ...acc[region],
      [cloudInfo.cloud_name]: cloudInfo,
    };

    return acc;
  }, {} as Record<string, Record<string, ICloudInformation>>);
}

export function getCloudsByProviders(clouds: ICloudInformation[]) {
  return clouds.reduce((acc, cloudInfo) => {
    const cloudName = cloudInfo.cloud_name.split("-");

    const cloudProvider = cloudName[0] as IProviders;

    if (!acc[cloudProvider]) {
      acc[cloudProvider] = {};
    }

    acc[cloudProvider] = {
      ...acc[cloudProvider],
      [cloudInfo.cloud_name]: cloudInfo,
    };

    return acc;
  }, {} as Record<IProviders, Record<string, ICloudInformation>>);
}
