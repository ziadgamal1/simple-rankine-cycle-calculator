export default async function readJSONFile(x, y, z = undefined) {
  try {
    const response = await fetch(y);
    if (!response.ok) {
      throw new Error("Failed to load the JSON file");
    }
    const jsonData = await response.json();
    // console.log(x);
    // console.log(jsonData.data);
    if (z) {
      const requiredData = await jsonData.data.filter(
        (item) => item[0] === +x && item[1] === +z
      );
      // console.log(requiredData);
      return requiredData;
    }
    const requiredData = await jsonData.data.filter((item) => {
      if (y.includes("pressure")) {
        return +(item[0] * 10).toFixed(3) === +x;
      } else {
        return item[0] === +x;
      }
    });
    // console.log(requiredData);
    return requiredData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}
export async function RetrieveDataList(y, n = 0, x = undefined) {
  try {
    const response = await fetch(y);
    if (!response.ok) {
      throw new Error("Failed to load the JSON file");
    }
    const jsonData = await response.json();
    if (y.includes("superheated")) {
      const dataList = jsonData.data
        .filter((item) => {
          if (x !== undefined) {
            return item[0] === +x && item[7] === "vapor" && item[0] <= 22;
          }
          return item[7] === "vapor" && item[0] <= 22;
        })
        .map((item) => item[n]);
      const uniqueDataList = [...new Set(dataList)];
      return uniqueDataList;
    }
    const dataList = jsonData.data.map((item) => item[n]);
    const uniqueDataList = [...new Set(dataList)];
    // console.log(uniqueDataList);
    return uniqueDataList;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
}
