AFRAME.registerComponent("markerhandler", {
  init: function () {
    var model = document.querySelector("#model3D");

    this.el.sceneEl.addEventListener("markerFound", () => {
      model.setAttribute("animation-mixer", { timeScale: 1 });
      var sonido = document.querySelector("#sound");
      sonido.components.sound.playSound();
      console.log("marcador encontrado...");
    });
    this.el.sceneEl.addEventListener("markerLost", () => {
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
let element = sound.getAttribute("sound");
let step = 1;

function NextModel() {
  step++;
  alert(element)
  element === "src: #audio5" &&
    window.location.replace("../pages/photo-page.html");

  model.removeAttribute("gltf-model");
  model.setAttribute("gltf-model", `#model${step}`);

  sound.components.sound.stopSound();
  sound.removeAttribute("sound");
  sound.setAttribute("sound", `src: #audio${step}`);
  sound.components.sound.playSound();

  title.innerHTML = `<h2>Paso ${step}</h2>`;

  analyticsEvent("Pagina1", 200);
}

function PrevModel(){
  step--;
  element === "src: #audio1" &&
    window.location.replace("../pages/welcome-page.html");

  model.removeAttribute("gltf-model");
  model.setAttribute("gltf-model", `#model${step}`);

  sound.components.sound.stopSound();
  sound.removeAttribute("sound");
  sound.setAttribute("sound", `src: #audio${step}`);
  sound.components.sound.playSound();

  title.innerHTML = `<h2>Paso ${step}</h2>`;

  analyticsEvent("Pagina1", 200);
}

function analyticsEvent(evento, tiempo) {
  gtag("event", "click", {
    event_category: "pagina",
    event_label: evento,
    value: tiempo,
  });
}
