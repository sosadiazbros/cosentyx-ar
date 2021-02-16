(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*! unmute-ios-audio. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
module.exports = unmuteIosAudio

const USER_ACTIVATION_EVENTS = [
  'auxclick',
  'click',
  'contextmenu',
  'dblclick',
  'keydown',
  'keyup',
  'mousedown',
  'mouseup',
  'touchend'
]

function unmuteIosAudio () {
  const AudioContext = window.webkitAudioContext

  // To detect iOS, check for touch device and confirm Safari-only
  // webkitAudioContext is present.
  const isIos = navigator.maxTouchPoints > 0 && AudioContext != null

  if (!isIos) return

  // state can be 'blocked', 'pending', 'allowed'
  let htmlAudioState = 'blocked'
  let webAudioState = 'blocked'

  let audio
  let context
  let source

  const sampleRate = (new AudioContext()).sampleRate
  const silentAudioFile = createSilentAudioFile(sampleRate)

  USER_ACTIVATION_EVENTS.forEach(eventName => {
    window.addEventListener(
      eventName, handleUserActivation, { capture: true, passive: true }
    )
  })

  // Return a seven samples long 8 bit mono WAVE file
  function createSilentAudioFile (sampleRate) {
    const arrayBuffer = new ArrayBuffer(10)
    const dataView = new DataView(arrayBuffer)

    dataView.setUint32(0, sampleRate, true)
    dataView.setUint32(4, sampleRate, true)
    dataView.setUint16(8, 1, true)

    const missingCharacters =
      window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
        .slice(0, 13)

    return `data:audio/wav;base64,UklGRisAAABXQVZFZm10IBAAAAABAAEA${missingCharacters}AgAZGF0YQcAAACAgICAgICAAAA=`
  }

  function handleUserActivation (e) {
    if (htmlAudioState === 'blocked') {
      htmlAudioState = 'pending'
      createHtmlAudio()
    }
    if (webAudioState === 'blocked') {
      webAudioState = 'pending'
      createWebAudio()
    }
  }

  function createHtmlAudio () {
    audio = document.createElement('audio')

    audio.setAttribute('x-webkit-airplay', 'deny') // Disable the iOS control center media widget
    audio.preload = 'auto'
    audio.loop = true
    audio.src = silentAudioFile
    audio.load()

    audio.play().then(
      () => {
        htmlAudioState = 'allowed'
        maybeCleanup()
      },
      () => {
        htmlAudioState = 'blocked'

        audio.pause()
        audio.removeAttribute('src')
        audio.load()
        audio = null
      }
    )
  }

  function createWebAudio () {
    context = new AudioContext()

    source = context.createBufferSource()
    source.buffer = context.createBuffer(1, 1, 22050) // .045 msec of silence
    source.connect(context.destination)
    source.start()

    if (context.state === 'running') {
      webAudioState = 'allowed'
      maybeCleanup()
    } else {
      webAudioState = 'blocked'

      source.disconnect(context.destination)
      source = null

      context.close()
      context = null
    }
  }

  function maybeCleanup () {
    if (htmlAudioState !== 'allowed' || webAudioState !== 'allowed') return

    USER_ACTIVATION_EVENTS.forEach(eventName => {
      window.removeEventListener(
        eventName, handleUserActivation, { capture: true, passive: true }
      )
    })
  }
}

},{}],2:[function(require,module,exports){
const unmuteAudio = require("unmute-ios-audio");
var isOnMarker = false;

AFRAME.registerComponent("markerhandler", {
  init: function () {
    var model = document.querySelector("#model3D");

    this.el.sceneEl.addEventListener("markerFound", () => {
      isOnMarker = true;
      model.setAttribute("animation-mixer", { timeScale: 1 });
      var sonido = document.querySelector("#sound");
      sonido.components.sound.playSound();
      unmuteAudio();
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

function timeOutPrevModel() {
  if (!time) {
    setTimeout(function () {
      PrevModel();
      time = false;
    }, 500);
    time = true;
  }
}

function NextModel() {
  if (step > 6) {
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
  if (step < 2) {
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

function analyticsEvent(evento, tiempo) {
  gtag("event", "click", {
    event_category: "pagina",
    event_label: evento,
    value: tiempo,
  });
}

},{"unmute-ios-audio":1}]},{},[2]);
