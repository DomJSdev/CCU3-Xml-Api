import axios from "axios";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

function Header(){ 

  const [devicesList, setDeviceList] = useState([]);

  function goToPath(path) {
    console.log('path: ',path)
    if(NEXT_APP_DEV) router.push(`devices?deviceName=${path}`)
   }

  const axiosLoadDeviceList = useCallback( async () => {
    axios.get('/api/devices?device=all').then((res) => {
       console.log(res.data)
      setDeviceList(res.data);
      return res.data;
    });
 })
 useEffect(() => {
  axiosLoadDeviceList((res)=>res);
  return
}, []);

  return (
    <>
    <select
    onLoad={()=>{
      goToPath(select.target.value)
    }}>
      <option value={'/'}>Home</option>
      {
      devicesList.map((opt)=>{
        return <option value={'/'+opt} key={opt}>{opt}</option>
      })}
    </select>
    </>
  );
}

export default Header;
