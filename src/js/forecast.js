import moment from "moment";

import OpenWeather from "../API/OpenWeather";
import getForecastMarkup from "../templates/forecast.hbs";
import getForecastInfoMarkup from "../templates/forecast.hbs";
import { addMarkupToPage } from "./utilities";

const forecastList = document.querySelector(".forecast__days");

const forecastFiveDays = ({ list }) => {
  const allDates = list.map((el) => getDayNumber(el.dt));

  const uniqueDates = allDates.filter((el, i) => allDates.indexOf(el) === i);

  return uniqueDates.map((day) =>
    list.filter((el) => getDayNumber(el.dt) === day),
  );
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

// function formatResponse(array) {
//   const newArrayTotal = [];
//   array.forEach((element) => {
//     const newObj = {
//       currentDate: new Date(element[0].dt_txt),
//       other: element.map((el) => {
//         const forecastObj = {
//           date: el.dt_txt,
//           ...el,
//         };
//         return forecastObj;
//       }),
//     };
//     newArrayTotal.push(newObj);
//   });
//   return newArrayTotal;
// }

function getDayNumber(element) {
  return new Date(element * 1000).getDate();
}

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
