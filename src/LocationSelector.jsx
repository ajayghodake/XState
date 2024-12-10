import React from "react";
import { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);
  const [selCountry, setSelCountry] = useState("");
  const [selState, setSelState] = useState("");
  const [selCity, setSelCity] = useState("");

  console.log(countries);

  console.log(cities);
  async function getCountries() {
    try {
      const res = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      setCountries([]);
      console.error("Failed to fetch Countries");
    }
  }

  async function getStates(selCountry) {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selCountry}/states`
      );
      const data = await res.json();
      setState(data);
    } catch (error) {
      setState([]);
      console.error("Failed to fetch State");
    }
  }

  async function getCities(selCountry, selState) {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`
      );
      const data = await res.json();
      setCity(data);
    } catch (error) {
      setCity([]);
      console.error("Failed to fetch City");
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selCountry) {
      getStates(selCountry);
    } else {
      setState([]);
    }
  }, [selCountry]);

  useEffect(() => {
    if (selCountry && selState) {
      getCities(selCountry, selState);
    } else{
      setCity([]);
    }
  }, [selCountry, selState]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Select Location</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px"}}>
        <select style={{padding: "10px"}}
          value={selCountry}
          onChange={(e) => {
            setSelCountry(e.target.value);
            setSelState("");
            setSelCity("");
            setState([]);
            setCity([]);
          }}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>

        <select style={{padding: "10px"}}
          value={selState}
          onChange={(e) => setSelState(e.target.value)}
          disabled={!selCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option value={state} key={state}>
              {state}
            </option>
          ))}
        </select>

        <select style={{padding: "10px"}}
          value={selCity}
          onChange={(e) => setSelCity(e.target.value)}
          disabled={!selCountry || !selState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selCity ? (
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "20px" }}>
        {/* <p style={{ margin: 0 }}>You selected</h3>
        <h2 style={{ margin: 0 }}>{selCity},</h2>
        <h3 style={{ margin: 0, opacity: "0.5" }}>
       
            {selState}, {selCountry}
          
        </h3> */}
        <h3>You selected <span>{selCity}</span>, {selState}, {selCountry}</p>
      </div>
      ) : (<></>)}
      
    </div>
  );
};

export default LocationSelector;
