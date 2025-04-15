
const cardDisplay = document.getElementById("cardDisplay");
const predictionImg = document.getElementById("prediction");
const redBtn = document.getElementById("redBtn");
const blackBtn = document.getElementById("blackBtn");
const generateBtn = document.getElementById("generateBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resetBtn = document.getElementById("resetBtn");

let sequence = [];
const maxLength = 5;

if (localStorage.getItem("cardSequence")) {
  sequence = JSON.parse(localStorage.getItem("cardSequence"));
  renderCards();
}

function renderCards() {
  cardDisplay.innerHTML = "";
  sequence.forEach(color => {
    const img = document.createElement("img");
    img.src = color === "red" ? "images/red.png" : "images/black.png";
    cardDisplay.appendChild(img);
  });
}

function saveSequence() {
  localStorage.setItem("cardSequence", JSON.stringify(sequence));
}

function addCard(color) {
  if (sequence.length >= maxLength) return;
  sequence.push(color);
  renderCards();
  saveSequence();
}

function generatePrediction() {
  if (sequence.length < maxLength) return;
  const predictedColor = Math.random() > 0.5 ? "red" : "black";
  predictionImg.src = predictedColor === "red" ? "images/red.png" : "images/black.png";
  predictionImg.style.display = "block";
  predictionImg.dataset.prediction = predictedColor;
  yesBtn.style.display = "inline-block";
  noBtn.style.display = "inline-block";
}

function handleFeedback(correct) {
  const predicted = predictionImg.dataset.prediction;
  if (!predicted) return;
  sequence.push(correct ? predicted : (predicted === "red" ? "black" : "red"));
  if (sequence.length > maxLength) sequence.shift();
  renderCards();
  saveSequence();
  predictionImg.style.display = "none";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
}

function resetGame() {
  sequence = [];
  renderCards();
  saveSequence();
  predictionImg.style.display = "none";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
}

redBtn.onclick = () => addCard("red");
blackBtn.onclick = () => addCard("black");
generateBtn.onclick = generatePrediction;
yesBtn.onclick = () => handleFeedback(true);
noBtn.onclick = () => handleFeedback(false);
resetBtn.onclick = resetGame;
