import * as fsp from "fs/promises";

export async function readFileReturnIds(pathToJSonFile) {
  try {
    const res = await fsp.readFile(pathToJSonFile, "utf8");
    const idsObj = JSON.parse(res);
    return idsObj["userId"];
  } catch (e) {
    return [];
  }
}
