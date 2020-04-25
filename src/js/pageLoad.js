import { addMarkupToPage, setBodyBackground } from "./utilities";
import { forecast, modifyResponse } from "./forecast";

import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";
import getForecastMarkup from "../templates/forecast.hbs";

const forecastList = document.querySelector(".forecast__days");

export function ready() {
  OpenWeather.fetchForecast()
    .then(forecast)
    .then(modifyResponse)
    .then((arr) => {
      const murkup = getForecastMarkup(arr.slice(1));

      addMarkupToPage(murkup, forecastList);
    })
    .catch(console.error);
}

export function axiosCityImg() {
  OpenGalleryImg.axiosCityImg()
    .then((res) => {
      const randomCity = Math.floor(Math.random() * res.length);
      const cityPhoto = res[randomCity].largeImageURL;
      setBodyBackground(cityPhoto);
    })
    .catch(console.error);
}

document.addEventListener("DOMContentLoaded", ready);
