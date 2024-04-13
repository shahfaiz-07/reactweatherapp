import React, { useState, useEffect } from "react";
import { useData } from "../context/weatherContext";
import DayCard from "./DayCard";
import PressureArea from './PressureArea';
const DayComponent = () => {
    const { apiData, currentCity } = useData();
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    };
    const date = new Date();
    const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    date2.setDate(date.getDate() + 1)
    const date3 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    date3.setDate(date.getDate() + 2);
    const date4 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    date4.setDate(date.getDate() + 3);
    const monthArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    const [month, setMonth] = useState(monthArr[date2.getMonth()])
    const [dateSelected, setDateSelected] = useState(date2);
    const [timeSelected, setTimeSelected] = useState(0);
    const [hourlyPressure, setHourlyPressure] = useState({
        text: `${currentCity}'s Pressure Every 3 Hours on ${dateSelected.getDate()}th ${month}`,
        unit: "mb",
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        data: [1, 2, 3, 4, 5],
        graphFor: "Pressure",
    });
    const [hourlyTemp, setHourlyTemp] = useState({
        text: `${currentCity}'s Temperature Every 3 Hours on ${dateSelected.getDate()}th ${month}`,
        unit: "°C",
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        data: [1, 2, 3, 4, 5],
        graphFor: "Temperature",
        color: "220, 20, 60",
    });
    const arr = [
        date2,
        date3,
        date4,
    ];
    const arr2 = [
        "12 AM",
        "3 AM",
        "6 AM",
        "9 AM",
        "12 PM",
        "3 PM",
        "6 PM",
        "9 PM",
    ];
    const [data, setData] = useState({
        icon: "",
        temp: "",
        weather: "",
        humidity: "",
        windspeed: "",
        feels_like: "",
        pressure: "",
        date: new Date(),
    });
    useEffect(() => {
        try {
            if(Object.keys(apiData).length > 1)
            for (let i = 0; i < 40; i++) {
                let val = apiData.list[i];
                let valDate = new Date(val.dt_txt);
                if (valDate.getDate() == dateSelected.getDate()) {
                    setHourlyPressure((prev) => ({
                        ...prev,
                        text: `${currentCity}'s Pressure Every 3 Hours on ${dateSelected.getDate()}th ${month}`,
                        labels: [
                            new Date(apiData.list[i].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 1].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 2].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 3].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 4].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 5].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 6].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 7].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                        ],
                        data: [
                            apiData.list[i].main.pressure,
                            apiData.list[i + 1].main.pressure,
                            apiData.list[i + 2].main.pressure,
                            apiData.list[i + 3].main.pressure,
                            apiData.list[i + 4].main.pressure,
                            apiData.list[i + 5].main.pressure,
                            apiData.list[i + 6].main.pressure,
                            apiData.list[i + 7].main.pressure,
                        ],
                    }));
                    setHourlyTemp((prev) => ({
                        ...prev,
                        text: `${currentCity}'s Temperature Every 3 Hours on ${dateSelected.getDate()}th ${month}`,
                        labels: [
                            new Date(apiData.list[i].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 1].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 2].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 3].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 4].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 5].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 6].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                            new Date(apiData.list[i + 7].dt_txt).toLocaleString(
                                "en-IN",
                                options
                            ),
                        ],
                        data: [
                            apiData.list[i].main.temp,
                            apiData.list[i + 1].main.temp,
                            apiData.list[i + 2].main.temp,
                            apiData.list[i + 3].main.temp,
                            apiData.list[i + 4].main.temp,
                            apiData.list[i + 5].main.temp,
                            apiData.list[i + 6].main.temp,
                            apiData.list[i + 7].main.temp,
                        ],
                    }));
                    break;
                }
            }
        } catch (err) {
            console.log(err)
        }

    }, [apiData, dateSelected, setDateSelected])
    useEffect(() => {
        try {
            apiData.list.forEach((value, index) => {
                const valDate = new Date(value.dt_txt);
                if (valDate.getDate() == dateSelected.getDate() && valDate.getHours() == timeSelected) {
                    setData((prev) => ({
                        ...prev,
                        icon: value.weather[0].icon,
                        temp: Math.round(value.main.temp),
                        weather: value.weather[0].main,
                        humidity: value.main.humidity,
                        windspeed: value.wind.speed,
                        date: valDate,
                        feels_like: value.main.feels_like,
                        pressure: value.main.pressure
                    }));
                }
            });
        } catch (err) {
            console.log(err);
        }
        setMonth(monthArr[dateSelected.getMonth()])
        console.log(dateSelected)
        console.log(arr)
    }, [dateSelected, timeSelected, setDateSelected, setTimeSelected, apiData,]);
    return (
        <div className="w-[95%] py-3 px-5 font-mono border-2 mx-auto mb-5">
            <h1 className="text-xl font-bold px-5">Forecast by Day :-</h1>
            <div className="w-full flex flex-wrap justify-center gap-3 md:gap-10 my-3">
                <label
                    htmlFor="date"
                    className="font-bold border-2 px-2 rounded"
                >
                    Select Date :
                    <select
                        name="date"
                        id="date"
                        className="px-2 ml-5 font-normal py-1 outline-none"
                        value={dateSelected}
                        onChange={(e) => {
                            if (e.target.value) {
                                return setDateSelected(new Date(e.target.value));
                            } else {
                                return;
                            }
                        }}
                    >
                        {arr.map((val, index) => (
                            <option value={val} key={index}>
                                {val.getDate() + " " + monthArr[val.getMonth()]}
                            </option>
                        ))}
                    </select>
                </label>
                <label
                    htmlFor="time"
                    className="font-bold border-2 px-2 rounded"
                >
                    Select Time :
                    <select
                        name="time"
                        id="time"
                        className="px-2 ml-5 font-normal py-1 outline-none"
                        value={timeSelected}
                        onChange={(e) => {
                            if (e.target.value) {
                                return setTimeSelected(e.target.value);
                            } else {
                                return;
                            }
                        }}
                    >
                        {arr2.map((val, index) => (
                            <option value={index * 3} key={index}>
                                {val}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <DayCard data={data} />
                <div className="mx-1 flex-grow flex-shrink-0 md:w-1/2 w-full md:mx-[5%]">
                    <PressureArea pressureToday={hourlyPressure} />
                    <PressureArea pressureToday={hourlyTemp} />
                </div>
            </div>
        </div>
    );
};

export default DayComponent;
