import axios from 'axios';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';

function DevicesPage() {
  const params = useRouter();
  const [deviceDetails, setDeviceDetails] = useState();
  console.log(params.query.deviceName);

  const fetchDeviceDetails = useCallback(async (deviceName) => {
    try {
      const deviceDetails = await axios.post('/api/devices', {
        device: deviceName,
      });
      setDeviceDetails(deviceDetails.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const deviceName = params.query.deviceName;
    if (deviceName) {
      fetchDeviceDetails(deviceName);
    }
  }, [params.query.deviceName, fetchDeviceDetails]);

  return (
    <div>
      <pre>{JSON.stringify(deviceDetails, null, 4)}</pre>
    </div>
  );
}

export default DevicesPage;
