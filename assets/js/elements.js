class Elements {
  constructor() {
    this.mainContainer = document.querySelector("#mainContainer");
    this.colorPanel = document.querySelector("#colorPanel");
    this.gameBoard = document.querySelector("#gameBoard");
    this.reset = document.querySelector("#reset");
    this.save = document.querySelector("#save");
    this.load = document.querySelector("#load");
    this.loadOrDeleteList = document.querySelector("#loadOrDeleteList");
    this.loadOrDeleteCancelBTN = document.querySelector(
      "#loadOrDeleteCancelBTN"
    );
    this.loadModal = document.querySelector("#loadModal");
    this.saveModal = document.querySelector("#saveModal");
    this.saveModalBTN = document.querySelector("#saveModalBTN");
    this.saveModalCancelBTN = document.querySelector("#saveModalCancelBTN");
    this.pictureText = document.querySelector("#pictureText");
  }
}
