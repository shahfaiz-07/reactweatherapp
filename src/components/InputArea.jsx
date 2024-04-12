import React, { useState } from 'react'
import { useData } from '../context/weatherContext'

const InputArea = () => {
    const { fetchData, currentCity, setCurrentCity } = useData()
    const [city, setCity] = useState(currentCity);
  return (
      <div className="p-3 flex flex-col w-full">
          <label htmlFor="city">
              Your City
              <input
                  type="text"
                  id="city"
                  className="px-2 py-1 w-full text-sm border rounded-md"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
              />
          </label>
          <button
              className="bg-blue-600 text-white py-1 w-full mt-2 rounded hover:bg-blue-800"
              onClick={() => {
                  if (city) {
                    return  fetchData(city)
                  } else {
                      return
                  }
              }}
          >
              Get Weather
          </button>
      </div>
  );
}

export default InputArea