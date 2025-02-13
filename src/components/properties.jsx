export default function Properties({ enthalpy, propertySelector }) {
  document.getElementById("rankine-cycle-diagram").style.transform =
    "translate(15%,-5%)";

  return (
    <div className="flex properties">
      <p className="properties--p">
        h1 : <em>{enthalpy.condenserData[7].toFixed(2)} Kj/Kg</em>
      </p>
      <p className="properties--p">
        h2 :{" "}
        <em>
          {+(
            enthalpy.condenserData[7] +
            0.1 *
              (enthalpy.boilerData[0] -
                enthalpy.condenserData[propertySelector === "pressure" ? 0 : 1])
          ).toFixed(2)}{" "}
          Kj/Kg
        </em>
      </p>
      <p className="properties--p">
        h3 : <em>{+enthalpy.boilerData[5].toFixed(2)} Kj/Kg</em>
      </p>
      <p className="properties--p">
        h4 : <em>{+enthalpy.condenserData[8].toFixed(2)} Kj/Kg</em>
      </p>
    </div>
  );
}
