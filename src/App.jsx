import { InputArea, LeftCard, ChartArea, DayCard,PressureArea } from "./components";
// import './App.css'
import { WeatherContextProvider } from "./context/weatherContext";
import { useEffect, useState } from "react";

function App() {
    const [fetched, setFetched] = useState(false);
    const [pressureToday, setPressureToday] = useState({
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        data: [1, 2, 3, 4, 5],
    });
    const [message, setMessage] = useState("Note: This is a sample data, hit 'Get Weather Data' by entering a valid city name to get actual data")
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    };
    const [tempToday, setTempToday] = useState({
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        data: [1, 2, 3, 4, 5],
        data_min: [1,2,3,4,5],
        data_max: [1,2,3,4,5],
    });
    const [currentCity, setCurrentCity] = useState("Jamshedpur");
    const calcTime = (unixTime, timezoneOffset) => {
        unixTime = Number(unixTime)
        timezoneOffset = Number(timezoneOffset)
        const time = new Date("en-IN");
        time.setTime((unixTime) * 1000);
        return `${time.toLocaleTimeString("en-IN", {hour: "2-digit", minute:"2-digit"})}`;
    }
    const [arr, setArr] = useState([
        {
            temp: "30.12",
            humidity: "21",
            icon: "09n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
        {
            temp: "30.12",
            humidity: "21",
            icon: "01n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
        {
            temp: "30.12",
            humidity: "21",
            icon: "06n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
    ]);
    const [arr0, setArr0] = useState([
        {
            temp: "30.12",
            humidity: "21",
            icon: "09n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
        {
            temp: "30.12",
            humidity: "21",
            icon: "01n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
        {
            temp: "30.12",
            humidity: "21",
            icon: "06n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
    ]);
    const [arr1, setArr1] = useState([
        {
            temp: "30.12",
            humidity: "21",
            icon: "09n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
        {
            temp: "30.12",
            humidity: "21",
            icon: "01n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
        {
            temp: "30.12",
            humidity: "21",
            icon: "06n",
            date: new Date(),
            sunrise: "",
            sunset: "",
        },
    ]);
    const [today, setToday] = useState({
        temp: "",
    });
    const [data, setData] = useState({
        temp: "30.12",
        humidity: "21",
        weather: "broken clouds",
        windspeed: "0.33",
        icon: "04n",
        lat: "",
        lon: "",
        weather: "",
        windspeed: "",
        feels_like: "",
        pressure: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            const URL =
                "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=Jamshedpur&appid=8b20070ef19d79dbb4ce75a15b316b04";
            try {
                const response = await fetch("../api/data.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData({
                    temp: result.list[0].main.temp,
                    "feels_like": result.list[0].main["feels_like"],
                    pressure: result.list[0].main.pressure,
                    humidity: result.list[0].main.humidity,
                    weather: result.list[0].weather[0].main,
                    windspeed: result.list[0].wind.speed,
                    icon: result.list[0].weather[0].icon,
                    lat: result.city.coord.lat,
                    lon: result.city.coord.lon,
                    sunrise: calcTime(result.city.sunrise, result.city.timezone),
                    sunset: calcTime(result.city.sunset, result.city.timezone)
                });
                setPressureToday((prev) => ({
                    labels: [
                        new Date(result.list[0].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[1].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[2].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[3].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[4].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[5].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[6].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                    ],
                    data: [
                        result.list[0].main.pressure,
                        result.list[1].main.pressure,
                        result.list[2].main.pressure,
                        result.list[3].main.pressure,
                        result.list[4].main.pressure,
                        result.list[5].main.pressure,
                        result.list[6].main.pressure,
                    ],
                }));
                setTempToday((prev) => ({
                    labels: [
                        new Date(result.list[0].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[1].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[2].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[3].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[4].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[5].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                        new Date(result.list[6].dt_txt).toLocaleString(
                            "en-IN",
                            options
                        ),
                    ],
                    data: [
                        result.list[0].main.temp,
                        result.list[1].main.temp,
                        result.list[2].main.temp,
                        result.list[3].main.temp,
                        result.list[4].main.temp,
                        result.list[5].main.temp,
                        result.list[6].main.temp,
                    ],
                    data_max: [
                        result.list[0].main.temp_max,
                        result.list[1].main.temp_max,
                        result.list[2].main.temp_max,
                        result.list[3].main.temp_max,
                        result.list[4].main.temp_max,
                        result.list[5].main.temp_max,
                        result.list[6].main.temp_max,
                    ],
                    data_min: [
                        result.list[0].main.temp_min,
                        result.list[1].main.temp_min,
                        result.list[2].main.temp_min,
                        result.list[3].main.temp_min,
                        result.list[4].main.temp_min,
                        result.list[5].main.temp_min,
                        result.list[6].main.temp_min,
                    ],
                }));
                const currDate = new Date();
                result.list.forEach((val, index) => {
                    let gettingDate = new Date(val["dt_txt"]);
                    if (gettingDate.getHours() === 12) {
                        if (gettingDate.getDate() === 13)
                            setArr((prev) => {
                                prev[0] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                        else if (gettingDate.getDate() === 14)
                            setArr((prev) => {
                                prev[1] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                        else if (gettingDate.getDate() === 15)
                            setArr((prev) => {
                                prev[2] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                    }
                    if (gettingDate.getHours() === 6) {
                        if (gettingDate.getDate() === 13)
                            setArr0((prev) => {
                                prev[0] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                        else if (gettingDate.getDate() === 14)
                            setArr0((prev) => {
                                prev[1] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                        else if (gettingDate.getDate() === 15)
                            setArr0((prev) => {
                                prev[2] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                    }
                    if (gettingDate.getHours() === 18) {
                        if (gettingDate.getDate() === 13)
                            setArr1((prev) => {
                                prev[0] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                        else if (gettingDate.getDate() === 14)
                            setArr1((prev) => {
                                prev[1] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                        else if (gettingDate.getDate() === 15)
                            setArr1((prev) => {
                                prev[2] = {
                                    temp: Math.round(val.main.temp),
                                    humidity: val.main.humidity,
                                    icon: val.weather[0].icon,
                                    date: gettingDate,
                                    weather: val.weather[0].main,
                                    windspeed: val.wind.speed,
                                };
                                return prev;
                            });
                    }
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    const fetchData = async (city) => {
        const URL = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=8b20070ef19d79dbb4ce75a15b316b04`;
        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setCurrentCity(city)
            setData({
                temp: result.list[0].main.temp,
                feels_like: result.list[0].main.feels_like,
                pressure: result.list[0].main.pressure,
                humidity: result.list[0].main.humidity,
                weather: result.list[0].weather[0].main,
                windspeed: result.list[0].wind.speed,
                icon: result.list[0].weather[0].icon,
                lat: result.city.coord.lat,
                lon: result.city.coord.lon,
                sunrise: calcTime(result.city.sunrise, result.city.timezone),
                sunset: calcTime(result.city.sunset, result.city.timezone),
            });
            setPressureToday((prev) => ({
                labels: [
                    new Date(result.list[0].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[1].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[2].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[3].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[4].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[5].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[6].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                ],
                data: [
                    result.list[0].main.pressure,
                    result.list[1].main.pressure,
                    result.list[2].main.pressure,
                    result.list[3].main.pressure,
                    result.list[4].main.pressure,
                    result.list[5].main.pressure,
                    result.list[6].main.pressure,
                ],
            }));
            setTempToday((prev) => ({
                labels: [
                    new Date(result.list[0].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[1].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[2].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[3].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[4].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[5].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                    new Date(result.list[6].dt_txt).toLocaleString(
                        "en-IN",
                        options
                    ),
                ],
                data: [
                    result.list[0].main.temp,
                    result.list[1].main.temp,
                    result.list[2].main.temp,
                    result.list[3].main.temp,
                    result.list[4].main.temp,
                    result.list[5].main.temp,
                    result.list[6].main.temp,
                ],
                data_max: [
                    result.list[0].main.temp_max,
                    result.list[1].main.temp_max,
                    result.list[2].main.temp_max,
                    result.list[3].main.temp_max,
                    result.list[4].main.temp_max,
                    result.list[5].main.temp_max,
                    result.list[6].main.temp_max,
                ],
                data_min: [
                    result.list[0].main.temp_min,
                    result.list[1].main.temp_min,
                    result.list[2].main.temp_min,
                    result.list[3].main.temp_min,
                    result.list[4].main.temp_min,
                    result.list[5].main.temp_min,
                    result.list[6].main.temp_min,
                ],
            }));
            const currDate = new Date();
            result.list.forEach((val, index) => {
                let gettingDate = new Date(val["dt_txt"]);
                if (gettingDate.getHours() === 12) {
                    if (gettingDate.getDate() === currDate.getDate() + 1)
                        setArr((prev) => {
                            prev[0] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                    else if (gettingDate.getDate() === currDate.getDate() + 2)
                        setArr((prev) => {
                            prev[1] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                    else if (gettingDate.getDate() === currDate.getDate() + 3)
                        setArr((prev) => {
                            prev[2] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                }
                if (gettingDate.getHours() === 6) {
                    if (gettingDate.getDate() === 13)
                        setArr0((prev) => {
                            prev[0] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                    else if (gettingDate.getDate() === 14)
                        setArr0((prev) => {
                            prev[1] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                    else if (gettingDate.getDate() === 15)
                        setArr0((prev) => {
                            prev[2] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                }
                if (gettingDate.getHours() === 18) {
                    if (gettingDate.getDate() === 13)
                        setArr1((prev) => {
                            prev[0] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                    else if (gettingDate.getDate() === 14)
                        setArr1((prev) => {
                            prev[1] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                    else if (gettingDate.getDate() === 15)
                        setArr1((prev) => {
                            prev[2] = {
                                temp: Math.round(val.main.temp),
                                humidity: val.main.humidity,
                                icon: val.weather[0].icon,
                                date: gettingDate,
                                weather: val.weather[0].main,
                                windspeed: val.wind.speed,
                            };
                            return prev;
                        });
                }
            });
            setFetched(true)
        } catch (err) {
            setFetched(false)
            setMessage("Error : City not found")
        }
    };
    useEffect(() => {
        setToday((prev) => ({
            ...prev,
            temp: data.temp,
            humidity: data.humidity,
            weather: data.weather,
            feels_like: data.feels_like,
            pressure: data.pressure,
            windspeed: data.windspeed,
            icon: data.icon,
            lat: data.lat,
            lon: data.lon,
            sunrise: data.sunrise,
            sunset: data.sunset
        }));
    }, [data, tempToday]);
    
    return (
        <>
            <WeatherContextProvider
                value={{
                    today,
                    tempToday,
                    currentCity,
                    fetchData,
                    setTempToday,
                    setCurrentCity,
                }}
            >
                <div className="w-full min-h-[100vh] flex flex-col justify-center items-center font-mono md:px-5 py-10">
                    <p
                        className={`text-red-500 font-semibold ${
                            fetched ? "opacity-0" : "opacity-100"
                        } text-center`}
                    >
                        **{message}**
                    </p>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex flex-col items-center place-self-center">
                            <InputArea />
                            <LeftCard />
                        </div>
                        <div className="mx-1 flex-grow flex-shrink-0 md:w-8/12 max-w-full">
                            <ChartArea tempToday={tempToday} />
                            <PressureArea pressureToday={pressureToday} />
                        </div>
                    </div>
                    <h4 className="text-center md:text-left font-bold my-3">
                        Forecast by Day(at 6 am)
                    </h4>
                    <div className="w-full flex flex-wrap justify-center lg:gap-10 gap-5 md:px-10">
                        {arr0.map((val, index) => (
                            <div key={index}>
                                <DayCard data={val} />
                            </div>
                        ))}
                    </div>
                    <h4 className="text-center md:text-left font-bold my-3">
                        Forecast by Day(at 12 noon)
                    </h4>
                    <div className="w-full flex flex-wrap justify-center lg:gap-10 gap-5 md:px-10">
                        {arr.map((val, index) => (
                            <div key={index}>
                                <DayCard data={val} />
                            </div>
                        ))}
                    </div>
                    <h4 className="text-center md:text-left font-bold my-3">
                        Forecast by Day(at 6 pm)
                    </h4>
                    <div className="w-full flex flex-wrap justify-center lg:gap-10 gap-5 md:px-10">
                        {arr1.map((val, index) => (
                            <div key={index}>
                                <DayCard data={val} />
                            </div>
                        ))}
                    </div>
                </div>
            </WeatherContextProvider>
        </>
    );
}

export default App;
