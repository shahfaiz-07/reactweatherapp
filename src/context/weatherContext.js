import { createContext, useContext } from "react";

export const WeatherContext = createContext({
    today: {},
    tempToday: {},
    apiData: {},
    currentCity: "",
    setApiData: () => {},
    fetchData: (city) => { },
    setTempToday: () => { },
    setCurrentCity: (city) => { }
    // changeData: (msg, time, id) => {}
});

export const WeatherContextProvider = WeatherContext.Provider;

export const useData = () => {
    return useContext(WeatherContext);
};