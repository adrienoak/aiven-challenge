import { describe, it, expect } from "vitest";
import { IProviders } from "../internal/providers";
import { getCloudsByProviders, ICloudInformation } from "./clouds";

type Base = `${IProviders}-${string}`;

type IMakeMock = {
  name: string;
  mock: ICloudInformation;
};

describe("getCloudsByProviders", () => {
  function makeMock(name: Base): IMakeMock {
    return {
      name,
      mock: {
        cloud_description: "fake-description",
        cloud_name: name,
        geo_latitude: 1,
        geo_longitude: 1,
        geo_region: "geo-region",
      },
    };
  }
  it("should create the necessary data structure to house all providers by cloud", () => {
    const mockAws = makeMock("aws-something");
    const mockGoogle = makeMock("google-something");
    const mockAzure = makeMock("azure-something");
    const mockDigitalOcean = makeMock("do-something");
    const mockUpCloud = makeMock("upcloud-something");

    const clouds: ICloudInformation[] = [
      mockAws.mock,
      mockGoogle.mock,
      mockAzure.mock,
      mockDigitalOcean.mock,
      mockUpCloud.mock,
    ];

    const result = getCloudsByProviders(clouds);

    expect(result).toEqual({
      aws: {
        [mockAws.name]: mockAws.mock,
      },
      google: {
        [mockGoogle.name]: mockGoogle.mock,
      },
      azure: {
        [mockAzure.name]: mockAzure.mock,
      },
      do: {
        [mockDigitalOcean.name]: mockDigitalOcean.mock,
      },
      upcloud: {
        [mockUpCloud.name]: mockUpCloud.mock,
      },
    });
  });
});
