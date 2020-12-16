let modal = document.getElementById("footerModal");

function toggleModal() {
  if (modal.classList.contains("hideModal")) {
    modal.classList.remove("hideModal");
  } else {
    modal.classList.add("hideModal");
  }
}
