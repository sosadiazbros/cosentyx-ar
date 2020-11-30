AFRAME.registerComponent("markerhandler", {
  init: function () {
    var model = document.querySelector("#model3D");

    this.el.sceneEl.addEventListener("markerFound", () => {
      model.setAttribute("animation-mixer", { timeScale: 1 });
      // var sonido = document.querySelector("#sonido");
      // sonido.components.sound.playSound();
      console.log("marcador encontrado...");
    });
    this.el.sceneEl.addEventListener("markerLost", () => {
      model.setAttribute("animation-mixer", { timeScale: 0 });
      // var sonido = document.querySelector("#sonido");
      // sonido.components.sound.pauseSound();
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

function changeModel() {
  let model = document.querySelector("#model3D");
  let element = model.getAttribute("gltf-model");

  element ==
  "https://arjs-cors-proxy.herokuapp.com/https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedCube/glTF/AnimatedCube.gltf"
    ? (window.location.href = "../pages/photo-page.html")
    : null;

  model.removeAttribute("gltf-model");
  model.setAttribute("gltf-model", "#model2");

  // var sonido = document.querySelector("#sonido");
  // sonido.removeAttribute("sound");
  // sonido.setAttribute("sound", "src: #snd_model2");
  // sonido.components.sound.playSound();

  analyticsEvent("Pagina1", 200);
}

function analyticsEvent(evento, tiempo) {
  gtag("event", "click", {
    event_category: "pagina",
    event_label: evento,
    value: tiempo,
  });
}
