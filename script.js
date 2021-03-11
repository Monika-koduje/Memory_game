const cardsImage = [
  "man",
  "man",
  "hacker",
  "hacker",
  "binary_code",
  "binary_code",
  "developer",
  "developer",
  "web_development",
  "web_development",
];

let memoryCards = document.querySelectorAll("div");
memoryCards = [...memoryCards];

const timerStart = new Date().getTime();

const timeCounter = "time_counter";
const timeSeconds = [];
let startTimeSeconds = 0;
let timer_seconds;

const time_seconds = document.getElementById(timeCounter);
const clickStartButton = document.querySelector(".start");

function clickStartBtn() {
  clickStartButton.classList.add("startBtn");
}

clickStartButton.addEventListener("click", clickStartBtn);

startTimeApp();

function startTimeApp() {
  currentTime();
}

function start() {
  if (timer_seconds) {
    return;
  }

  timer_seconds = setInterval(() => {
    const seconds = startTimeSeconds + 1;
    timer_second(seconds);
  }, 1000);
}

function timer_second(s) {
  if (s >= 3600) {
    startTimeSeconds = 0;
    startTimeSeconds++;
  } else {
    startTimeSeconds = s;
  }

  currentTime();
}

function currentTime() {
  time_seconds.innerText = startTimeSeconds;
}

let clickOneCard = "";
const clickTwoCards = [];

const memoryHits = memoryCards.length / 2;
let gameHits = 0;
let gameCounter = 0;

const click = function () {
  clickOneCard = this;

  if (clickOneCard == clickTwoCards[0]) return;

  clickOneCard.classList.remove("bgc_flipped_card");

  if (clickTwoCards.length === 0) {
    clickTwoCards[0] = clickOneCard;
    console.log("click 1");
    return;
  } else {
    memoryCards.forEach((image) => image.removeEventListener("click", click));
    clickTwoCards[1] = clickOneCard;
    console.log("click 2");

    gameCounter++;

    let pCounter = document.querySelector(".counter");
    pCounter.innerText = gameCounter;

    setTimeout(function () {
      if (clickTwoCards[0].className === clickTwoCards[1].className) {
        clickTwoCards.forEach((image) => image.classList.add("bgc_hits_cards"));

        gameHits++;

        let pWin_counter = document.querySelector(".win_counter");
        pWin_counter.innerText = gameHits;

        console.log("Win");
        memoryCards = memoryCards.filter(
          (image) => !image.classList.contains("bgc_hits_cards")
        );
        if (gameHits == memoryHits) {
          const timerStop = new Date().getTime();
          const gameOver = (timerStop - timerStart) / 1000;
          const timer = startTimeSeconds;
          setTimeout(function () {
            if (startTimeSeconds > 0) {
              alert(
                `Gra skończona - Gratulacje!!! - Wygrałeś - Czas gry: ${timer} s `
              );
            } else {
              alert(
                `Gra skończona - Gratulacje!!! - Wygrałeś - Czas gry: ${gameOver} s `
              );
            }
            console.log("Game over - Congratulations!!! - Winner");

            location.reload();
          }, 600);
        }
      } else {
        clickTwoCards.forEach((image) =>
          image.classList.add("bgc_flipped_card")
        );
        console.log("Defeat");
      }
      clickOneCard = "";
      clickTwoCards.length = 0;

      memoryCards.forEach((image) => image.addEventListener("click", click));
    }, 1000);
  }
};
const startHits = function () {
  memoryCards.forEach((image) => {
    const place = Math.floor(Math.random() * cardsImage.length);
    image.classList.add(cardsImage[place]);
    cardsImage.splice(place, 1);
  });

  setTimeout(function () {
    memoryCards.forEach((image) => {
      image.classList.add("bgc_flipped_card");
      image.addEventListener("click", click);
    });
  }, 300);
};

startHits();
