import axios from 'axios';
import Link from 'next/link';
import {AiOutlineMenu} from 'react-icons/ai'
import {useState, useCallback, useEffect} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';



function Home() {

  const [backup,setBackup] = useState(false)

  function getBackup(){
    console.log('backup started')
    axios.get('/api/devices?device=backup')
    return
  }


  useEffect(()=>{
    if(backup){ 
      getBackup()
    setBackup(false)
  }
  },[])

  return (
    <>
      {/* <button className='p-2 shadow mt-2 mb-2 mr-2 rounded-md bg-sky-700 text-black' onClick={()=>setBackup(true)}>backup</button> */}
      <p>Home seite</p>
    </>
  );
}

export default Home;
