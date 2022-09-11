import {readFile, readdir, writeFile} from 'fs/promises';
import {env} from './../../../config/env.js';
import allDevicesFromSkriptFile from './../../../fileManipulate/allDevicesFromSkriptFile.js';
import setBackup from './../../../fileManipulate/backup.js';
import checkDeviceDataFromFileBackup from './../../../fileManipulate/checkDeviceDataFromFileBackup.js';
import deviceDataFromFile from './../../../fileManipulate/deviceDataFromFile.js';
import filterDevice from './../../../helper/filterDevice.js';


import getDeviceDataFromXmlApi from './../../../RequestXmlApi/getDeviceDataFromXmlApi.js';

console.log('env.xml_api_data_dir: ', env.xml_api_data_dir);

//console.log('allDevicesFromSkriptFile:',allDevicesFromSkriptFile)
/*
ich muss die files vom den Ordnern "fileManipulate, helper und RequestXmlApi" importieren 
*/

let Path = __dirname.substring(0, __dirname.length - 22);

let test = true;

/*-------------------------------------------------------------------------------------------------*/

export default async function handler(req, res) {
  let httpMethod = req.method;
  let deviceQuery = req.query.device ? req.query.device : '';
  let deviceBody = req.body ? req.body.device : '';

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
      if (!deviceQuery.length > 0)
        res.status(400).send('I need a device name to search for it');
      /*
      
      ich muss hier implementieren das ich die xml daten lade 
      
      */
      let deviceDetail = await filterDevice(deviceQuery);

      let xmlApiDeviceData = env.staus === 'dev'? 
          await checkDeviceDataFromFileBackup(deviceQuery)
          : 
          await getDeviceDataFromXmlApi(deviceDetail);
      console.log('typeof xmlApiDeviceData: ',typeof xmlApiDeviceData)
      console.log('xmlApiDeviceData: ',xmlApiDeviceData)
      if (!(xmlApiDeviceData instanceof Error)) {
        let response = {
          device: deviceDetail,
          xml:
            xmlApiDeviceData === undefined
              ? 'sorry somthing went wrong'
              : xmlApiDeviceData,
          html: 'none',
        };
        console.log('response: ',response)
        res.status(200).send(response)
      }else {
        res.status(404).send('can not load the device details');
      }
    }

    /*______________________________________________________________________
    
      POST
      ______________________________________________________________________
    */
  } else if (httpMethod === 'POST') {
    if (!deviceBody) {
      res.status(400).send({msg: 'the body is emty'});
      return;
    }

    const deviceName = deviceBody;

    const deviceData = await filterDevice(deviceName);

    const xmlApiDeviceData =
      env.staus === 'dev'
        ? await checkDeviceDataFromFileBackup(deviceName)
        : await getDeviceDataFromXmlApi(deviceData);

    if (!(xmlApiDeviceData instanceof Error)) {
      const response = {
        device: deviceName,
        xml:
          xmlApiDeviceData === undefined
            ? 'sorry somthing went wrong'
            : xmlApiDeviceData,
        html: '',
      };
      res.status(200).send(response);
    } else {
      res.status(404).send({device: 'can not load the device daten'});
    }
  }
}
