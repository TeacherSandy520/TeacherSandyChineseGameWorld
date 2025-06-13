
const words = ["開學", "回來", "老師", "同學", "校車", "上學", "高興", "新"];
let playerName = "";
let score = 0;
let countdownInterval;
let dropInterval;
let targetWord = "";

function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    if (!playerName) {
        alert("請輸入名字！");
        return;
    }
    document.getElementById("playerName").disabled = true;
    document.querySelector("button").style.display = "none";
    document.getElementById("countdown").classList.remove("hidden");

    let timer = 5;
    document.getElementById("timer").innerText = timer;
    countdownInterval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;
        if (timer <= 0) {
            clearInterval(countdownInterval);
            startFallingWords();
        }
    }, 1000);
}

function startFallingWords() {
    document.getElementById("countdown").classList.add("hidden");
    document.getElementById("question").classList.remove("hidden");
    document.getElementById("gameArea").classList.remove("hidden");

    score = 0;
    nextWord();

    dropInterval = setInterval(dropWordCard, 1000);

    setTimeout(endGame, 30000); // 遊戲時長30秒
}

function nextWord() {
    targetWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("targetWord").innerText = targetWord;
}

function dropWordCard() {
    const card = document.createElement("div");
    card.className = "word-card";
    const word = words[Math.floor(Math.random() * words.length)];
    card.innerText = word;

    card.style.left = `${Math.random() * 90}%`;
    let top = 0;
    card.style.top = top + "px";

    const gameArea = document.getElementById("gameArea");
    gameArea.appendChild(card);

    const fall = setInterval(() => {
        top += 5;
        card.style.top = top + "px";
        if (top > 280) {
            clearInterval(fall);
            gameArea.removeChild(card);
        }
    }, 50);

    card.onclick = () => {
        if (word === targetWord) {
            score++;
            gameArea.removeChild(card);
            nextWord();
        } else {
            card.style.background = "#ccc";
        }
    };
}

function endGame() {
    clearInterval(dropInterval);
    document.getElementById("question").classList.add("hidden");
    document.getElementById("gameArea").classList.add("hidden");
    const result = document.getElementById("result");
    result.innerHTML = `<h3>${playerName}，你得了 ${score} 分！</h3>`;
    result.classList.remove("hidden");

    // 儲存成績
    let history = JSON.parse(localStorage.getItem("scoreHistory") || "[]");
    history.push({ name: playerName, score: score });
    localStorage.setItem("scoreHistory", JSON.stringify(history));
}
