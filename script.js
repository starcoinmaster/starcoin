let coinCount = parseInt(localStorage.getItem('coinCount')) || 0; // Load from local storage
let isFarming = false; // Farming state
let countdownInterval; // Variable for countdown interval

const timeButton = document.getElementById("time-button");
const waterFill = document.getElementById("water-fill");
const coinCountDisplay = document.getElementById("coin-count");
const timeText = document.getElementById("time-text");

timeButton.addEventListener("click", function() {
    if (!isFarming && timeText.innerText === "Start Farming") {
        startFarming();
    } else if (timeText.innerText === "Claim Coins") {
        claimCoins();
    }
});

function startFarming() {
    isFarming = true;
    timeButton.classList.add("filled");
    timeText.innerText = "Farming will be ended: 00:30";
    timeButton.disabled = true;

    waterFill.style.height = "100%"; // Start with full height
    waterFill.style.transition = "height 30s linear"; // Full farming time

    let countdown = 30; // 30 seconds for farming
    countdownInterval = setInterval(() => {
        countdown--;
        timeText.innerText = `Farming will be ended: 00:${countdown < 10 ? "0" : ""}${countdown}`;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            drainWater(); // Call to drain water
            timeText.innerText = "Claim Coins";
            timeText.style.color = "#ffcc00";
            timeButton.disabled = false;
        }
    }, 1000);
}

function drainWater() {
    // Start draining water over 2 seconds
    waterFill.style.transition = "height 2s linear";
    waterFill.style.height = "0"; // Drain the water
}

function claimCoins() {
    if (timeText.innerText === "Claim Coins") {
        coinCount += 60; // Add 60 coins
        coinCountDisplay.innerText = coinCount; // Update coin display
        localStorage.setItem('coinCount', coinCount); // Save to local storage
        resetFarming();
    }
}

function resetFarming() {
    isFarming = false;
    timeButton.classList.remove("filled");
    timeText.innerText = "Start Farming";
    timeText.style.color = "#ffffff";
    timeButton.disabled = false;
}
