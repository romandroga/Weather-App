import OpenGalleryImg from "../API/OpenGalleryImg";
import { addButton } from "./addFavoriteCity";

const refs = {
  body: document.querySelector("body"),
  inputForm: document.querySelector(".js-form"),
};

const cities = JSON.parse(localStorage.getItem("cities"));

function setBodyBackground(url) {
  refs.body.style.backgroundImage = `url(${url})`;
}

function axiosCity() {
  OpenGalleryImg.axiosCity().then((res) => {
    const randomCity = Math.floor(Math.random() * res.length);
    const cityPhoto = res[randomCity].largeImageURL;
    setBodyBackground(cityPhoto);
    console.dir(res);
  });
}

const handleInput = (e) => {
  e.preventDefault();
  const inputValue = refs.inputForm.elements.query.value;
  OpenGalleryImg.searchQuery = inputValue;
  axiosCity();
  refs.inputForm.reset();
  if (cities !== null) {
    if (!cities.includes(inputValue)) {
      addButton.classList.remove("activ-bnt");
      addButton.disabled = false;
    }
  }
};

refs.inputForm.addEventListener("submit", handleInput);
