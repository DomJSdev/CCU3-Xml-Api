import * as axios from "axios";
import { useState, useCallback, useEffect } from "react";
import {useRouter} from "next/router";

let test = true

function devicelist() {
  const router = useRouter()
  //console.log('router: ',router)

  console.log('router.pathname: ',router.pathname)
  let deviceName = test? 'devicelist' : router.pathname.replace('/','')
  //console.log('deviceName: ',deviceName)


  const [devices, setDevice] = useState('');

  const axiosRequest = useCallback(async(methode,deviceName)=>{
    console.log(`sende Request ${methode} ${deviceName}` )
    try {
      //if(methode === 'POST'){axios.default.post("/api/devices", { device: deviceName }).then((deviceContent) => {return deviceContent})};
      if(methode === 'GET'){axios.default.get(`/api/devices?device=${deviceName}`).then(res =>console.log(res.data))
      
    };
    } catch (error) {
      console.log(`${error.name}:\n${error.message}\n${error.code}\n`, error);
    }
  },[])
    console.log('router.isReady: ',router.isReady)

  useEffect(()=>{
    axiosRequest('GET',deviceName,(response)=>{
      console.log('axios GET JSON.stringify(response): ',JSON.stringify(response))
      setDevice(JSON.stringify(response))
    })
    //axiosRequest('POST',deviceName,(response)=>setDevice('axios POST JSON.stringify(response): ',JSON.stringify(response)))
  },[])


  return (
    <>
      <h1>devicelist</h1>
      <p>config/xmlapi/devicelist.cgi</p>
      <p>
        Liste aller Geräte mit Kanälen (Enthält u.a. die Namen, Seriennummern,
        Gerätetypen und ID's). Wird ?show_internal=1 angehängt, werden zudem
        alle internen Kanäle mit aufgelistet.
      </p>
      
      <hr />
      <button onClick={()=>axiosRequest('GET','all')}>test</button>
      <p style={{ width: "200px", height: "50px", backgroundColor: "red" }}>
      {devices}
      
      </p>
    </>
  );
}

export default devicelist;
