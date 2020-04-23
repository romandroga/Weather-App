import OpenGalleryImg from "../API/OpenGalleryImg";
import cityItemTempl from "../templates/cityItem.hbs";

export const addButton = document.querySelector("#js-btnAdd");
const listSities = document.querySelector(".js-slider-list");
export const btnNext = document.querySelector(".js-btnNext");

if (!listSities.children.length) {
  btnNext.style.visibility = "hidden";
}

addButton.addEventListener("click", handlerClickButton);

const cities = JSON.parse(localStorage.getItem("cities"));

cities.forEach((city) =>
  listSities.insertAdjacentHTML("beforeend", cityItemTempl(city)),
);

function handlerClickButton(e) {
  console.dir(e.target);
  if (OpenGalleryImg.searchQuery) {
    const city =
      OpenGalleryImg.searchQuery[0].toUpperCase() +
      OpenGalleryImg.searchQuery.slice(1);
    setLocalStorageCity(city);
    const markup = cityItemTempl(city);
    listSities.insertAdjacentHTML("beforeend", markup);
    addButton.classList.add("activ-bnt");
    addButton.disabled = true;
    addButton.classList.remove("inactiv-bnt");
    btnNext.style.visibility = "visible";
  }
}

function setLocalStorageCity(city) {
  const cities = JSON.parse(localStorage.getItem("cities"));
  console.log(cities);
  localStorage.setItem(
    "cities",
    JSON.stringify(!cities ? [city] : [...cities, city]),
  );
}

export function removeLocalStorageCity(city) {
  const cities = JSON.parse(localStorage.getItem("cities"));
  localStorage.setItem(
    "cities",
    JSON.stringify(cities.filter((value) => value !== city)),
  );
}
