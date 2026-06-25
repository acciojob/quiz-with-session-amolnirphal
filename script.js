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


document.body.innerHTML = `
<h1>Quiz</h1>

<div id="questions"></div>

<button id="submit">Submit</button>

<div id="score"></div>
`;


const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// Display questions
questions.forEach((q, index) => {

  const div = document.createElement("div");

  div.innerHTML = `
    <h3>${index + 1}. ${q.question}</h3>
    ${q.options.map(option => `
      <label>
        <input 
          type="radio" 
          name="question${index}" 
          value="${option}"
          ${progress[index] === option ? "checked" : ""}
        >
        ${option}
      </label>
      <br>
    `).join("")}
  `;

  questionsDiv.appendChild(div);
});


// Save selected answers in sessionStorage
document.querySelectorAll("input[type='radio']").forEach(input => {

  input.addEventListener("change", function() {

    const questionNumber = this.name.replace("question", "");

    progress[questionNumber] = this.value;

    sessionStorage.setItem(
      "progress",
      JSON.stringify(progress)
    );

  });

});


// Submit quiz
submitBtn.addEventListener("click", function() {

  let score = 0;

  questions.forEach((q, index) => {

    if (progress[index] === q.answer) {
      score++;
    }

  });


  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);

});