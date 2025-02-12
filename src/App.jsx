import readJSONFile from "./app.js";
import { useState, useEffect } from "react";
import "./App.css";
import DataList from "./components/DataList.jsx";
import "@xyflow/react/dist/style.css";
import RankineCycleDiagram from "./components/RankineCycle.jsx";
import { RetrieveDataList } from "./app.js";
import Result from "./components/Result.jsx";
import Properties from "./components/properties.jsx";
function App() {
  const [properties, setProperties] = useState({
    pressure: "",
    temperature: "",
    boilerP: "",
    boilerT: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [filePath, setfilepath] = useState("");
  const [propertySelector, setpropertySelector] = useState("");
  const [enthalpy, setenthalpy] = useState({
    condenserData: "",
    boilerData: "",
  });
  const [x, y] = useState();
  const [boilerTemp, setboilerTemp] = useState("");
  function clearResult() {
    setenthalpy("");
  }
  async function handleLoad() {
    const data = await RetrieveDataList(
      "../public/compressed_liquid_and_superheated_steam_V1.3.json"
    );
    y(data);
  }
  useEffect(() => {
    handleLoad();
  }, []);
  async function handleSelect(v) {
    clearResult();
    setProperties((prev) => ({ ...prev, boilerP: +v.target.value }));
    const data = await RetrieveDataList(
      "../public/compressed_liquid_and_superheated_steam_V1.3.json",
      1,
      (+v.target.value).toFixed(2)
    );
    console.log(data);
    // console.log(value.target.value / 10);
    setboilerTemp(data);
  }
  // function updateProperties(selector) {
  //   return selector === "temperature"
  //     ? tSat.current.value
  //     : tSat.current.value / 10;
  // }

  function handleChange(event) {
    clearResult();
    setSelectedOption(event.target.value);
    if (event.target.value === "temperature") {
      setfilepath("./saturatedbytemperature.json");
      setpropertySelector("temperature");
    } else if (event.target.value === "pressure") {
      setfilepath("./saturatedbytemperature.json");
      setpropertySelector("pressure");
    }
  }
  // console.log(dataList);
  function clearValues() {
    setProperties("");
    setfilepath("");
    setpropertySelector("");
    setSelectedOption("");
  }
  async function handleClick(x) {
    if (!x) {
      alert("Please select temperature or pressure");
      return;
    } else if (
      !properties.boilerP ||
      !properties.boilerT ||
      !properties[propertySelector]
    ) {
      alert("Please select the required inputs");
      return;
    }
    const boilerData = await readJSONFile(
      properties.boilerP,
      "./compressed_liquid_and_superheated_steam_V1.3.json",
      properties.boilerT
    ).then((data) => data[0]);
    const condenserData = await readJSONFile(properties[propertySelector], x);
    // console.log(condenserData);
    setenthalpy((preventhalpy) => {
      return {
        ...preventhalpy,
        condenserData: condenserData.flat(),
        boilerData: boilerData.flat(),
      };
    });
    // OLD MESSY CODE
    // if (propertySelector === "temperature") {
    //   updateProperties(propertySelector, +tSat.current.value);
    //   readJSONFile(tSat.current.value, x);
    // } else if (propertySelector === "pressure") {
    //   updateProperties(propertySelector, +tSat.current.value / 100);
    //   readJSONFile(tSat.current.value / 100, x);
    // }

    // readJSONFile(tSat.current.value, x);
  }

  return (
    <div className="App">
      <h1>Simple rankine cycle calculator</h1>
      <div className="condenser">
        <p className="title">Condenser</p>
        <div className=" radio-button radio_temperature radios">
          <input
            type="radio"
            id="temperature"
            name="properties"
            value="temperature"
            onChange={handleChange}
            checked={selectedOption === "temperature"}
            className="radio-button__input"
          />
          <label className="radio-button__label" htmlFor="temperature">
            <span class="radio-button__custom"></span>
            temperature[°C]
          </label>
        </div>
        <div className=" radio-button radio_pressure radios">
          <input
            type="radio"
            id="pressure"
            name="properties"
            value="pressure"
            onChange={handleChange}
            checked={selectedOption === "pressure"}
            className="radio-button__input"
          />
          <label className="radio-button__label" htmlFor="pressure">
            <span class="radio-button__custom"></span>
            pressure[bar]
          </label>
        </div>
        <select
          min={0}
          max={373}
          className="input_condenser input"
          value={properties[propertySelector]}
          onChange={(e) =>
            setProperties((prev) => ({
              ...prev,
              [propertySelector]: e.target.value,
            }))
          }
        >
          <option value="">Select a number</option>
          {filePath && <DataList filePath={filePath} />}
        </select>
      </div>

      <div className="boiler">
        <label className="boiler--pressure boiler--label" htmlFor="boiler_P">
          boiler pressure[bar]
        </label>
        <select
          name="boiler_P"
          required
          min={0}
          max={373}
          value={properties.boilerP}
          onChange={handleSelect}
          className="input_boiler_p input"
        >
          <option value="">Select a number</option>
          {x &&
            x.map((item) => (
              <option value={item} key={Math.random()}>
                {+(item * 10).toFixed(2)}
              </option>
            ))}
        </select>

        <label className="boiler--temperature boiler--label" htmlFor="boiler_T">
          boiler temperature[°C]
        </label>
        <select
          name="boiler_T"
          value={properties.boilerT}
          onChange={(e) =>
            setProperties((prev) => ({ ...prev, boilerT: +e.target.value }))
          }
          required
          min={0}
          max={373}
          list="temperature1"
          className="input_boiler_t input "
        >
          <option value="">Select a number</option>
          {boilerTemp &&
            boilerTemp.map((item) => (
              <option key={Math.random()}>{+item.toFixed(2)}</option>
            ))}
        </select>
      </div>
      <div className="container">
        <button
          type="submit"
          onClick={() => {
            handleClick(filePath);
          }}
        >
          Show properties
        </button>
      </div>
      {enthalpy.condenserData && (
        <Properties enthalpy={enthalpy} propertySelector={propertySelector} />
      )}
      {enthalpy.condenserData && (
        <Result
          propertyData={enthalpy}
          selector={propertySelector}
          clearInputs={clearValues}
        />
      )}
      {/* Trial */}

      <RankineCycleDiagram />
    </div>
  );
}

export default App;
