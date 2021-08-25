"use strict";
let pegColor = "white";
let numberOfPegHoles = 3300;
const LIGHT_BRITE_STORAGE_KEY = "lightBrite08152021DEBX";

//Select audio files
const savPicAudio = document.querySelector("#savPicAudio");
const loadPicAudio = document.querySelector("#loadPicAudio");
const cancelAudio = document.querySelector("#cancelAudio");
const deleteAudio = document.querySelector("#deleteAudio");
const tabAudio = document.querySelector("#tabAudio");
const warning1Audio = document.querySelector("#warning1Audio");

// create elements object
const el = new Elements();
//The start of program exicution.
let colors = [
  "white",
  "black",
  "red",
  "green",
  "blue",
  "aqua",
  "blueviolet",
  "brown",
  "chartreuse",
  "darkblue",
  "Fuchsia",
  "gold",
];
window.onload = function () {
  startUp();
};
//Start Up
function startUp() {
  insertPegs();
  insertColors();
  selectAllColoredPegs();
  screen.orientation.lock("portrait");
}

const insertPegs = () => {
  for (let i = 0; i < numberOfPegHoles; i++) {
    let newPegHole = document.createElement("div");
    newPegHole.classList.add("pegHole");
    newPegHole.style.backgroundColor = "black";
    el.gameBoard.appendChild(newPegHole);
  }
};

const insertColors = () => {
  for (let color of colors) {
    let clickableColor = document.createElement("div");
    clickableColor.classList.add("colorPick");
    clickableColor.style.backgroundColor = color;
    el.colorPanel.appendChild(clickableColor);
  }
};

const selectAllColoredPegs = () => {
  const colors = document.querySelectorAll(".colorPick");
  for (let color of colors) {
    color.addEventListener("click", function () {
      pegColor = this.style.backgroundColor;
      el.colorPanel.style.backgroundColor = pegColor;
    });
  }
};
el.gameBoard.addEventListener("click", (e) => {
  const myBorderColor = "rgb(46, 45, 45)";
  if (e.target.classList.contains("pegHole")) {
    e.target.style.backgroundColor = pegColor;
    if (pegColor === "black") {
      e.target.style.border = `5px solid ${myBorderColor}`;
    } else {
      e.target.style.border = `5px solid ${pegColor}`;
    }
  }
});

el.colorPanel.addEventListener("click", (e) => {
  if (e.target.classList.contains("colorPick")) {
    tabAudio.play();
  }
});

el.reset.addEventListener("click", () => {
  tabAudio.play();
  el.gameBoard.innerHTML = "";
  insertPegs();
});

el.load.addEventListener("click", () => {
  tabAudio.play();
  const liteBriteStorage = new ArrayStorageLS(LIGHT_BRITE_STORAGE_KEY);
  const LS_Array = liteBriteStorage.getArrayFromLS();
  let html = "";
  LS_Array.forEach((element, index) => {
    html += `<li data-index="${index}"><button class="btn btn-primary loadPicture">${element.name}</button><i class="delete-picture fas fa-trash-alt"></i></li>`;
  });
  el.loadOrDeleteList.innerHTML = html;
  el.loadModal.classList.add("show-modal");
});

el.loadOrDeleteList.addEventListener("click", (e) => {
  if (e.target.classList.contains("loadPicture")) {
    let index = e.target.parentElement.dataset.index;
    index = +index;
    if (isNaN(index)) {
      return;
    }
    loadPicAudio.play();
    const liteBriteStorage = new ArrayStorageLS(LIGHT_BRITE_STORAGE_KEY);
    const LS_Array = liteBriteStorage.getArrayFromLS();
    if (LS_Array[index]) {
      const pic = LS_Array[index];
      el.gameBoard.innerHTML = "";
      const myBorderColor = "rgb(46, 45, 45)";
      for (let color of pic.colorArray) {
        // console.log(color);
        let newPegHole = document.createElement("div");
        newPegHole.classList.add("pegHole");
        newPegHole.style.backgroundColor = color;
        if (color === "black") {
          newPegHole.style.border = `5px solid ${myBorderColor}`;
        } else {
          newPegHole.style.border = `5px solid ${color}`;
        }
        el.gameBoard.appendChild(newPegHole);
      }
    }
    el.loadModal.classList.remove("show-modal");
    return;
  }

  if (e.target.classList.contains("delete-picture")) {
    let index = e.target.parentElement.dataset.index;
    index = +index;
    if (isNaN(index)) {
      return;
    }
    deleteAudio.play();
    const liteBriteStorage = new ArrayStorageLS(LIGHT_BRITE_STORAGE_KEY);
    const LS_Array = liteBriteStorage.getArrayFromLS();
    LS_Array.splice(index, 1);
    liteBriteStorage.saveArrayToLS(LS_Array);
    let html = "";
    LS_Array.forEach((element, index) => {
      html += `<li data-index="${index}"><button class="btn btn-primary loadPicture">${element.name}</button><i class="delete-picture fas fa-trash-alt"></i></li>`;
    });
    el.loadOrDeleteList.innerHTML = html;
    return;
  }
});

el.loadOrDeleteCancelBTN.addEventListener("click", () => {
  cancelAudio.play();
  el.loadModal.classList.remove("show-modal");
});
// Save Modal code **************************************
el.saveModalBTN.addEventListener("click", (e) => {
  e.preventDefault();
  const newPictureName = el.pictureText.value.trim();
  if (!newPictureName) {
    warning1Audio.play();
    return;
  }
  savPicAudio.play();
  const pegHoles = document.querySelectorAll(".pegHole");
  const newArray = [];
  for (let pegHole of pegHoles) {
    newArray.push(pegHole.style.backgroundColor);
  }

  const newPicture = new Picture(newPictureName, newArray);
  const liteBriteStorage = new ArrayStorageLS(LIGHT_BRITE_STORAGE_KEY);
  const LS_Array = liteBriteStorage.getArrayFromLS();
  LS_Array.push(newPicture);
  liteBriteStorage.saveArrayToLS(LS_Array);
  el.saveModal.classList.remove("show-modal");
});
el.saveModalCancelBTN.addEventListener("click", (e) => {
  e.preventDefault();
  cancelAudio.play();
  el.saveModal.classList.remove("show-modal");
});

el.save.addEventListener("click", () => {
  el.pictureText.value = "";
  tabAudio.play();
  el.saveModal.classList.add("show-modal");
  el.pictureText.focus();
});
