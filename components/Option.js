
function Option({deviceList}) {

    console.log('Option: das habe ich erhalten')
    console.log(deviceList)
  return (
    <>
      <option value={'/'+deviceList.name}>deviceList.name</option>
    </>
  );
}

export default Option;
