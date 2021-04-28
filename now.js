// Challenge 1

function ageInDaysCalculator() {
  var age = prompt("What yeat werer you born....Good freind?");
  if (age == "" || age == null) {
    prompt("Please Enter your year of Birth!!");
  } else {
    var ageInDays = (2021 - age) * 365;
    var h1 = document.createElement("h1");
    var toPrint = document.createTextNode("You are " + ageInDays + "days old.");
    h1.setAttribute("id", "age");
    h1.appendChild(toPrint);
    document.querySelector("#result").appendChild(h1);
  }
}

function reset() {
  document.getElementById("result").textContent = "";
}

// Challenge 2

function genCat() {
  var image = document.createElement("img");
  image.setAttribute(
    "src",
    "https://media.tenor.com/images/eff22afc2220e9df92a7aa2f53948f9f/tenor.gif"
  );
  document.getElementById("insert_cat").appendChild(image);
}

// Challenge 3

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  var ids = ["rock", "paper", "scissor"];
  let choice = Math.floor(Math.random() * 3);
  botChoice = ids[choice];
  var winner = decideWinner(humanChoice, botChoice);
  message = getMessage(winner);
  rpsFrontend(humanChoice, botChoice, message);
}

function decideWinner(x, y) {
  if (x === y) {
    return [0.5, 0.5];
  } else {
    if (x == "rock") {
      if (y == "paper") {
        return [0, 1];
      } else {
        return [1, 0];
      }
    } else if (x == "paper") {
      if (y == "rock") {
        return [1, 0];
      } else {
        return [0, 1];
      }
    } else {
      if (y == "rock") {
        return [0, 1];
      } else {
        return [1, 0];
      }
    }
  }
}

function getMessage(msg) {
  if (msg[0] === 0) {
    return { message: "You lost!", color: "red" };
  } else if (msg[0] === 1) {
    return { message: "You won!", color: "green" };
  } else {
    return { message: "You tied!", color: "yellow" };
  }
}

function rpsFrontend(human, bot, getMessage) {
  var imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissor: document.getElementById("scissor").src,
  };
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissor").remove();

  var humandiv = document.createElement("div");
  var botdiv = document.createElement("div");
  var messagediv = document.createElement("div");

  humandiv.innerHTML =
    "<img src='" +
    imageDatabase[human] +
    "' height=150 width=150 style='box-shadow: 10px 10px 50px rgba(12, 12, 199, 0.699)'>";
  document.getElementById("imageBlock").appendChild(humandiv);

  messagediv.innerHTML =
    "<h1 style='color:" +
    getMessage["color"] +
    ";padding :30px'>" +
    getMessage["message"] +
    "</h1>";
  document.getElementById("imageBlock").appendChild(messagediv);

  botdiv.innerHTML =
    "<img src='" +
    imageDatabase[bot] +
    "' height=150, width=150 style='box-shadow: 10px 10px 50px red'>";
  document.getElementById("imageBlock").appendChild(botdiv);
}

// Challenge 4

var getAllButtons = document.getElementsByTagName("button");
var copyAllButtons = [];
for (let i = 0; i < getAllButtons.length; i++) {
  copyAllButtons.push(getAllButtons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonReset();
  } else if (buttonThingy.value === "random") {
    buttonRandom();
  }
}

function buttonsRed() {
  for (let i = 0; i < getAllButtons.length; i++) {
    getAllButtons[i].classList.remove(getAllButtons[i].classList[1]);
    getAllButtons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < getAllButtons.length; i++) {
    getAllButtons[i].classList.remove(getAllButtons[i].classList[1]);
    getAllButtons[i].classList.add("btn-success");
  }
}

function buttonRandom() {
  for (let i = 0; i < getAllButtons.length; i++) {
    let temp = Math.floor(Math.random() * 7);
    getAllButtons[i].classList.remove(getAllButtons[i].classList[1]);
    getAllButtons[i].classList.add(copyAllButtons[temp]);
  }
}

function buttonReset() {
  for (let i = 0; i < getAllButtons.length; i++) {
    getAllButtons[i].classList.remove(getAllButtons[i].classList[1]);
    getAllButtons[i].classList.add(copyAllButtons[i]);
  }
}

