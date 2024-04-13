import {useState} from 'react'
import { useData } from '../context/weatherContext';

const LeftCard = () => {
    const { today, currentCity } = useData();
    const getTime = () => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const currDate = new Date();
        let date = currDate.getDate();
        date = date < 10 ? `0${date}` : date;
        let day = currDate.getDay()
        let month = currDate.getMonth();
        let year = currDate.getFullYear();
        let time = currDate.toLocaleTimeString("en-IN", {hour:"2-digit", minute:"2-digit"});
        return `${time}, ${days[day]}, ${months[month]} ${date}, ${year}`;
    };
    let iconString = '';
    switch (today.icon) {
        case '01d':
            iconString = "ri-sun-line";
            break;
        case '01n':
            iconString = "ri-moon-clear-line";
            break;
        case '02d':
            iconString = "ri-sun-cloudy-line";
            break;
        case '02n':
            iconString = "ri-moon-cloudy-line";
            break;
        case '03d': case '03n':
        case '04d': case '04n':
            iconString = "fa-solid fa-cloud";
            break;
        case '09d': case '09n':
            iconString = "fa-solid fa-cloud-showers-heavy";
            break
        
    }
    // console.log(today)
    const [dateTime, setDateTime] = useState(getTime);
    // setInterval(()=>{ setDateTime(getTime) }, 1000)
  return (
      <div
          className={`bg-slate-100 md:bg-white whitespace-nowrap p-10 font-mono rounded`}
      >
          <p className="text-sm text-gray-500 font-semibold">{dateTime}</p>
          <p className="text-gray-600 text-sm text-center">
              (country : {today.cc})
          </p>
          <p className="leading-none text-center text-sm font-bold">
              {currentCity}'s Current Weather
          </p>
          <p className="text-gray-600 text-center text-sm">
              ({today.lat},{today.lon})
          </p>
          <div className="flex justify-around items-center py-2">
              <i className={`${iconString} text-5xl`}></i>
              <p className="font-semibold">
                  <span className="text-5xl">{Math.round(today.temp)}</span>
                  <span className="inline-block relative bottom-6">
                      <span className="font-bold text-xl">°</span>C
                  </span>
              </p>
          </div>
          <p className="text-center text-xl font-bold capitalize">
              {today.weather}
          </p>
          <div className="flex justify-around mt-2 text-center">
              <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      Feels Like
                  </h4>
                  <p className="font-semibold">{today.feels_like} °C</p>
              </div>
              <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      Pressure
                  </h4>
                  <p className="font-semibold">{today.pressure} mb</p>
              </div>
          </div>
          <div className="flex justify-around mt-2 text-center">
              <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      Sunrise
                  </h4>
                  <p className="font-semibold">{today.sunrise}</p>
              </div>
              <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      Sunset
                  </h4>
                  <p className="font-semibold">{today.sunset}</p>
              </div>
          </div>
          <div className="flex justify-around mt-2 text-center">
              <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      Humidity
                  </h4>
                  <p className="font-semibold">{today.humidity}%</p>
              </div>
              <div>
                  <h4 className="text-xs font-semibold text-gray-500 mb-1">
                      Wind Speed
                  </h4>
                  <p className="font-semibold">{today.windspeed} m/sec</p>
              </div>
          </div>
      </div>
  );
}

export default LeftCard