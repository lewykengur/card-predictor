
const redCard = "images/red.png";
const blackCard = "images/black.png";
const blankCard = "images/blank.png";

let currentSequence = [];
let predictedCard = null;

function updateDisplay() {
    const slots = document.querySelectorAll(".card-slot");
    for (let i = 0; i < 5; i++) {
        if (currentSequence[i] === "red") {
            slots[i].src = redCard;
        } else if (currentSequence[i] === "black") {
            slots[i].src = blackCard;
        } else {
            slots[i].src = blankCard;
        }
    }
}

function addCard(color) {
    if (currentSequence.length < 5) {
        currentSequence.push(color);
        updateDisplay();
    }
}

function generatePrediction() {
    if (currentSequence.length < 5) {
        alert("Enter 5 cards first!");
        return;
    }

    const database = JSON.parse(localStorage.getItem("cardDB") || "[]");

    const match = database.find(entry => entry.sequence.slice(0, 5).join() === currentSequence.join());
    if (match) {
        predictedCard = match.sequence[5];
    } else {
        predictedCard = Math.random() < 0.5 ? "red" : "black";
    }

    document.getElementById("predictionText").innerText = "Predicted: " + predictedCard.toUpperCase();
}

function confirmPrediction(correct) {
    if (!predictedCard) return;

    const nextCard = correct ? predictedCard : (predictedCard === "red" ? "black" : "red");
    const fullSequence = [...currentSequence, nextCard];

    let database = JSON.parse(localStorage.getItem("cardDB") || "[]");
    database.push({ sequence: fullSequence });
    localStorage.setItem("cardDB", JSON.stringify(database));

    currentSequence.push(nextCard);
    currentSequence = currentSequence.slice(-5);
    updateDisplay();
    document.getElementById("predictionText").innerText = "";
    predictedCard = null;
}

function resetApp() {
    currentSequence = [];
    predictedCard = null;
    updateDisplay();
    document.getElementById("predictionText").innerText = "";
}

updateDisplay();
