const score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  losses: 0,
  tie: 0,
};

updateGame();

let isAutoPlay = false;

function playauto() {
  if (!isAutoPlay) {
    setInterval(() => {
      const computermove = playGame();
      gameResult(computermove);
    }, 1500);
  }
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    gameResult("rock");
  } else if (event.key === "p") {
    gameResult("paper");
  } else if (event.key === "s") {
    gameResult("scissors");
  }
});

function gameResult(playerMove) {
  const computermove = playGame();

  let result = "";

  if (playerMove === "rock") {
    if (computermove === "rock") {
      result = "tie";
    } else if (computermove === "paper") {
      result = "you lost";
    } else if (computermove === "scissors") {
      result = "you win";
    }
  } else if (playerMove === "paper") {
    if (computermove === "rock") {
      result = "you win";
    } else if (computermove === "paper") {
      result = "tie";
    } else if (computermove === "scissors") {
      result = "you lost";
    }
  } else if (playerMove === "scissors") {
    if (computermove === "rock") {
      result = "you lost";
    } else if (computermove === "paper") {
      result = "you win";
    } else if (computermove === "scissors") {
      result = "tie";
    }
  }

  if (result === "you win") {
    score.win += 1;
  } else if (result === "you lost") {
    score.losses += 1;
  } else if (result === "tie") {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-picks").innerHTML = `
    you 
    <img class="pick" src="./rock-paper-scssisors-images/${playerMove}-emoji.png" />
     <img class="pick" src="./rock-paper-scssisors-images/${computermove}-emoji.png" />
     computer
    `;

  updateGame();
}

document.querySelector(".rock-button").addEventListener("click", () => {
  gameResult("rock");
});

document.querySelector(".paper-button").addEventListener("click", () => {
  gameResult("paper");
});

document.querySelector(".scissors-button").addEventListener("click", () => {
  gameResult("scissors");
});

function updateGame() {
  document.querySelector(
    ".ja-score"
  ).innerHTML = `wins:${score.win}, losses: ${score.losses}, tie: ${score.tie}`;
}

function playGame() {
  const randomnumber = Math.random();
  let computermove = "";

  if (randomnumber >= 0 && randomnumber < 1 / 3) {
    computermove = "rock";
  } else if (randomnumber >= 1 / 3 && randomnumber <= 2 / 3) {
    computermove = "paper";
  } else if (randomnumber >= 2 / 3 && randomnumber <= 1) {
    computermove = "scissors";
  }

  return computermove;
}
