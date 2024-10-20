//import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
//import { useEffect, useState } from 'react';

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

  //We use KW/H
  const [totalPower, setTotalPower] = useState(0);

  const [powerAddMult, setPowerAddMult] = useState(0); //Use this to differentiate between the power sources

  //THESE VALUES ARE PER DAY KW/H
  const [solarPowerNum, setSolarPowerNum] = useState(2); //Assume 6 hours a day
  const [windPowerNum, setWindPowerNum] = useState(21.5);
  const [hydroPowerNum, setHydroPowerNum] = useState(10958904);

  const [homeEnergyConsumption] = useState(100); //30 kwh per day is average
  const [amountOfHomes , setHomeAmount] = useState(100);

  const [items, setItems] = useState([]);
  const [powerBldgs, setBldgs] = useState([]);
  //items.push("Item x"); //USE THIS TO ADD HOUSES

  ///////COST//////// //In MILLION USD
  const [solarCost, setSolarCost] = useState(0.3); //300,000
  const [windCost, setWindCost] = useState(2.5); //2.5 M
  const [hydroCost, setHydroCost] = useState(1800); //1800 M
  const [totalCost, setTotalCost] = useState(0);

  ///////Space//////// //In ACRES
  const [solarSpace] = useState(0.0004); //300,000
  const [windSpace] = useState(17.5); //2.5 M
  const [hydroSpace] = useState(0.0151); //1800 M
  const [totalSpace, setTotalSpace] = useState(0);

  ///////POLLUTION//////// //None for green energy
  const [totalPollution, setTotalPollution] = useState(0);

  const powerClick = (powerType, numToAdd) =>
  {
    if(powerType === "Solar" && solarNum + numToAdd >= 0)
    {
      setCount(solarNum + numToAdd);
      setPowerAddMult(solarPowerNum);

      if(numToAdd === 1) setBldgs(prevItems => [...prevItems, solarPanel]);
      if(numToAdd === -1) {
        const deleteBldg = powerBldgs.lastIndexOf(solarPanel);
        powerBldgs.splice(deleteBldg,1);
        setBldgs([...powerBldgs]);
      }
      //For some strange reason, powerAddMult won't change the first time around, going to copy the function call instead with personalized values
      addUpPower(numToAdd * solarPowerNum); //-1 or 1 times the power being added
    }
    else if(powerType === "Wind" && windNum + numToAdd >= 0)
    {
      setWindCount(windNum + numToAdd);
      setPowerAddMult(windPowerNum);

      if(numToAdd === 1) setBldgs(prevItems => [...prevItems, windTurbine]);
      if(numToAdd === -1) {
        const deleteBldg = powerBldgs.lastIndexOf(windTurbine);
        powerBldgs.splice(deleteBldg,1);
        setBldgs([...powerBldgs]);
      }

      addUpPower(numToAdd * windPowerNum);
    }
    else if(powerType === "Hydro" && hydroNum + numToAdd >= 0)
    {
      setHydroCount(hydroNum + numToAdd);
      setPowerAddMult(hydroPowerNum);

      if(numToAdd === 1) setBldgs(prevItems => [...prevItems, hydroDam]);
      if(numToAdd === -1) {
        const deleteBldg = powerBldgs.lastIndexOf(hydroDam);
        powerBldgs.splice(deleteBldg,1);
        setBldgs([...powerBldgs]);
      }

      addUpPower(numToAdd * hydroPowerNum);
    }
  }

  function addUpPower(KWHNumber)
  {
    setTotalPower(totalPower + KWHNumber);
  }

  useEffect(() => {
    let roundedNum = totalPower / homeEnergyConsumption; //each home consumes 30 by default
    //if(roundedNum >= 1)
    {
      roundedNum = Math.floor(roundedNum);
      setHomeAmount(Math.floor(totalPower/30));
    }

    houseAutoAdd(roundedNum);
  }, [totalPower, homeEnergyConsumption, amountOfHomes]);

  function houseAutoAdd(roundedNum)
  {

    if(roundedNum < 15)
    {
      for (let i = 0; i < items.length; i++)
      {
        houseDelete()
      }

      for (let i = 0; i < roundedNum; i++)
      {
        houseAdd()
      }
    }
    else
    {
      for (let i = 0; i < items.length; i++)
      {
        houseDelete()
      }

      for (let i = 0; i < 14; i++)
      {
        houseAdd()
      }
    }

    if(amountOfHomes >= 1)
    {
      houseAdd();
    }

    setTotalCost(Math.round(((solarCost * solarNum) + (windCost * windNum) + (hydroCost * hydroNum)) * 1000)/ 1000)
    setTotalSpace(Math.round(((solarSpace * solarNum) + (windSpace * windNum) + (hydroSpace * hydroNum)) * 1000)/1000)
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

    <div className="App" style={{backgroundColor: "#ffecad"}}>
      <div class="web-header">
        <h1>Renewable Energy Visualizer</h1>
      </div>
      <div class="mainpage-columns-parent">


        <div class="mainpage-columns" style={{flex: '15%'}}>
        {/*-------------------------------------------- ENERGY SOURCES -------------------------------------------- */}
          <h2 class="section-headers">Energy Sources</h2>
          <div class="power-source-column">

            <button onClick={() => powerClick("Solar", 1)}>
              <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
            </button>
            <p style={{margin: '4px'}}>Solar Panel</p>

            <button onClick={() => powerClick("Wind", 1)}>
              <img src={windTurbine} alt="Wind Turbine" class="power-source-image"/>
            </button>
            <p style={{margin: '4px'}}>Wind Turbine</p>

            <button onClick={() => powerClick("Hydro", 1)}>
              <img src={hydroDam} alt="Hydro Dam" class="power-source-image"/>
            </button>
            <p style={{margin: '4px'}}>Hydro Electric</p>
            
          </div>

        </div>

        {/*-------------------------------------------- POWER GRID -------------------------------------------- */}
        <div class="mainpage-columns" style={{flex: '40%'}}>
          <h2 class="section-headers">Grid</h2>

          <div class="power-grid-counter">

            <button onClick={() => powerClick("Solar", -1)}>
              <img src={solarPanel} alt="Solar Panel" class="power-source-image"/>
            </button>
            <h3 class="source-amount-num">x{solarNum}</h3>

            <button onClick={() => powerClick("Wind", -1)}>
              <img src={windTurbine} alt="Wind Turbine" class="power-source-image"/>
            </button>
            <h3 class="source-amount-num">x{windNum}</h3>

            <button onClick={() => powerClick("Hydro", -1)}>
              <img src={hydroDam} alt="Hydro Dam" class="power-source-image"/>
            </button>
            <h3 class="source-amount-num">x{hydroNum}</h3>

          </div>

          <div className='power-grid'>
              {powerBldgs.map((item, index) => (
                <>
                <img key={index} src={item} alt="Building" class="power-source-image"/>
                </>
              ))}
          </div>

        </div>

        {/*-------------------------------------------- HOMES -------------------------------------------- */}
        <div style={{flex: '45%'}}>
          <div class="mainpage-columns" style={{height: '400px'}}>
            <h2 class="section-headers">Homes</h2>


            <ul>
              {items.map((item, index) => (
                <>
                <img key={index} src={house} alt="House" class="power-source-image"/>
                </>
              ))}
            </ul>

            <h2>Homes Powered: {amountOfHomes}</h2>

            {/* <button onClick={() => houseDelete()}> Remove House (Placeholder)</button>
            <button onClick={() => houseAdd()}> Add House (Placeholder)</button> */}



          </div>

        {/*-------------------------------------------- STATISTICS -------------------------------------------- */}
          <div class="stats-column" style={{height: '400px'}}>
            <h1 class="section-headers">Stats</h1>
            <h2>Power Output: {totalPower} kWh</h2>
            <div class="statistics">
              <h4>Cost: ${totalCost} Million</h4>
              <h4>Pollution: {totalPollution} Tons of CO2</h4>
              <h4>Space Required: {totalSpace} Acres</h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
