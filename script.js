let inputBox = document.querySelectorAll(".inputBox");
let restart = document.querySelector("#restart");
let newGame = document.getElementById("newGame");
let winStatus = document.querySelector("#showResult");
let messageContainer = document.querySelector(".message-container");

let count = 0;
let turnOfX = true;

let winningPlaces = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

inputBox.forEach((box) => {
  box.addEventListener("click", () => {
    box.style.backgroundColor = "white";
    if (box.innerText === "") {
      box.innerText = turnOfX ? "X" : "O";
      turnOfX = !turnOfX;
      box.disabled = true;
      count++;

      if (checkWinner()) {
        showWinner(box.innerText);
      } else if (count === 9) {
        declareDraw();
      }
    }
  });
});

function checkWinner() {
  for (let foundPattern of winningPlaces) {
    let pos1 = inputBox[foundPattern[0]].innerText;
    let pos2 = inputBox[foundPattern[1]].innerText;
    let pos3 = inputBox[foundPattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      return true;
    }
  }
  return false;
}

function showWinner(winner) {
  winStatus.innerText = `Congratulations! The Winner is ${winner}`;
  messageContainer.classList.remove("hide");
  disableBoxes();
}

function declareDraw() {
  winStatus.innerText = "It is a Draw Game!";
  messageContainer.classList.remove("hide");
  disableBoxes();
}

function disableBoxes() {
  inputBox.forEach((box) => {
    box.style.backgroundColor = "white";
    box.disabled = true;
  });
}

function enableBoxes() {
  inputBox.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

function resetGame() {
  turnOfX = true;
  count = 0;
  enableBoxes();
  messageContainer.classList.add("hide");
}

restart.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);
