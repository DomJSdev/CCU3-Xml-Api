import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';

function DevicesPage({DevicesOptionList}) {
  const router = useRouter();

  console.log(router.query);

  const device = DevicesOptionList.filter(item => item.name === router.query.deviceId)[0]
  console.log(device)
  // const params = useRouter();
  // const [deviceDetails, setDeviceDetails] = useState();
  // console.log(params.query.deviceName);

  // const fetchDeviceDetails = useCallback(async (deviceName) => {
  //   try {
  //     const deviceDetails = await axios.post('/api/devices', {
  //       device: deviceName,
  //     });
  //     setDeviceDetails(deviceDetails.data);
  //   } catch (error) {
  //     console.error(error.code);
  //   }
  // }, []);

  // useEffect(() => {
  //   const deviceName = params.query.deviceName;
  //   if (deviceName) {
  //     fetchDeviceDetails(deviceName);
  //   }
  // }, [params.query.deviceName, fetchDeviceDetails]);

  return (
    <div>
      <h1>{device.name}</h1>
      <p>{device.address}</p>
      <pre>{device.description}</pre>
    </div>
  );
}

export default DevicesPage;


export async function getStaticProps({params}){
  console.log(`http://localhost:3000//api/devices?device=${params.deviceId}`)
    const DevicesOptionList = await fetch(`http://localhost:3000//api/devices?device=${params.deviceId}`).then(res=>res.json())
    return{
      props:{
        DevicesOptionList
      }
    }
  }

export async function getStaticPaths() {
  const devices = await fetch(
    'http://localhost:3000//api/devices?device=devicepages'
  ).then((res) => res.json());
  return {
    paths: devices.map((device) => {
      return {
        params: {
          deviceId: device.name,
        },
      };
    }),
    fallback: false,
  };
}
