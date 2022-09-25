import path from "path";
import { checkFileExists } from "./checkFileExist.mjs";
import { readAddIds } from "./readAddIds.mjs";
import { createAddId } from "./createAddId.mjs";

const __dirname = path.resolve();
const file = "userId.json";
export const pathToJSon = path.join(__dirname, file);

export async function writeFileJson(id) {


  const isExist = await checkFileExists(pathToJSon);

  if (isExist) {
    try {
      await readAddIds(id, pathToJSon);
    } catch (e) {
      console.log("Error in read and adding ids", e);
    }
  } else {
    try {
      await createAddId(id, pathToJSon);
    } catch (e) {
      console.log("Error in creating and adding ids", e);
    }
  }
}
