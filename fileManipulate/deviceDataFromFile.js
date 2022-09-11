import {readFile} from 'fs/promises';
import {checkDeviceDataFromFileBackup} from './checkDeviceDataFromFileBackup';
import {env} from './../config/env.js';

export default async function deviceDataFromFile(device) {
  try {
    let dirContent = await checkDeviceDataFromFileBackup(device);

    for (let i = 0; i < dirContent.length; i++) {
      if (dirContent[i] === `${device}.xml`) {
        let fileContent = await readFile(
          `${env.xml_api_data_dir}/${device}.xml`,
          {
            encoding: 'utf-8',
          }
        );
        return fileContent;
      }
    }
  } catch (error) {
    return new Error(error);
  }
}
