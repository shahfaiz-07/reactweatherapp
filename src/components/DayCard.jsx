import React, { useState } from "react";

const DayCard = ({ data }) => {
    let iconString = "ri-sun-line";
    switch (data.icon) {
        case "01d":
            iconString = "ri-sun-line";
            break;
        case "01n":
            iconString = "ri-moon-clear-line";
            break;
        case "02d":
            iconString = "ri-sun-cloudy-line";
            break;
        case "02n":
            iconString = "ri-moon-cloudy-line";
            break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
            iconString = "fa-solid fa-cloud";
            break;
        case "09d":
        case "09n":
            iconString = "fa-solid fa-cloud-showers-heavy";
            break;
        default:
            iconString = "fa-solid fa-cloud-showers-heavy";
    }
    return (
        <div>
            <div className={`bg-slate-100 px-8 py-5 font-mono rounded`}>
                <p
                    className={`text-sm text-gray-500 mb-2 font-semibold text-center`}
                >
                    {data.date.toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </p>
                <div className="flex justify-between gap-5 items-center py-4">
                    <i className={`${iconString} text-5xl`}></i>
                    <p className="font-semibold">
                        <span className="text-5xl">{data.temp}</span>
                        <span className="inline-block relative bottom-6">
                            <span className="font-bold text-xl">°</span>C
                        </span>
                    </p>
                </div>
                <div className="mt-3 text-center">
                    <div>
                        <h4
                            className={`text-xs font-semibold text-gray-500 mb-1`}
                        >
                            Weather
                        </h4>
                        <p className="font-semibold text-sm">
                            {data.weather}
                        </p>
                    </div>
                </div>
                <div className="mt-3 text-center flex justify-between">
                    <div>
                        <h4
                            className={`text-xs font-semibold text-gray-500 mb-1`}
                        >
                            Humidity
                        </h4>
                        <p className="font-semibold text-sm">
                            {data.humidity}%
                        </p>
                    </div>
                    <div>
                        <h4
                            className={`text-xs font-semibold text-gray-500 mb-1`}
                        >
                            Wind Speed
                        </h4>
                        <p className="font-semibold text-sm">
                            {data.windspeed} m/sec
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DayCard;
