import {readFile} from 'fs/promises';

export default async function allDevicesFromSkriptFile(path) {
  try {
    let fileContent = JSON.parse(await readFile(path, {encoding: 'utf-8'}));
    return fileContent;
  } catch (error) {
    return new Error(error);
  }
}
