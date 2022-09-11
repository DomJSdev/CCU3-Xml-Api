import * as axios from 'axios';
import {env} from './../config/env.js';

export default async function getDeviceDataFromXmlApi(device) {
  try {
    let ccu3DeviceUrl = env.ccu3_Url + device.address;
    let deviceResponse = await axios.get(ccu3DeviceUrl);
    return deviceResponse;
  } catch (error) {
    return new Error(error);
  }
}
