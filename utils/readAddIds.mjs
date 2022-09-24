import * as fsp from "fs/promises";

export async function readAddIds(id, pathToJSon) {
    try {
        
    const res = await fsp.readFile(pathToJSon, "utf8");
    const idsObj = JSON.parse(res);
    if (!idsObj["userId"].includes(id)) {
      idsObj["userId"].push(id);
      await fsp.writeFile(pathToJSon, JSON.stringify(idsObj));
    }
  } catch (error) {
    console.log("Faiulre read or write", error);
  }
}
