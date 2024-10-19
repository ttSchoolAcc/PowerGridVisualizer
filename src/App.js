//import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

import solarPanel from './Graphics/SolarPanel.png';
import windTurbine from './Graphics/WindTurbine.png';
import hydroDam from './Graphics/HydroDam.png';

function App() {

  //let solarNum = 0;
  const [solarNum, setCount] = useState(0);
  const [windNum, setWindCount] = useState(0);
  const [hydroNum, setHydroCount] = useState(0);

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
{/* fsdaf */}
          </div>
        </div>

        {/*-------------------------------------------- HOMES -------------------------------------------- */}
        <div style={{flex: '45%'}}>
          <div class="mainpage-columns" style={{height: '400px'}}>
            <h2>Homes</h2>
          </div>

        {/*-------------------------------------------- STATISTICS -------------------------------------------- */}
          <div class="mainpage-columns" style={{height: '400px'}}>
            <h2>Stats</h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
