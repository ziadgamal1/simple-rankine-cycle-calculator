import { useEffect, useState } from "react";
export default function Result({ propertyData, selector, clearInputs }) {
  const [result, setresult] = useState({
    pumpPower: [],
    boilerPower: "",
    turbinePower: [],
    condenserPower: [],
    Wnet: [],
    efficiency: [],
  });

  function handleClick() {
    document.getElementById("rankine-cycle-diagram").style.transform =
      "translate(15%,-14%)";
    const Wnet =
      propertyData.boilerData[5] -
      propertyData.condenserData[8] -
      0.1 *
        (propertyData.boilerData[0] -
          propertyData.condenserData[selector === "pressure" ? 0 : 1]);
    if (Wnet < 0) {
      alert("Check the input values");
      return;
    }
    clearInputs();
    const efficiency = Wnet / propertyData.boilerData[5];
    setresult((propertyResult) => {
      return {
        ...propertyResult,
        pumpPower:
          0.1 *
          (propertyData.boilerData[0] -
            propertyData.condenserData[selector === "pressure" ? 0 : 1]),
        boilerPower:
          propertyData.boilerData[5] -
          (propertyData.condenserData[7] +
            0.1 *
              (propertyData.condenserData[selector === "pressure" ? 0 : 1] -
                propertyData.boilerData[0])),
        turbinePower:
          propertyData.boilerData[5] - propertyData.condenserData[8],
        condenserPower:
          propertyData.condenserData[8] - propertyData.condenserData[7],
        Wnet: Wnet,
        efficiency: efficiency,
        /******  fe2bce39-4c2f-4ce6-a4d6-afa5ac182360  *******/
      };
    });
  }
  return (
    <>
      <div className="container container--result">
        <button className="calculate" onClick={handleClick}>
          Calculate
        </button>
      </div>
      {result.boilerPower && (
        <div className="flex flex--result">
          <p className="result">
            Boiler Power: {result.boilerPower.toFixed(2)} KW
          </p>
          <p className="result">
            Turbine Power: {result.turbinePower.toFixed(2)} KW
          </p>
          <p className="result">
            Condenser Power: {result.condenserPower.toFixed(2)} KW
          </p>
          <p className="result">Pump Power: {result.pumpPower.toFixed(2)} KW</p>
          <p className="result">Net Power: {result.Wnet.toFixed(2)} KW</p>
          <p className="result">
            Efficiency: {(result.efficiency * 100).toFixed(2)} %
          </p>
        </div>
      )}
    </>
  );
}
