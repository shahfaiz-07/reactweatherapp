import { InputArea, LeftCard, ChartArea, PressureArea, DayComponent } from "./components";
import { WeatherContextProvider } from "./context/weatherContext";
import { useEffect, useState } from "react";

function App() {
    const [currentCity, setCurrentCity] = useState("London");
    const [fetched, setFetched] = useState(false);
    const [apiData, setApiData] = useState({
        list: [
            {
                dt_txt: "",
            },
        ],
    });
    const [pressureToday, setPressureToday] = useState({
        text: `${currentCity}'s Pressure Every 3 Hours`,
        unit: "mb",
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        data: [1, 2, 3, 4, 5],
        graphFor: "Pressure",
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
    const calcTime = (unixTime, timezoneOffset) => {
        unixTime = Number(unixTime)
        timezoneOffset = Number(timezoneOffset)
        const time = new Date("en-IN");
        time.setTime((unixTime) * 1000);
        return `${time.toLocaleTimeString("en-IN", {hour: "2-digit", minute:"2-digit"})}`;
    }
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
        feels_like: "",
        pressure: "",
        cc: "IN"
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
                setApiData(result);
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
                    sunset: calcTime(result.city.sunset, result.city.timezone),
                    cc: result.city.country
                });
                setPressureToday((prev) => ({
                    ...prev,
                    text: `${currentCity}'s Pressure Every 3 Hours`,
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
                cc: result.city.country,
            });
            setApiData(result);
            setPressureToday((prev) => ({
                ...prev,
                text: `${currentCity}'s Pressure Every 3 Hours`,
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
            sunset: data.sunset,
            cc: data.cc,
        }));
        // console.log(apiData)
    }, [data, tempToday]);
    
    return (
        <>
            <WeatherContextProvider
                value={{
                    today,
                    tempToday,
                    apiData,
                    currentCity,
                    setApiData,
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
                </div>
                <p
                    className={`text-red-500 font-mono font-semibold ${
                        fetched ? "opacity-0" : "opacity-100"
                    } text-center`}
                >
                    **{message}**
                </p>
                <DayComponent />
            </WeatherContextProvider>
        </>
    );
}

export default App;
