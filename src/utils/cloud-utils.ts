import { IProviders } from "../internal/providers";
import orderByDistance from "geolib/es/orderByDistance";
import { Coords } from "../machine/geo-location.machine";
import { ICloudInformation } from "../api/service";

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

function byProviderOnly(clouds: ICloudInformation[]) {
  return clouds.reduce((acc, cloudInfo) => {
    const cloudName = cloudInfo.cloud_name.split("-");

    const cloudProvider = cloudName[0] as IProviders;

    if (!acc[cloudProvider]) {
      acc[cloudProvider] = [];
    }

    acc[cloudProvider].push(cloudInfo);

    return acc;
  }, {} as Record<IProviders, ICloudInformation[]>);
}

export function getCloudsByCombinedStatus(clouds: ICloudInformation[]) {
  const provider = byProviderOnly(clouds);

  const obj = {} as Record<
    IProviders,
    Record<string, Record<string, ICloudInformation>>
  >;

  for (const element in provider) {
    const key = element as IProviders;
    const list = provider[key];

    const region = getRegions(list);

    obj[key] = region;
  }

  return obj;
}
