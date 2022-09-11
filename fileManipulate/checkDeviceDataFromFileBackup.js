import {readdir, readFile} from 'fs/promises';
import {env} from './../config/env.js';

export default async function checkDeviceDataFromFileBackup(device) {
  try {
    let dirContent = await readdir(env.xml_api_data_dir);
    console.log('dirContent: ',dirContent)
    let deviceFileName = dirContent.filter((file) => file === device+'.xml')[0];
    console.log(
      'deviceFileName checkDeviceDataFromFileBackup\n',
      deviceFileName,
      '\n-----------------------'
    );
    if (deviceFileName.length === 0)
      throw new Error('from this device I have no bakup file');
    else {
      return await readFile(`${env.xml_api_data_dir}/${deviceFileName}`,{encoding:'utf-8'});
    }
  } catch (error) {
    return new Error(error);
  }
}
