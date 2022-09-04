import axios from "axios";
import Link from "next/link";

function Header({path}){ 

  console.log(path)
  let pathList = path.split('/')
  console.log(pathList)


  return (
    <>
    <select>
      <option value={'/'}>Home</option>
      {
      pathList.map((opt,index)=>{
        if(opt.length > 0) return <option value={'/'+opt} key={index}>{opt}</option>
      })
      }
    </select>
      
    </>
  );
}

export default Header;
