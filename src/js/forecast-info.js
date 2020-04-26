import moment from "moment";

const forecastList = document.querySelector(".forecast__days");
const forecastInfoList = document.querySelector(".forecast-info");

const modify = (arr) => {
  const clone = [...arr];
  return clone.map((el) => {
    return {
      time: moment(el.dt * 1000).format("LT"),
      temp: Math.round(el.main.temp),
      pressure: el.main.pressure,
      humidity: el.main.humidity,
      wind: Math.round(el.wind.speed),
      icon: `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`,
    };
  });
};

export { modify };
