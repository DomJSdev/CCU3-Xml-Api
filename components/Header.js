import axios from 'axios';
import Link from 'next/link';
import {AiOutlineMenu} from 'react-icons/ai';
import {useState, useCallback, useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';

function Header() {
  const router = useRouter();

  const [devicesList, setDeviceList] = useState([]);

  function goToPath(path) {
    if (path === '/') router.push(`/`);
    else              router.push(`/devices/${path}`);
  }

  const axiosLoadDeviceList =(async () => {
    axios.get('/api/devices?device=alldevicename').then((res) => {
      setDeviceList(res.data);
      return res.data;
    });
  });

  useEffect(() => {
    axiosLoadDeviceList();
    return;
  }, []);

  return (
    <header className="sticky top-0 flex p-5 mb-5 rounded-b-xl shadow w-sreen h-20 bg-red-700">
      <div className="w-1/4 ml-10 mr-10">
        <select
          className="rounded-md shadow bg-white w-1/3 h-8"
          onChange={(e) => {
            return goToPath(e.target.value);
          }}
        >
          <option value={'/'}>HOME</option>
          {
          typeof devicesList=== 'object'?
          devicesList.map((opt) => {
            return (
              <option value={opt} key={opt}>
                {opt}
              </option>
            );
          }):<option>error</option>
          }
        </select>
      </div>
      <p className="text-white w-1/2 text-3xl">My Homatic CCU3 App</p>
    </header>
  );
}

export default Header;
