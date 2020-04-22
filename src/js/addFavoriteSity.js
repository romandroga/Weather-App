import OpenGalleryImg from "../API/OpenGalleryImg";
import sityItemTempl from "../templates/sityItem.hbs";

const addButton = document.querySelector("#js-btnAdd");
const listSities = document.querySelector(".js-slider-list");
const btnNext = document.querySelector(".js-btnNext");

if (!listSities.children.length) {
  btnNext.style.visibility = "hidden";
}

addButton.addEventListener("click", handlerClickButton);

function handlerClickButton(e) {
  if (OpenGalleryImg.searchQuery) {
    const sity =
      OpenGalleryImg.searchQuery[0].toUpperCase() +
      OpenGalleryImg.searchQuery.slice(1);
    const markup = sityItemTempl(sity);
    listSities.insertAdjacentHTML("beforeend", markup);
    addButton.classList.add("activ-bnt");
    addButton.classList.remove("inactiv-bnt");
    btnNext.style.visibility = "visible";
  }
}
