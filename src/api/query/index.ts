import type { QueryClientConfig } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient(args?: QueryClientConfig) {
  return new QueryClient(args);
}
