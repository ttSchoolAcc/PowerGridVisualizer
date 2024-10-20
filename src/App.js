//import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

import solarPanel from './Graphics/SolarPanel.png';
import windTurbine from './Graphics/WindTurbine.png';
import hydroDam from './Graphics/HydroDam.png';

import house from './Graphics/House.png';

function App() {

  //let solarNum = 0;
  const [solarNum, setCount] = useState(0);
  const [windNum, setWindCount] = useState(0);
  const [hydroNum, setHydroCount] = useState(0);
  const [kWattsNum, setkWattsNum] = useState(0);

  //const [solarPowerNum, setHydroCount] = useState(2); //We use KW/H

  const [items, setItems] = useState([]);
  //items.push("Item x"); //USE THIS TO ADD HOUSES

  const powerClick = (powerType, numToAdd) =>
  {
    if(powerType === "Solar" && solarNum + numToAdd >= 0)
    {
      setCount(solarNum + numToAdd);
    }
    else if(powerType === "Wind" && windNum + numToAdd >= 0)
    {
      setWindCount(windNum + numToAdd);
    }
    else if(powerType === "Hydro" && hydroNum + numToAdd >= 0)
    {
      setHydroCount(hydroNum + numToAdd);
    }

  }

  const houseAdd = () => {
    setItems(prevItems => [...prevItems, 1])
  }

  const houseDelete = () => {
    setItems(prevArray => prevArray.slice(0, -1))
  }


  /*function addSolarNum(e)
  {
    e.preventDefault();
    setCount(solarNum + 1);
  }*/


  return (

    <div className="App">

      <div class="mainpage-columns-parent">


        <div class="mainpage-columns" style={{flex: '15%'}}>
        {/*-------------------------------------------- ENERGY SOURCES -------------------------------------------- */}
          <h2>Energy Sources</h2>

          <button onClick={() => powerClick("Solar", 1)}>
            <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
          </button>

          <button onClick={() => powerClick("Wind", 1)}>
            <img src={windTurbine} alt="Wind Turbine" class="power-source-image"/>
          </button>

          <button onClick={() => powerClick("Hydro", 1)}>
            <img src={hydroDam} alt="Hydro Dam" class="power-source-image"/>
          </button>

        </div>

        {/*-------------------------------------------- POWER GRID -------------------------------------------- */}
        <div class="mainpage-columns" style={{flex: '40%'}}>
          <h2>Grid</h2>

          <div class="power-grid">

            <button onClick={() => powerClick("Solar", -1)}>
              <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
            </button>
            <p>x{solarNum}</p>

            <button onClick={() => powerClick("Wind", -1)}>
              <img src={windTurbine} alt="Wind Turbine" class="power-source-image"/>
            </button>
            <p>x{windNum}</p>

            <button onClick={() => powerClick("Hydro", -1)}>
              <img src={hydroDam} alt="Hydro Dam" class="power-source-image"/>
            </button>
            <p>x{hydroNum}</p>
          </div>
        </div>

        {/*-------------------------------------------- HOMES -------------------------------------------- */}
        <div style={{flex: '45%'}}>
          <div class="mainpage-columns" style={{height: '400px'}}>
            <h2>Homes</h2>


            <ul>
              {items.map((item, index) => (
                <>
                <img key={index} src={house} alt="House" class="power-source-image"/>
                </>
              ))}
            </ul>

            <button onClick={() => houseDelete()}> Remove House (Placeholder)</button>
            <button onClick={() => houseAdd()}> Add House (Placeholder)</button>



          </div>

        {/*-------------------------------------------- STATISTICS -------------------------------------------- */}
          <div class="stats-column" style={{height: '400px'}}>
            <h1>Stats</h1>
            <h2>{kWattsNum} KW/H</h2>
            <div class="statistics">
              <h4>Cost: </h4>
              <h4>Polution: </h4>
              <h4>Cost: </h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
