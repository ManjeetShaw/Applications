const choices = ["STONE", "PAPER", "SCISSORS"];
const icons = {
  STONE: "🪨",
  PAPER: "📄",
  SCISSORS: "✂️"
};

let playerScore = 0;
let computerScore = 0;

const statusText = document.querySelector(".status");
const playerHand = document.querySelector(".player");
const computerHand = document.querySelector(".computer");
const playerScoreEl = document.querySelector(".playerScore");
const computerScoreEl = document.querySelector(".computerScore");

document.querySelectorAll(".buttons button").forEach(button => {
  button.addEventListener("click", () => {

    const playerChoice = button.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    playerHand.textContent = icons[playerChoice];
    computerHand.textContent = icons[computerChoice];

    playerHand.style.transform = "scale(1.2)";
    computerHand.style.transform = "scale(1.2)";

    setTimeout(() => {
      playerHand.style.transform = "scale(1)";
      computerHand.style.transform = "scale(1)";
    }, 200);

    if (playerChoice === computerChoice) {
      statusText.textContent = "It's a Draw!";
    } 
    else if (
      (playerChoice === "STONE" && computerChoice === "SCISSORS") ||
      (playerChoice === "PAPER" && computerChoice === "STONE") ||
      (playerChoice === "SCISSORS" && computerChoice === "PAPER")
    ) {
      playerScore++;
      playerScoreEl.textContent = playerScore;
      statusText.textContent = "You Win!";
    } 
    else {
      computerScore++;
      computerScoreEl.textContent = computerScore;
      statusText.textContent = "Computer Wins!";
    }
  });
});