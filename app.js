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
    "presentation",
    "presentation",
  ];
  
  const pokeCards = [];
  const totalPairs = 6;
  let usePokemon = false;
  
  let memoryCards = document.querySelectorAll(".cards div");
  memoryCards = [...memoryCards];
  
  const timerStart = new Date().getTime();
  let startTimeSeconds = 0;
  let timer_seconds;
  
  const time_seconds = document.getElementById("time_counter");
  const clickStartButton = document.querySelector(".start");
  
  function clickStartBtn() {
    clickStartButton.classList.add("startBtn");
    start();
  }
  
  clickStartButton.addEventListener("click", clickStartBtn);
  
  function start() {
    if (timer_seconds) {
      return;
    }
  
    timer_seconds = setInterval(() => {
      startTimeSeconds += 1;
      currentTime();
    }, 1000);
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
  
    if (clickOneCard === clickTwoCards[0]) return;
  
    clickOneCard.classList.remove("bgc_flipped_card");
    if (usePokemon) {
      clickOneCard.style.backgroundImage = clickOneCard.dataset.image;
    }
  
    if (clickTwoCards.length === 0) {
      clickTwoCards[0] = clickOneCard;
      return;
    } else {
      memoryCards.forEach((image) => image.removeEventListener("click", click));
      clickTwoCards[1] = clickOneCard;
      gameCounter++;
  
      let pCounter = document.querySelector(".counter");
      pCounter.innerText = gameCounter;
  
      setTimeout(() => {
        if (
          (usePokemon &&
            clickTwoCards[0].dataset.image === clickTwoCards[1].dataset.image) ||
          (!usePokemon && clickTwoCards[0].className === clickTwoCards[1].className)
        ) {
          clickTwoCards.forEach((image) => image.classList.add("bgc_hits_cards"));
  
          gameHits++;
  
          let pWin_counter = document.querySelector(".win_counter");
          pWin_counter.innerText = gameHits;
  
          memoryCards = memoryCards.filter(
            (image) => !image.classList.contains("bgc_hits_cards")
          );
          if (gameHits === memoryHits) {
            const timerStop = new Date().getTime();
            const gameOver = (timerStop - timerStart) / 1000;
            setTimeout(() => {
              alert(`Gra skończona - Gratulacje!!! - Zwycięstwo - Czas gry: ${gameOver} s`);
              location.reload();
            }, 600);
          }
        } else {
          clickTwoCards.forEach((image) => {
            image.classList.add("bgc_flipped_card");
            if (usePokemon) {
              image.style.backgroundImage = `url('./IMG/pokemon.png')`; 
            }
          });
        }
        clickOneCard = "";
        clickTwoCards.length = 0;
  
        memoryCards.forEach((image) => image.addEventListener("click", click));
      }, 1000);
    }
  };
  
  async function fetchPokemonImages() {
    pokeCards.length = 0; 
    for (let i = 0; i < totalPairs; i++) {
      const pokemonID = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
      const pokemonData = await response.json();
      const pokemonImageUrl = pokemonData.sprites.front_default;
      pokeCards.push(pokemonImageUrl, pokemonImageUrl);
    }
  }
  
  const startHits = function () {
    let cardsToUse = usePokemon ? pokeCards : [...cardsImage];
    cardsToUse = [...cardsToUse]; 
  
    memoryCards.forEach((image) => {
      const place = Math.floor(Math.random() * cardsToUse.length);
      if (usePokemon) {
        image.dataset.image = `url(${cardsToUse[place]})`;
        image.style.backgroundImage = `url('./IMG/pokemon.png')`; 
        image.style.backgroundSize = "cover";
        image.classList.remove("bgc_flipped_card");
      } else {
        image.classList.add(cardsToUse[place]);
      }
      cardsToUse.splice(place, 1);
    });
  
    setTimeout(() => {
      memoryCards.forEach((image) => {
        image.classList.add("bgc_flipped_card");
        image.addEventListener("click", click);
      });
    }, 300);
  };
  
  startHits();
  
  const changeImageButton = document.querySelector(".change-image");
  changeImageButton.addEventListener("click", async () => {
    usePokemon = !usePokemon;
    if (usePokemon && pokeCards.length === 0) {
      await fetchPokemonImages();
    }
    gameHits = 0;
    gameCounter = 0;
    clickOneCard = '';
    clickTwoCards.length = 0;
  
    memoryCards.forEach((card) => {
      card.classList.remove("bgc_flipped_card", "bgc_hits_cards");
      card.style.backgroundImage = '';
      card.className = ''; 
    });
  
    startHits();
  });
  