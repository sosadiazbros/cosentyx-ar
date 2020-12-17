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

function NextModel() {
  let element = model.getAttribute("gltf-model");
  if (element === "../assets/models/CosentyxS5.gltf") {
    window.location.replace("../pages/photo-page.html");
  } else {
    step++;
    model.removeAttribute("gltf-model");
    model.setAttribute("gltf-model", `#model${step}`);

    sound.components.sound.stopSound();
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
  let element = model.getAttribute("gltf-model");
  if (element === "../assets/models/CosentyxS1.gltf") {
    window.location.replace("../pages/welcome-page.html");
  } else {
    step--;
    model.removeAttribute("gltf-model");
    model.setAttribute("gltf-model", `#model${step}`);

    sound.components.sound.stopSound();
    sound.removeAttribute("sound");
    sound.setAttribute("sound", `src: #audio${step}`);
    if (isOnMarker) {
      sound.components.sound.playSound();
    }

    title.innerHTML = `<h2>Paso ${step}</h2>`;

    analyticsEvent("Pagina1", 200);
  }
}

AFRAME.registerComponent("foo", {
  init: function () {
    this.el.addEventListener("model-loaded", (e) => {
      console.log(e);
      let model = this.el.getObject3D("mesh");
      model.traverse(function (node) {
        if (!node.material) return;

        var tmp = node.material;
        node.material = new THREE.MeshStandardMaterial({
          skinning: true,
          map: node.material.map,
        });
        node.material.needsUpdate = true;
        tmp.dispose();
      });
    });
  },
});

function analyticsEvent(evento, tiempo) {
  gtag("event", "click", {
    event_category: "pagina",
    event_label: evento,
    value: tiempo,
  });
}