// Challenge 5
var playerbaskets = {
  you: { spanscore: "#yourScore", div: "#playerarea", score: 0 },
  dealer: { spanscore: "#dealerScore", div: "#dealerarea", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsValue: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  loss: 0,
  draw: 0,
};

function selectRandom() {
  let randomvar = Math.floor(Math.random() * 13);
  return playerbaskets["cards"][randomvar];
}

const PLAYER = playerbaskets["you"];
const DEALER = playerbaskets["dealer"];
const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const lossSound = new Audio("sounds/aww.mp3");

document.querySelector("#hitButton").addEventListener("click", hitClicked);
document.querySelector("#dealButton").addEventListener("click", dealClicked);
document.querySelector("#standButton").addEventListener("click", standClicked);

function hitClicked() {
  let card = selectRandom();
  showCard(card, PLAYER);
}

function showCard(temp, turn) {
  if (turn["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${temp}.png`;
    cardImage.setAttribute("style", "padding:10px; width:100px; height:140px");
    document.querySelector(turn["div"]).appendChild(cardImage);
    hitSound.play();
  }
  updateScore(temp, turn);
}

function dealClicked() {
  let winner = selectWinner();
  printMessage(winner);
  let yourImages = document
    .querySelector("#playerarea")
    .querySelectorAll("img");
  let dealerImages = document
    .querySelector("#dealerarea")
    .querySelectorAll("img");
  for (let i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }
  for (let i = 0; i < dealerImages.length; i++) {
    dealerImages[i].remove();
  }
  PLAYER["score"] = 0;
  DEALER["score"] = 0;
  document.querySelector(PLAYER["spanscore"]).textContent = 0;
  document.querySelector(PLAYER["spanscore"]).style.color = "white";
  document.querySelector(DEALER["spanscore"]).textContent = 0;
  document.querySelector(DEALER["spanscore"]).style.color = "white";
}

function updateScore(card, turn) {
  if (card === "A") {
    if (turn["score"] + 11 <= 21) {
      turn["score"] += playerbaskets["cardsValue"][card][1];
    } else {
      turn["score"] += playerbaskets["cardsValue"][card][0];
    }
  } else {
    turn["score"] += playerbaskets["cardsValue"][card];
  }
  document.querySelector(turn["spanscore"]).textContent = turn["score"];

  if (turn["score"] > 21) {
    document.querySelector(turn["spanscore"]).textContent = "BUST!";
    document.querySelector(turn["spanscore"]).style.color = "red";
  }
}

function standClicked() {
  let card = selectRandom();
  showCard(card, DEALER);
}

function selectWinner() {
  let winner;
  if (PLAYER["score"] <= 21) {
    if (PLAYER["score"] > DEALER["score"] || DEALER["score"] > 21) {
      winner = PLAYER;
      console.log("you won");
    } else if (DEALER["score"] > PLAYER["score"]) {
      winner = DEALER;
      console.log("you lost");
    } else if (DEALER["score"] === PLAYER["score"]) {
      console.log("draw1");
    }
  } else if (PLAYER["score"] > 21 && DEALER["score"] <= 21) {
    winner = DEALER;
    console.log("lost");
  } else if (PLAYER["score"] > 21 && DEALER["score"] > 21) {
    console.log("draw2");
  }
  return winner;
}

function printMessage(x) {
  if (x === DEALER) {
    document.querySelector("#resultfinal").textContent = "You Lost!";
    document.querySelector("#resultfinal").style.color = "red";
    lossSound.play();
    playerbaskets["loss"] += 1;
    document.querySelector("#loss").textContent = playerbaskets["loss"];
  } else if (x === PLAYER) {
    document.querySelector("#resultfinal").textContent = "You Won!";
    document.querySelector("#resultfinal").style.color = "green";
    playerbaskets["wins"] += 1;
    document.querySelector("#wins").textContent = playerbaskets["wins"];
    winSound.play();
  } else {
    document.querySelector("#resultfinal").textContent = "You Drew!";
    document.querySelector("#resultfinal").style.color = "yellow";
    playerbaskets["draw"] += 1;
    document.querySelector("#draw").textContent = playerbaskets["draw"];
    lossSound.play();
  }
}
