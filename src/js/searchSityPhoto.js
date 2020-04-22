import OpenGalleryImg from "../API/OpenGalleryImg";

const refs = {
  body: document.querySelector("body"),
  inputForm: document.querySelector(".js-form"),
};

function setBodyBackground(url) {
  refs.body.style.backgroundImage = `url(${url})`;
}

function axiosSity() {
  OpenGalleryImg.axiosSity().then((res) => {
    const randomSity = Math.floor(Math.random() * res.length);
    const SityPhoto = res[randomSity].largeImageURL;
    setBodyBackground(SityPhoto);
  });
}

const handleInput = (e) => {
  e.preventDefault();
  const inputValue = refs.inputForm.elements.query.value;
  OpenGalleryImg.searchQuery = inputValue;
  axiosSity();
  refs.inputForm.reset()
};

refs.inputForm.addEventListener("submit", handleInput);
