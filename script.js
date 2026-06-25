const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["React", "Django", "Laravel", "Spring"],
    answer: "React"
  }
];

// UI
document.body.innerHTML = `
<h1>Quiz</h1>
<div id="questions"></div>
<button id="submit">Submit</button>
<div id="score"></div>
`;

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress (MUST be object)
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuiz() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, i) => {
    const qDiv = document.createElement("div");

    qDiv.innerHTML = `
      <p>${i + 1}. ${q.question}</p>
      ${q.options
        .map(
          (opt) => `
        <label>
          <input type="radio" name="q${i}" value="${opt}"
          ${progress[i] === opt ? "checked" : ""}>
          ${opt}
        </label>
        <br>
      `
        )
        .join("")}
    `;

    questionsDiv.appendChild(qDiv);
  });
}

renderQuiz();

// Save progress correctly
questionsDiv.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const index = e.target.name.replace("q", "");
    progress[index] = e.target.value;

    sessionStorage.setItem("progress", JSON.stringify(progress));
  }
});

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    if (progress[i] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
});