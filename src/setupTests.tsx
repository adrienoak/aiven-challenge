import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/extend-expect";
import { beforeAll, afterEach, afterAll } from "vitest";
import { makeQueryClient } from "./api/query";
import { server } from "./mocks";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const testingQueryClient = makeQueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    error: () => {},
    log: console.log,
    warn: console.warn,
  },
});

type IWrapperProps = {
  children: React.ReactNode;
};

export function Wrappers({ children }: IWrapperProps) {
  return (
    <QueryClientProvider client={testingQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
