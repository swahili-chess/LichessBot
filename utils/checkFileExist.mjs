import * as fsp from "fs/promises";
import fs from "fs";


export async function checkFileExists(path) {
    try {
        const res = await fsp.access(path, fs.constants.F_OK);
        return !res;
    }
    catch (error) {
        console.log("checkfileisExist", error);
        return false
    }
}
