import * as dotenv from 'dotenv';

let env = {
    staus:                  process.env.NEXT_APP_DEV,
    host:                   process.env.NEXT_APP_HOST,
    ccu3_Port:              process.env.NEXT_APP_CCU3PORT,
    ccu3_Url:               process.env.NEXT_APP_CCU33URL,
    xml_api_skripts_file :  `${__dirname.substring(0, __dirname.length - 22)}xml-api-skripts/skript.json`,
    xml_api_data_dir :      `${__dirname.substring(0, __dirname.length - 22)}xml-api-backup-data`
  };

export {env}
