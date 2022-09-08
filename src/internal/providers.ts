export const CLOUD_PROVIDERS = {
  aws: "Amazon Web Services",
  google: "Google Cloud Platform",
  azure: "Microsoft Azure",
  do: "DigitalOcean",
  upcloud: "UpCloud",
} as const;

export type IProviders = keyof typeof CLOUD_PROVIDERS;
