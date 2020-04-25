import { addMarkupToPage } from "./utilities";
import { forecast, modifyResponse } from "./forecast";

import OpenWeather from "../API/OpenWeather";
import getForecastMarkup from "../templates/forecast.hbs";

const forecastList = document.querySelector(".forecast__days");

function ready() {
  OpenWeather.fetchForecast()
    .then(forecast)
    .then(modifyResponse)
    .then((arr) => {
      const murkup = getForecastMarkup(arr.slice(1));

      addMarkupToPage(murkup, forecastList);
    })
    .catch(console.error);
}

document.addEventListener("DOMContentLoaded", ready);
