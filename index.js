
const sampleData = [
    "Let's test your typing speed today. How fast can you really type?",
    "Digby is the littlest duckling you've ever seen",
    "He barked orders at his daughters but they just stared back with amusement",
    "He hatched from a tiny egg and did not grow as fast as his brothers or sisters",
    "The pet shop stocks everything you need to keep your anaconda happy",
    "You can't compare apples and oranges, but what about bananas and plantains?"
]

const sampleText = document.getElementById("sample-text");
const userText = document.getElementById("user-text");
const startBtn = document.getElementById("start");
const timer = document.getElementById("timer");
const resetBtn = document.getElementById("reset");
const  defaultTime = "00:00";
let timerInterval = null;
let minutes = 0;
let seconds = 0;
let initialIndx = 0;

sampleText.innerHTML = "Click on the START button to start the race against time...";

userText.addEventListener("keyup", compareText);
startBtn.addEventListener("click", generateRandomText);
resetBtn.addEventListener("click", resetTimer);

function compareText() {
    
    if(userText.value !== "" && userText.value !== sampleText.innerHTML) {
        if(!userText.classList.contains("error-text")) {
            userText.classList.add("error-text");
        }
    } else if (userText.value === sampleText.innerHTML) {
        userText.disabled = true;
        userText.classList.remove("error-text");
        userText.classList.add("success-text");
        clearInterval(timerInterval);
    }
}

function generateRandomText() {
    let randomInd = initialIndx;
    initialIndx += 1;
    if ( initialIndx == sampleData.length )
        initialIndx = 0;
    sampleText.innerHTML = sampleData[randomInd];
    sampleText.style.fontSize = "1.75rem";
    sampleText.style.color = "black";
    startBtn.disabled = true;

    timerInterval = setInterval(updateTime, 1000);
}

function updateTime() {
    let secStr = "";
    let minStr = "";
    seconds += 1;
    if (seconds == 60) {
        minutes += 1;
        seconds = 0;
    }

    if (seconds < 10) {
        secStr = "0" + seconds;
    } else {
        secStr = seconds;
    }

    if (minutes < 10) {
        minStr = "0" + minutes;
    } else {
        minStr = minutes;
    }

    timer.innerHTML = minStr + ":" + secStr;
}

function resetTimer() {
    clearInterval(timerInterval);
    timer.innerHTML = "00:00";
    sampleText.innerHTML = "Click on the START button to start the race against time...";
    userText.value = "";
    userText.classList.remove("error-text");
    userText.classList.remove("success-text");
    startBtn.disabled = false;
    sampleText.style.fontSize = "1.25rem";
    sampleText.style.color = "rgba(0, 0, 0, 0.5)";
}