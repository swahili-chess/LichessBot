import * as fsp from "fs/promises";

export async function readFileReturnIds(pathToJSonFile) {
  console.log(`i entered readFileReturnIds`);
  try {
    const res = await fsp.readFile(pathToJSonFile, "utf8");
    const idsObj = JSON.parse(res);
    return idsObj["userId"];
  } catch (e) {
    console.log(e);
    return [];
  }
}
