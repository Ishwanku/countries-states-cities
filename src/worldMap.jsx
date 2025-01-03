import React, { useState, useEffect } from 'react';

const CountriesDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          const data = await response.json();
          setStates(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };

      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          const data = await response.json();
          setCities(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setCities([]);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', marginTop: '10px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'baseline', 
        marginTop: '20px', 
        fontFamily: 'Arial' 
      }}>
        <label htmlFor="dropdown"><h1>Select Location</h1></label>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '10px' }}>
          <select style={{ padding: '10px' }} id="country-dropdown" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select a Country</option>
            {countries.map((countryName, index) => (
              <option key={index} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ padding: '10px' }}>
          <select style={{ padding: '10px' }} id="state-dropdown" value={selectedState} onChange={handleStateChange}>
            <option value="">Select a State</option>
            {states.map((stateName, index) => (
              <option key={index} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ padding: '10px' }}>
          <select style={{ padding: '10px' }} id="city-dropdown" value={selectedCity} onChange={handleCityChange}>
            <option value="">Select a City</option>
            {cities.map((cityName, index) => (
              <option key={index} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedCountry && selectedState && selectedCity && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          fontFamily: 'Arial' }}>
          <p style={{
          color: 'gray',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'baseline' }}>You selected <h2 style={{
          color: 'black',
          margin: '0 10px' }}>{selectedCity}, </h2>
          {`${selectedState}, ${selectedCountry}`} </p>
           </div> )}
    </div>
  );
};

export default CountriesDropdown;
