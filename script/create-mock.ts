import axios from "axios";
import { writeFile } from "fs/promises";
import { join } from "path";

import { API_URL } from "../src/api/service";

async function getCloudData() {
  const { data } = await axios.get(API_URL);

  return data.clouds;
}

async function main() {
  const json = await getCloudData();

  const path = join(process.cwd(), "mock.json");

  await writeFile(path, JSON.stringify(json, null, 4), { encoding: "utf-8" });
}

main();
