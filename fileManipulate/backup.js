import {writeFile} from 'fs/promises';
import {env} from './../config/env.js';
import allDevicesFromSkriptFile from './allDevicesFromSkriptFile'

export default async function setBackup() {
  try {
    let deviceData = [];
    let deviceList = await allDevicesFromSkriptFile(env.xml_api_skripts_file);
    deviceList.forEach(async (deviceDetail) => {
      axios.get(env.ccu3_Url + deviceDetail.address).then(async (res) => {
        writeFile(`${Path}xml-api-data/${deviceDetail.name}.xml`, res.data, {
          encoding: 'utf-8',
        }).then((result) => result);
        deviceData.push(res.data);
        return res.data;
      });
    });
  } catch (error) {
    return new Error(error);
  }
}
