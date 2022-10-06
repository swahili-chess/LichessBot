import path from "path";
import * as fsp from "fs/promises";

const __dirname = path.resolve();
const file = "userId.json";
export const pathToJSon = path.join(__dirname, file);

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


export async function removeFileJson(id) {
 
    try {
       const res = await fsp.readFile(pathToJSon, "utf8");
       const idsObj = JSON.parse(res);
       if (idsObj["userId"].includes(id)) {
          const newArray = removeItemOnce(idsObj["userId"], id);
          idsObj["userId"]=newArray
          await fsp.writeFile(pathToJSon, JSON.stringify(idsObj));
       }
     } catch (e) {
        console.log("Error in deleting userId file", e);
     }

    
}
