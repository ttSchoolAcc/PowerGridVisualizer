import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

import solarPanel from './Graphics/SolarPanel.png';
import windTurbine from './Graphics/WindTurbine.png';

function App() {

  //let solarNum = 0;
  const [solarNum, setCount] = useState(0);

  function handleSubmit(e) 
  {
    e.preventDefault();
    setCount(solarNum + 1);
  }

  function removeSolarNum(e) 
  {
    if(solarNum > 0)
    {
      e.preventDefault();
      setCount(solarNum - 1);
    }
  }

  function addWindNum(e) 
  {
    if(solarNum > 0)
    {
      e.preventDefault();
      setCount(solarNum - 1);
    }
  }

  function removeWindNum(e) 
  {
    if(solarNum > 0)
    {
      e.preventDefault();
      setCount(solarNum - 1);
    }
  }

  return (

    <div className="App">

      <div class="mainpage-columns-parent">

        <div class="mainpage-columns" style={{flex: '15%'}}>
          <h2>Energy Sources</h2>

          <button onClick={handleSubmit}>
            <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
          </button>

          <button onClick={handleSubmit}>
            <img src={windTurbine} alt="Wind Turbine" class="power-source-image"/>
          </button>

          <button onClick={handleSubmit}>
            <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
          </button>

        </div>

        <div class="mainpage-columns" style={{flex: '40%'}}>
          <h2>Grid</h2>

          <div class="power-grid">

            <button onClick={removeSolarNum}>
              <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
            </button>
            <p>x{solarNum}</p>
            
            <button>
              <img src={windTurbine} alt="Wind Turbine" class="power-source-image"/>
            </button>
            <p>x{solarNum}</p>

          </div>
        </div>

        <div style={{flex: '45%'}}>
          <div class="mainpage-columns" style={{height: '400px'}}>
            <h2>Homes</h2>
          </div>

          <div class="mainpage-columns" style={{height: '400px'}}>
            <h2>Stats</h2>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
