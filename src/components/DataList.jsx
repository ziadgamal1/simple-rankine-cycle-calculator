import { useEffect, useState } from "react";
import { RetrieveDataList } from "../app.js";
export default function DataList({ filePath }) {
  const [dataList, setdataList] = useState();
  useEffect(() => {
    const y = RetrieveDataList(filePath);
    // console.log(y);
    y.then((data) => {
      // console.log(data);
      if (data[0] < 0.01) {
        return setdataList(data.map((item) => item * 10));
      }
      return setdataList(data);
    });
  }, [filePath]);
  return (
    <>
      {/* <dataList id="data"> */}
      {dataList &&
        dataList.map((item) => (
          <option key={Math.random()}>{+item.toFixed(4)}</option>
        ))}
      {/* </dataList> */}
    </>
  );
}
