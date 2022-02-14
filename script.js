function fn() {
  var bella = document.getElementById("speechToText").value;
  return bella;
}

const getSelectedText = () => window.getSelection().toString();

function findString(text) {
  document.querySelector("#output").textContent = window.find(text);
}
// -----------------------------------------------
var txtInput = document.querySelector("#txtInput");
var voiceList = document.querySelector("#voiceList");
var btnSpeak = document.querySelector("#btnSpeak");
var synth = window.speechSynthesis;
var voices = [];

PopulateVoices();
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = PopulateVoices;
}

btnSpeak.addEventListener("click", () => {
  if (getSelectedText() === "") {
    var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
  } else {
    var toSpeak = new SpeechSynthesisUtterance(getSelectedText());
  }
  var selectedVoiceName =
    voiceList.selectedOptions[0].getAttribute("data-name");
  voices.forEach((voice) => {
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  synth.speak(toSpeak);
});

function PopulateVoices() {
  voices = synth.getVoices();
  var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
  voiceList.innerHTML = "";
  voices.forEach((voice) => {
    var listItem = document.createElement("option");
    listItem.textContent = voice.name;
    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    voiceList.appendChild(listItem);
  });

  voiceList.selectedIndex = selectedIndex;
}
// ------------------------------------------------------
function record() {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";

  recognition.onresult = function (event) {
    //   console.log(event);
    document.getElementById("speechToText").value =
      event.results[0][0].transcript;
  };
  recognition.start();
}
//   --------------------------------------------------
var navLinks = document.getElementsByID("navLinks");
function showMenu() {
  navLinks.style.right = "0";
}
function hideMenu() {
  navLinks.style.right = "-200px";
}
