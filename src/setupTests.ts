import "@testing-library/jest-dom/extend-expect";
import { beforeAll, afterEach, afterAll } from "vitest";
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
