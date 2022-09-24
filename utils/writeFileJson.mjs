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
      console.log(`done readAddIds,${pathToJSon}`);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      await createAddId(id, pathToJSon);
      console.log("done createAddIds");
    } catch (error) {
      console.log(error);
    }
  }
}
