
let sequence = [];
const maxSequence = 5;
const cardContainer = [
  document.getElementById("card1"),
  document.getElementById("card2"),
  document.getElementById("card3"),
  document.getElementById("card4"),
  document.getElementById("card5")
];

function updateDisplay() {
  for (let i = 0; i < maxSequence; i++) {
    if (sequence[i] === "red") {
      cardContainer[i].src = "red.jpg";
    } else if (sequence[i] === "black") {
      cardContainer[i].src = "black.jpg";
    } else {
      cardContainer[i].src = "";
    }
  }
}

function addCard(color) {
  if (sequence.length < maxSequence) {
    sequence.push(color);
    updateDisplay();
  }
}

function generateCard() {
  if (sequence.length < maxSequence) return alert("Enter 5 cards first.");
  const db = JSON.parse(localStorage.getItem("cardDB") || "[]");
  let nextCard = Math.random() < 0.5 ? "red" : "black";

  for (let i = db.length - 1; i >= 0; i--) {
    if (arraysMatch(db[i].slice(0, 5), sequence)) {
      nextCard = db[i][5];
      break;
    }
  }
  sequence.push(nextCard);
  sequence.shift();
  updateDisplay();
}

function confirmPrediction(correct) {
  if (sequence.length !== 5) return alert("Generate first!");
  const lastCard = sequence[sequence.length - 1];
  const newSeq = [...sequence];
  if (!correct) {
    newSeq[4] = lastCard === "red" ? "black" : "red";
  }
  const db = JSON.parse(localStorage.getItem("cardDB") || "[]");
  db.push(newSeq);
  localStorage.setItem("cardDB", JSON.stringify(db));
  sequence.push(newSeq[4]);
  sequence.shift();
  updateDisplay();
}

function resetSequence() {
  sequence = [];
  updateDisplay();
}

function arraysMatch(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i]);
}
