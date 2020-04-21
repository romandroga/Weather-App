import "basiclightbox/dist/basicLightbox.min.css";
import * as basicLightbox from "basiclightbox";

const deleteSity = document.querySelector(".deleteBtn");

deleteSity.addEventListener("click", isOpenModalHandle);

function isOpenModalHandle(e) {
  e.preventDefault();
  const closeBtn = e.target;
  if (closeBtn.className === "deleteBtn") {
    const showModal = basicLightbox.create(`
    <form class="modal">
      <h2 class="modal__confirm">Are you sure you want to remove this city from your favorites?</h2>
      <div class="modal__confirm-btn">
        <button type="button" class="confirm-btn-yes">Yes</button>
        <button type="button" class="confirm-btn-no">No</button>
      </div>
     </form>
    `);
    showModal.show();
    const modalConfirmBtn = document.querySelector(".modal__confirm-btn");

    modalConfirmBtn.addEventListener("click", (e) => {
      console.log(e.target);
      if (
        e.target.className === "confirm-btn-yes" ||
        e.target.className === "confirm-btn-no"
      ) {
        showModal.close();
      }
    });
  }
}
