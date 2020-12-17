// first question

let q1a1 = document.getElementById("q1a1");
let q1a2 = document.getElementById("q1a2");
let q1a3 = document.getElementById("q1a3");

let q1a1img = document.getElementById("q1a1img");
let q1a2img = document.getElementById("q1a2img");
let q1a3img = document.getElementById("q1a3img");

q1a1.addEventListener("click", firstQuestionCheckers);
q1a2.addEventListener("click", firstQuestionCheckers);
q1a3.addEventListener("click", firstQuestionCheckers);

// second question

let q2a1 = document.getElementById("q2a1");
let q2a2 = document.getElementById("q2a2");

let q2a1img = document.getElementById("q2a1img");
let q2a2img = document.getElementById("q2a2img");

q2a1.addEventListener("click", secondQuestionCheckers);
q2a2.addEventListener("click", secondQuestionCheckers);

// third question

let q3a1 = document.getElementById("q3a1");
let q3a2 = document.getElementById("q3a2");

let q3a1img = document.getElementById("q3a1img");
let q3a2img = document.getElementById("q3a2img");

q3a1.addEventListener("click", thirdQuestionCheckers);
q3a2.addEventListener("click", thirdQuestionCheckers);

function firstQuestionCheckers() {
  if (q1a1.checked) {
    q1a1img.setAttribute(
      "src",
      "../assets/logos/form/cara triste seleccionada.png"
    );
  } else {
    q1a1img.setAttribute(
      "src",
      "../assets/logos/form/cara triste sin seleccion.png"
    );
  }

  if (q1a2.checked) {
    q1a2img.setAttribute(
      "src",
      "../assets/logos/form/cara seria seleccionada.png"
    );
  } else {
    q1a2img.setAttribute(
      "src",
      "../assets/logos/form/cara seria sin seleccion.png"
    );
  }

  if (q1a3.checked) {
    q1a3img.setAttribute(
      "src",
      "../assets/logos/form/cara feliz seleccionada.png"
    );
  } else {
    q1a3img.setAttribute(
      "src",
      "../assets/logos/form/cara feliz sin seleccion.png"
    );
  }
}

function secondQuestionCheckers() {
  if (q2a1.checked) {
    q2a1img.setAttribute(
      "src",
      "../assets/logos/form/icono positivo seleccionado.png"
    );
  } else {
    q2a1img.setAttribute(
      "src",
      "../assets/logos/form/icono positivo sin seleccion.png"
    );
  }

  if (q2a2.checked) {
    q2a2img.setAttribute(
      "src",
      "../assets/logos/form/icono negativo seleccionado.png"
    );
  } else {
    q2a2img.setAttribute(
      "src",
      "../assets/logos/form/icono negativo sin seleccion.png"
    );
  }
}

function thirdQuestionCheckers() {
  if (q3a1.checked) {
    q3a1img.setAttribute(
      "src",
      "../assets/logos/form/icono positivo seleccionado.png"
    );
  } else {
    q3a1img.setAttribute(
      "src",
      "../assets/logos/form/icono positivo sin seleccion.png"
    );
  }

  if (q3a2.checked) {
    q3a2img.setAttribute(
      "src",
      "../assets/logos/form/icono negativo seleccionado.png"
    );
  } else {
    q3a2img.setAttribute(
      "src",
      "../assets/logos/form/icono negativo sin seleccion.png"
    );
  }
}
