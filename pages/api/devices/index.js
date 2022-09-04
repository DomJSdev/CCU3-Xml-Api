import { readFile, readdir } from "fs/promises";
import * as axios from "axios";
import * as dotenv from 'dotenv'

const [NEXT_APP_HOST,NEXT_APP_CCU3PORT,NEXT_APP_CCU33URL ] = dotenv.config().parsed
/*
here ist how you make the url for the http Request 
ccu3 Host + /config/xmlapi/ + device Skript + .cgi
*/

let Path = __dirname.substring(0, __dirname.length - 22);

let test = true;
let log = false

async function allDevicesFromSkriptFile(path) {
  try {
    let fileContent = JSON.parse(await readFile(path, { encoding: "utf-8" }));
    return fileContent;
  } catch (error) {
    return new Error(error);
  }
}

async function filterDevice(deviceName) {
  let allDevices = await allDevicesFromSkriptFile(
    Path + "xml-api-skripts/skript.json"
  );
  if (allDevices instanceof Error) {
    if(log)console.log('allDevices: ',allDevices);
    return;
  }
  return allDevices.filter((device) => device.name === deviceName)[0];
}

async function checkDeviceDataFromFileBackup(device) {
  try {
    let dirContent = await readdir(`${Path}/xml-api-data/`);
    return dirContent;
  } catch (error) {
    return new Error(error);
  }
}

async function deviceDataFromFile(device) {
  if(log)console.log("deviceDataFromFile");

  let dirContent = await checkDeviceDataFromFileBackup(device);
  for (let i = 0; i < dirContent.length; i++) {
    if(log) console.log("deviceDataFromFile: ",`${dirContent[i]} === ${device}.xml`);
    if (dirContent[i] === `${device}.xml`) {
      if(log) console.log("deviceDataFromFile find one xml")
      try {
        let fileContent = await readFile(`${Path}/xml-api-data/${device}.xml`, {
          encoding: "utf-8",
        });
        if(log) console.log('fileContent: ',fileContent)
        return fileContent;
      } catch (error) {
        return new Error(error);
      }
    }
  }
}

async function getDeviceDataFromXmlApi(device) {
  if(log)console.log("getDeviceDataFromXmlApi");
  try {
    let ccu3DeviceUrl = NEXT_APP_CCU33URL + device.address;
    let deviceResponse = await axios.get(ccu3DeviceUrl);
    if(log)console.log('deviceResponse: ',deviceResponse);
    return deviceResponse;
  } catch (error) {
    return new Error(error);
  }
}

/*-------------------------------------------------------------------------------------------------*/

export default async function handler(req, res) {
  if(log) console.log('req.method: ',req.method)
  if (req.method === "GET") {
    console.log('req.query.device: ',req.query.device)
    if(req.query.device === 'all'){
      console.log('give me all')
      let devices = await allDevicesFromSkriptFile(
        Path + "xml-api-skripts/skript.json"
      )
      let deviceList = devices.map(item=>item.name)
      console.log(deviceList)
      res.status(200).send(deviceList)  
      return

    }
    console.log('next if')
    if(log) console.log('req.query: ',req.query)
    const skriptlist = await allDevicesFromSkriptFile(
      Path + "xml-api-skripts/skript.json"
    );


    const device = filterDevice()
    if (!(device instanceof Error)) res.status(200).send(device);
    else res.status(404).send("can not load the device details");







  } else if (req.method === "POST") {
    if (!req.body) {
      if(log)console.log("body ist leer");
      res.status(400).send({ msg: "the body is emty" });
      return;
    }

    const deviceName = req.body.device;
    if(log) console.log('deviceName: ',deviceName)
    if(log)console.log("device Name: ", deviceName);

    const deviceData = await filterDevice(deviceName);

    const xmlApiDeviceData = test ? await deviceDataFromFile(deviceName) : await getDeviceDataFromXmlApi(deviceData);
      if(log) console.log('typeof xmlApiDeviceData: ',typeof xmlApiDeviceData)
      if(log) console.log('xmlApiDeviceData: ',xmlApiDeviceData)
      if(log)console.log("Error: ", xmlApiDeviceData instanceof Error);

    if (!(xmlApiDeviceData instanceof Error)) {
      const response = {
        device: deviceName,
        xml: xmlApiDeviceData=== undefined? 'sorry somthing went wrong' : xmlApiDeviceData,
        html: "",
      };
      res.status(200).send(response);
    } else {
      res.status(404).send({ device: "daten konnten nicht geladen werden" });
    }
  }
}
