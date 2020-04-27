import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";
import { ready, axiosCityImg } from "./pageLoad";
import { addToFavorites } from "./addFavoriteCity";
import { renderCurrentWeather } from "./currentWeather";

const favoriteList = document.querySelector(".js-slider-list");

function clickFavoriteCityName(e) {
  if (e.target.nodeName === "P") {
    const cityName = e.target.innerText;
    OpenGalleryImg.searchQuery = cityName;
    OpenWeather.query = cityName;
    ready();
    renderCurrentWeather();
    axiosCityImg();
    addToFavorites.classList.add("activ-bnt");
    addToFavorites.disabled = true;
  }
}

favoriteList.addEventListener("click", clickFavoriteCityName);
