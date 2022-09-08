import { createMachine, assign } from "xstate";

type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type Coords = Writeable<
  Pick<GeolocationCoordinates, "latitude" | "longitude">
>;

export type GeoLocationMachineSchema = Partial<Coords> & {
  error?: NotSupportedError | GeolocationPositionError;
};

type GeoLocationMachineServices = {
  askGeoLocation: {
    data: Coords;
  };
};

class NotSupportedError extends Error {
  constructor() {
    super("Browser not supported");
    this.name = "NotSupportedError";
  }
}

export const geoLocationMachine = createMachine(
  {
    schema: {
      context: {} as GeoLocationMachineSchema,
      services: {} as GeoLocationMachineServices,
    },
    tsTypes: {} as import("./geo-location.machine.typegen").Typegen0,
    context: {},
    initial: "idle",
    states: {
      idle: {
        invoke: {
          src: "askGeoLocation",
          onDone: {
            actions: "setCoords",
            target: "accepted",
          },
          onError: {
            actions: "setError",
            target: "error",
          },
        },
      },
      accepted: {},
      error: {
        always: [
          { target: "notSupported", cond: "isNotSupportedError" },
          { target: "denied", cond: "isDeniedError" },
        ],
      },
      denied: {},
      notSupported: {},
    },
  },
  {
    guards: {
      isDeniedError(ctx) {
        return ctx.error instanceof GeolocationPositionError;
      },
      isNotSupportedError(ctx) {
        return ctx.error instanceof NotSupportedError;
      },
    },
    actions: {
      setCoords: assign((_, { data }) => {
        return {
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }),
      setError: assign({
        error: (_, event) => {
          const error = event.data as Error | GeolocationPositionError;

          return error;
        },
      }),
    },
    services: {
      async askGeoLocation() {
        return new Promise<Coords>((resolve, reject) => {
          if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(
              ({ coords }) => {
                const { latitude, longitude } = coords;
                resolve({
                  latitude,
                  longitude,
                });
              },
              (error) => {
                reject(error);
              }
            );
          }
          return reject(new NotSupportedError());
        });
      },
    },
  }
);
