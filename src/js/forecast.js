import moment from "moment";

import OpenWeather from "../API/OpenWeather";
import getForecastMarkup from "../templates/forecast.hbs";
import getForecastInfoMarkup from "../templates/forecast.hbs";
import { addMarkupToPage } from "./utilities";

const forecastList = document.querySelector(".forecast__days");

const forecastFiveDays = ({ list }) => {
  return list.reduce((prev, cur, i, a) => {
    const isNewDay = cur.dt_txt.endsWith("00:00:00");

    return !isNewDay ? prev : prev.concat([a.slice(i, i + 8)]);
  }, []);
}; 

const modifiedForecastFiveDay = (arr) => {
  return arr.map((el) => {
    const dayForecast = {
      dayOfWeek: "",
      date: "",
      month: "",
      tempMin: [],
      tempMax: [],
      icon: "",
    };

    el.forEach((day) => {
      dayForecast.tempMin.push(day.main.temp_min);
      dayForecast.tempMax.push(day.main.temp_max);

      if (day.dt_txt.endsWith("15:00:00")) {
        const forecastDate = moment(day.dt_txt);
        const date = forecastDate.date();
        const dayOfWeek = forecastDate.format("dddd");
        const month = forecastDate.format("MMM");

        dayForecast.icon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        dayForecast.dayOfWeek = dayOfWeek;
        dayForecast.date = date;
        dayForecast.month = month;
      }
    });

    dayForecast.tempMin = Math.round(Math.min(...dayForecast.tempMin));
    dayForecast.tempMax = Math.round(Math.max(...dayForecast.tempMax));

    return dayForecast;
  });
};

function ready() {
  OpenWeather.fetchForecast()
    .then((cityWeather) => cityWeather)
    .then(forecastFiveDays)
    .then(modifiedForecastFiveDay)
    .then((arr) => {
      const murkup = getForecastMarkup(arr);

      addMarkupToPage(murkup, forecastList);
    })
    .catch(console.error);
}

document.addEventListener("DOMContentLoaded", ready);
