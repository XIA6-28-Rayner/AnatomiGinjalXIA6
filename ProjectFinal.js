document.addEventListener("DOMContentLoaded", () => {

let index = 0;
const items = document.querySelectorAll(".slider-item");

function nextSlide() {
  items[index].classList.remove("active");
  index = (index + 1) % items.length;
  items[index].classList.add("active");
}

setInterval(nextSlide, 7000);

// ----- TEXT SLIDER -----
let tIndex = 0;
const tSlides = document.querySelectorAll(".text-slide");

function showTextSlide(n) {
  tSlides[tIndex].classList.remove("active");
  tIndex = (n + tSlides.length) % tSlides.length;
  tSlides[tIndex].classList.add("active");
}

document.getElementById("prevText").onclick = () => { showTextSlide(tIndex - 1); }
document.getElementById("nextText").onclick = () => { showTextSlide(tIndex + 1); }

// -------- SLIDER NEFRON --------
let nIndex = 0;
const nImg = document.querySelectorAll(".nephron-img");
const nText = document.querySelectorAll(".nephron-text");

function showNef(n) {
  nImg[nIndex].classList.remove("active");
  nText[nIndex].classList.remove("active");

  nIndex = (n + nImg.length) % nImg.length;

  nImg[nIndex].classList.add("active");
  nText[nIndex].classList.add("active");
}

document.getElementById("prevNef").onclick = () => showNef(nIndex - 1);
document.getElementById("nextNef").onclick = () => showNef(nIndex + 1);

const quizData = [
  { question: "Fungsi utama ginjal adalah...", options: ["Mencerna makanan", "Menyaring darah", "Mengatur suhu tubuh", "Membentuk sel darah merah"], answer: "Menyaring darah" },
  { question: "Unit fungsional terkecil dari ginjal adalah...", options: ["Ureter", "Nefron", "Uretra", "Pelvis renalis"], answer: "Nefron" },
  { question: "Proses penyaringan darah pada ginjal disebut...", options: ["Absorpsi", "Filtrasi", "Augmentasi", "Defekasi"], answer: "Filtrasi" }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("quiz-question");
const optionsEl = document.getElementById("quiz-options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("quiz-result");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const data = quizData[current];
  questionEl.textContent = data.question;

  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  data.options.forEach(opt => {
    const div = document.createElement("div");
    div.textContent = opt;
    div.classList.add("quiz-option");
    div.addEventListener("click", () => selectAnswer(div));
    optionsEl.appendChild(div);
  });
}

function selectAnswer(selected) {
  const data = quizData[current];

  document.querySelectorAll(".quiz-option").forEach(opt => {
    opt.style.pointerEvents = "none";
    if (opt.textContent === data.answer) opt.classList.add("correct");
  });

  if (selected.textContent !== data.answer) {
    selected.classList.add("wrong");
  } else {
    score++;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    quizBox.style.display = "none";
    resultBox.style.display = "block";
    scoreText.textContent = `Skor kamu: ${score} dari ${quizData.length}`;
  }
});

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  loadQuestion();
});

loadQuestion();

});
