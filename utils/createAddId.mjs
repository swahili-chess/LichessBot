import * as fsp from "fs/promises";

export async function createAddId(id, pathToJSon) {
  // prettier-ignore
  const userIds = {
      userId: []
    };
  userIds["userId"].push(id);
  try {
    await fsp.writeFile(pathToJSon, JSON.stringify(userIds));
  } catch (e) {
    console.log("Failed to create & add Ids", e);
  }
}
