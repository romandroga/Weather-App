import cityItemTempl from "../templates/cityItem.hbs";

import OpenGalleryImg from "../API/OpenGalleryImg";
import OpenWeather from "../API/OpenWeather";
import { setLocalStorageCity } from "./utilities";
import { ready, axiosCityImg } from "./pageLoad";

export const addToFavorites = document.querySelector("#js-btnAdd");
export const btnNext = document.querySelector(".js-btnNext");
export const btnPrev = document.querySelector(".js-btnPrev");
const listSities = document.querySelector(".js-slider-list");

const cities = JSON.parse(localStorage.getItem("cities"));
if (cities !== null && cities.length !== 0) {
  cities.forEach((city) =>
    listSities.insertAdjacentHTML("beforeend", cityItemTempl(city)),
  );
  // Нужно придумать что будет при первой закгрузке, если пока нет избранных городов?!?!?!?!
  OpenWeather.querry = cities[0];
  OpenGalleryImg.searchQuery = cities[0];
  ready();
  OpenWeather.fetchForecast().then((forecast) => axiosCityImg());
  addToFavorites.classList.add("activ-bnt");
  addToFavorites.disabled = true;
} else {
  btnNext.style.visibility = "hidden";
  btnPrev.style.visibility = "hidden";
}

addToFavorites.addEventListener("click", handlerClickButton);

function handlerClickButton() {
  const city = OpenGalleryImg.searchQuery;
  if (city) {
    setLocalStorageCity(city);
    addToFavorites.classList.add("activ-bnt");
    addToFavorites.disabled = true;
    addToFavorites.classList.remove("inactiv-bnt");
    btnNext.style.visibility = "visible";
    btnPrev.style.visibility = "visible";
  }
}
