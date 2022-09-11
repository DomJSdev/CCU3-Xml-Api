import {env} from './../../../config/env.js';
import allDevicesFromSkriptFile from './../../../fileManipulate/allDevicesFromSkriptFile.js';
import setBackup from './../../../fileManipulate/backup.js';
import checkDeviceDataFromFileBackup from './../../../fileManipulate/checkDeviceDataFromFileBackup.js';
import deviceDataFromFile from './../../../fileManipulate/deviceDataFromFile.js';
import filterDevice from './../../../helper/filterDevice.js';

import getDeviceDataFromXmlApi from './../../../RequestXmlApi/getDeviceDataFromXmlApi.js';

let Path = __dirname.substring(0, __dirname.length - 22);

/*-------------------------------------------------------------------------------------------------*/

export default async function handler(req, res) {
  let httpMethod = req.method;
  let deviceQuery = req.query.device ? req.query.device : '';

  if (httpMethod === 'GET') {
    if (deviceQuery === 'alldevicename') {
      let devices = await allDevicesFromSkriptFile(
        Path + 'xml-api-skripts/skript.json'
      );
      let deviceList = devices.map((item) => item.name);
      res.status(200).send(deviceList);
      return;
    } else if (deviceQuery === 'backup') {
      setBackup();
      return;
    } else {
      if (!deviceQuery.length > 0) res.status(400).send('I need a device name to search for it');
     
      let deviceDetail = await filterDevice(deviceQuery);

      let xmlApiDeviceData = env.staus === 'dev'? 
          await checkDeviceDataFromFileBackup(deviceQuery)
          : 
          await getDeviceDataFromXmlApi(deviceDetail);
      if (!(xmlApiDeviceData instanceof Error)) {
        let response = {
          device: deviceDetail,
          xml:
            xmlApiDeviceData === undefined
              ? 'sorry somthing went wrong'
              : xmlApiDeviceData,
          html: 'none',
        };
        res.status(200).send(response)
      }else {
        res.status(404).send('can not load the device details');
      }
    }
  } 
}
