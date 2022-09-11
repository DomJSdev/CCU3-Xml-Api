import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';
import {env} from './../../config/env.js';


function DevicesPage({deviceDetails}) {  
  console.log(deviceDetails)

  const [device_details, set_device_details] = useState(<p>loading device</p>)

  useEffect(() => {
    if(typeof deviceDetails === 'object') {

      set_device_details(<> 
      <h1 className='text-center mb-5 font-bold text-3xl'>{deviceDetails.device.name.toUpperCase()}</h1>
      <hr className=' border-1 border-black'/>
      <p className='m-2 text-center underline italic'>{deviceDetails.device.address}</p>
      <p className='text-center'>{deviceDetails.device.description}</p>
      </>)
    }
    else{
      set_device_details(<>
      <p className='text-red-500'>can not load the device details</p>
      </>)
    }
  }, [deviceDetails]);

  return (
    <div className='p-10 mb-5 border-2 border-black w-4/5 m-auto rounded-xl shadow'>
      
     {device_details}
    </div>
  );
}

export default DevicesPage;


export async function getStaticProps({params}){
  console.log('params: ',params)
    const DevicesOptionList = await fetch(`${env.host}api/devices?device=${params.deviceId}`).then(res=>res.json())
    return{
      props:{
        deviceDetails:DevicesOptionList
      }
    }
  }

export async function getStaticPaths() {
  const devices = await fetch(
    `${env.host}api/devices?device=alldevicename`
  ).then((res) => res.json())
  return {
    paths: devices.map((name) => {
      return {
        params: {
          deviceId: name,
        },
      };
    }),
    fallback: false,
  };
}
