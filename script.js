// ===================
// DATA SOAL (15)
// ===================

const questions = [
    {q:"Sila pertama berbunyi?", a:["Ketuhanan Yang Maha Esa","Kemanusiaan","Persatuan","Keadilan"], c:0},
    {q:"Jumlah sila dalam Pancasila?", a:["3","4","5","6"], c:2},
    {q:"Lambang sila ke-3?", a:["Bintang","Rantai","Beringin","Banteng"], c:2},
    {q:"Contoh pengamalan sila ke-2?", a:["Menghargai sesama","Musyawarah","Ibadah","Pemilu"], c:0},
    {q:"Dasar negara Indonesia adalah?", a:["UUD 1945","Pancasila","Garuda","Proklamasi"], c:1},
    {q:"Sila ke-5 berbunyi?", a:["Keadilan sosial bagi seluruh rakyat Indonesia","Persatuan Indonesia","Ketuhanan YME","Kemanusiaan"], c:0},
    {q:"Pancasila disahkan pada tanggal?", a:["17 Agustus 1945","18 Agustus 1945","1 Juni 1945","20 Mei 1945"], c:1},
    {q:"Tokoh yang merumuskan Pancasila?", a:["Ir. Soekarno","R.A. Kartini","Sudirman","Ki Hajar Dewantara"], c:0},
    {q:"Nilai utama yang terkandung dalam Pancasila?", a:["Gotong royong","Individualisme","Kapitalisme","Liberalisme"], c:0},
    {q:"Sila ke-4 berbicara tentang?", a:["Kerakyatan","Keadilan","Persatuan","Ketuhanan"], c:0},
    {q:"Lambang sila pertama adalah?", a:["Bintang","Banteng","Rantai","Beringin"], c:0},
    {q:"Pancasila terdiri dari berapa sila?", a:["3 sila","4 sila","5 sila","6 sila"], c:2},
    {q:"Contoh pengamalan sila ke-3?", a:["Menjaga persatuan","Beribadah","Berlaku adil","Musyawarah"], c:0},
    {q:"Sila ke-2 berbunyi tentang?", a:["Kemanusiaan yang adil","Persatuan","Keadilan","Kerakyatan"], c:0},
    {q:"Lambang sila ke-5 adalah?", a:["Padi dan Kapas","Bintang","Banteng","Rantai"], c:0}
];

// ===================
// VARIABEL
// ===================

let positionX = 16;
let positionY = 16;
const step = 70;
let questionIndex = 0;
let timer = 0;
let score = 0;
let interval;
let answered = false;

const player       = document.getElementById("player");
const questionEl   = document.getElementById("question");
const answersEl    = document.getElementById("answers");
const timerEl      = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");
const quizNum      = document.getElementById("quizNum");
const statusBox    = document.getElementById("statusBox");
const scoreDisplay = document.getElementById("scoreDisplay");

// ===================
// TIMER
// ===================

interval = setInterval(() => {
    timer++;
    timerEl.textContent = timer;
}, 1000);

// ===================
// LOAD SOAL
// ===================

function loadQuestion() {
    if (questionIndex >= questions.length) {
        questionIndex = 0;
    }

    answered = false;
    const data = questions[questionIndex];

    // Update soal number & progress
    quizNum.textContent = `Soal ${questionIndex + 1} / ${questions.length}`;
    progressFill.style.width = ((questionIndex / questions.length) * 100) + '%';

    // Animate card refresh
    const card = document.querySelector('.quiz-card');
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = 'slideUp 0.35s ease';

    questionEl.textContent = data.q;
    answersEl.innerHTML = "";

    // Reset status box
    statusBox.className = "status-box";
    statusBox.innerHTML = "<span>🎯 Jawab dengan benar!</span>";

    data.a.forEach((text, i) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.onclick = () => checkAnswer(i, btn);
        answersEl.appendChild(btn);
    });
}

// ===================
// CEK JAWABAN
// ===================

function checkAnswer(choice, clickedBtn) {
    if (answered) return;
    answered = true;

    const data = questions[questionIndex];
    const correct = choice === data.c;
    const allBtns = answersEl.querySelectorAll("button");

    // Disable semua tombol
    allBtns.forEach(b => b.style.pointerEvents = "none");

    if (correct) {
        clickedBtn.classList.add("correct");
        clickedBtn.textContent = "✅ " + clickedBtn.textContent;
        score += 10;
        scoreDisplay.textContent = `⭐ ${score}`;
        statusBox.className = "status-box correct-status";
        statusBox.innerHTML = "✅ Jawaban Benar! +10";
        movePlayer();
    } else {
        clickedBtn.classList.add("wrong");
        clickedBtn.textContent = "❌ " + clickedBtn.textContent;
        // Highlight jawaban benar
        allBtns[data.c].classList.add("correct");
        statusBox.className = "status-box wrong-status";
        statusBox.innerHTML = "❌ Jawaban Salah!";
        moveBack();
    }

    // Tunggu sebentar lalu lanjut soal berikutnya
    setTimeout(() => {
        questionIndex++;
        loadQuestion();
    }, 1200);
}

// ===================
// GERAK PLAYER
// ===================

function getMazeWidth() {
    return document.querySelector('.maze').offsetWidth;
}

function getMazeHeight() {
    return document.querySelector('.maze').offsetHeight;
}

function movePlayer() {
    positionX += step;

    if (positionX > getMazeWidth() - 60) {
        positionX = 16;
        positionY += step;
    }
 
    player.style.left = positionX + "px";
    player.style.top  = positionY + "px";

    // Cek menang
    if (positionY >= getMazeHeight() - 80) {
        winGame();
    }
}

function moveBack() {
    positionX = Math.max(16, positionX - step);
    player.style.left = positionX + "px";
}

// ===================
// MENANG
// ===================

function winGame() {
    clearInterval(interval);

    let level = "";
    if (timer <= 60)        level = "🏆 Level Cepat — Luar Biasa!";
    else if (timer <= 120)  level = "⭐ Level Sedang — Bagus!";
    else                    level = "🎉 Level Pemula — Terus Semangat!";

    document.getElementById("resultText").innerHTML =
        `⏱️ Waktu: <strong>${timer} detik</strong><br>
         ⭐ Skor: <strong>${score} poin</strong><br>
         ${level}`;

    document.getElementById("winnerBox").classList.remove("hidden");
}

// ===================
// START
// ===================

loadQuestion();