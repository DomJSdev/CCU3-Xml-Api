import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import ROUTES from '../../config/ROUTES';
import {useRouter} from 'next/router';

function DevicesPage() {
  const router = useRouter();
  const [selectedOption] = useState('devicelist');
  const [deviceNames, setDeviceNames] = useState([]);

  const fetchDeviceNames = useCallback(async (deviceType = 'all') => {
    const searchParams = new URLSearchParams();
    searchParams.set('device', deviceType);
    try {
      const deviceDetails = await axios.get(
        `/api/devices?${searchParams.toString()}`
      );
      setDeviceNames(deviceDetails.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const redirectToHandler = useCallback(
    (event) => {
      const value = event.target.value;
      if (value)
        router.push(`${ROUTES.devices.path}/${encodeURIComponent(value)}`);
    },
    [router]
  );

  useEffect(() => {
    fetchDeviceNames();
    // We need to run use effect once only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <select value={selectedOption} onChange={redirectToHandler}>
        {deviceNames.map((deviceName) => (
          <option key={deviceName} value={deviceName}>
            {deviceName}
          </option>
        ))}
      </select>
    </>
  );
}

export default DevicesPage;
