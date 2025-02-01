var myColor = document.getElementById("targetColor");
var myOption = document.getElementById("options");
var feedback = document.getElementById("feedback");
var playButton = document.getElementById("playAgain");

let targetColor = ""; // Stores the target color that the user needs to guess
let colors = [];
let round = 1;

// Generate random RGB color
function generateRandomColor() { //https://www.sitepoint.com/generating-random-color-values/
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Setting the game
function setupGame() {
  feedback.textContent = `Round ${round}`;
  myOption.innerHTML = ""; 
  colors = []; // Resetting colors for new round

  // Generate  target color
  targetColor = generateRandomColor(); // https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
  myColor.style.backgroundColor = targetColor;

  // Generate options
  var numCards = 4 ; // Total 4 cards
  var myIndex = Math.floor(Math.random() * numCards);

  for (let i = 0; i < numCards; i++) {
    var color;
if (i === myIndex) {
    color = targetColor;
} else {
    color = generateRandomColor();
}
    colors.push(color);

    var card = document.createElement("div");
    card.classList.add("color-option"); // https://www.w3schools.com/jsref/prop_element_classlist.asp

    var front = document.createElement("div");
    front.classList.add("front");
    card.appendChild(front); // https://www.w3schools.com/jsref/met_node_appendchild.asp

    var back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundColor = color;
    card.appendChild(back);

    card.dataset.color = color;
    myOption.appendChild(card);
  }

  // Add event listeners to options
  document.querySelectorAll(".color-option").forEach((card) => {
    card.addEventListener("click", myClick);
  });
}

// Clicking card
function myClick(event) {
  var card = event.currentTarget;
  var selectedColor = card.dataset.color;

  // Flip the card
  card.classList.add("flipped");

  setTimeout(() => {
    if (selectedColor === targetColor) {
      feedback.textContent = "Correct! 🎉 Next round!"; // If guessed correct color
      feedback.style.color = "lime";
      round++;
      setupGame();
    } else {
      feedback.textContent = "Game Over! ❌ Try again."; // If guessed wrong color
      feedback.style.color = "red";
      noCards();
      playButton.style.display = "block";
    }
  }, 1000);
}

// Disable all cards
function noCards() {
  document.querySelectorAll(".color-option").forEach((card) => {
    card.removeEventListener("click", myClick);
  });
}

// Restart game
playButton.addEventListener("click", () => {
  round = 1;
  playButton.style.display = "none";
  setupGame();
});

// Start the game on load
setupGame();
