var isOnMarker = false;

AFRAME.registerComponent("markerhandler", {
  init: function () {
    var model = document.querySelector("#model3D");

    this.el.sceneEl.addEventListener("markerFound", () => {
      isOnMarker = true;
      model.setAttribute("animation-mixer", { timeScale: 1 });
      var sonido = document.querySelector("#sound");
      sonido.components.sound.playSound();
      console.log("marcador encontrado...");
    });
    this.el.sceneEl.addEventListener("markerLost", () => {
      isOnMarker = false;
      model.setAttribute("animation-mixer", { timeScale: 0 });
      var sonido = document.querySelector("#sound");
      sonido.components.sound.stopSound();
      console.log("marcador perdido...");
    });
  },
});

let asset = document.querySelector("a-assets");
let loader = document.getElementById("loader");
asset.addEventListener("loaded", loadedHandler);

function loadedHandler() {
  loader.style.display = "none";
}

let model = document.querySelector("#model3D");
let sound = document.querySelector("#sound");
let title = document.getElementById("stepTitle");
let step = 1;

let time = false;
function timeOutNextModel() {
  if (!time) {
    setTimeout(function () {
      NextModel();
      time = false;
    }, 500);
    time = true;
  }
}

function timeOutPrevtModel() {
  if (!time) {
    setTimeout(function () {
      PrevModel();
      time = false;
    }, 1000);
    time = true;
  }
}

function NextModel() {
  if (step > 4) {
    window.location.replace("../pages/photo-page.html");
  } else {
    step++;
    model.removeAttribute("gltf-model");
    model.setAttribute("gltf-model", `#model${step}`);

    sound.components.sound.pauseSound();
    sound.removeAttribute("sound");
    sound.setAttribute("sound", `src: #audio${step}`);
    if (isOnMarker) {
      sound.components.sound.playSound();
    }

    title.innerHTML = `<h2>Paso ${step}</h2>`;

    analyticsEvent("Pagina1", 200);
  }
}

function PrevModel() {
  if (step < 2) {
    window.location.replace("../pages/welcome-page.html");
  } else {
    step--;
    model.removeAttribute("gltf-model");
    model.setAttribute("gltf-model", `#model${step}`);

    sound.components.sound.pauseSound();
    sound.removeAttribute("sound");
    sound.setAttribute("sound", `src: #audio${step}`);
    if (isOnMarker) {
      sound.components.sound.playSound();
    }

    title.innerHTML = `<h2>Paso ${step}</h2>`;

    analyticsEvent("Pagina1", 200);
  }
}

function analyticsEvent(evento, tiempo) {
  gtag("event", "click", {
    event_category: "pagina",
    event_label: evento,
    value: tiempo,
  });
}
