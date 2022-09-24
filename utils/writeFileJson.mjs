import path from "path";
import { checkFileExists } from "./checkFileExist.mjs";
import { readAddIds } from "./readAddIds.mjs";
import { createAddId } from "./createAddId.mjs";

const __dirname = path.resolve();
const file = "userId.json";
export const pathToJSon = path.join(__dirname, file);

export async function writeFileJson(id) {
  // Check if the file exists in the current directory.
  console.log("path writefilejson", pathToJSon);
  const isExist = await checkFileExists(pathToJSon);
  if (isExist) {
    await readAddIds(id, pathToJSon);
    return `done readAddIds,${pathToJSon}`;
  } else {
    await createAddId(id, pathToJSon);
    return "done createAddIds";
  }
}
