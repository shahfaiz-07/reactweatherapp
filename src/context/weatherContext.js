import { createContext, useContext } from "react";

export const WeatherContext = createContext({
    today: {},
    tempToday: {},
    currentCity: "",
    fetchData: (city) => { },
    setTempToday: () => { },
    setCurrentCity: (city) => { }
    // changeData: (msg, time, id) => {}
});

export const WeatherContextProvider = WeatherContext.Provider;

export const useData = () => {
    return useContext(WeatherContext);
};