import allDevicesFromSkriptFile from './../fileManipulate/allDevicesFromSkriptFile.js';
import {env} from './../config/env.js';

export default async function filterDevice(deviceName) {
  let allDevices = await allDevicesFromSkriptFile(env.xml_api_skripts_file);
  if (allDevices instanceof Error) return ['sorry the filterDevice do somthig wrong'];
  
  return allDevices.filter((device) => device.name === deviceName)[0];
}
