let modal = document.getElementById("footerModal");
let modal2 = document.getElementById("footerModal2");

function toggleModal() {
  if (modal.classList.contains("hideModal")) {
    modal.classList.remove("hideModal");
  } else {
    modal.classList.add("hideModal");
  }
}

function toggleModal2() {
  if (modal2.classList.contains("hideModal")) {
    modal2.classList.remove("hideModal");
  } else {
    modal2.classList.add("hideModal");
  }
}
