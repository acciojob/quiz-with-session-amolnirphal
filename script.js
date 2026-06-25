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

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreContainer = document.getElementById("score");

let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || [];

// Create quiz
questions.forEach((item, index) => {

  const questionDiv = document.createElement("div");

  questionDiv.innerHTML = `
    <p>${index + 1}. ${item.question}</p>
  `;

  item.options.forEach((option) => {

    const checked =
      savedProgress[index] === option ? "checked" : "";

    questionDiv.innerHTML += `
      <label>
        <input 
          type="radio"
          name="question${index}"
          value="${option}"
          ${checked}
        >
        ${option}
      </label>
      <br>
    `;
  });

  questionsContainer.appendChild(questionDiv);
});


// Save progress
document.querySelectorAll("input[type='radio']").forEach((radio) => {

  radio.addEventListener("change", function () {

    savedProgress[this.name.replace("question", "")] = this.value;

    sessionStorage.setItem(
      "progress",
      JSON.stringify(savedProgress)
    );

  });

});


// Submit quiz
submitButton.addEventListener("click", function () {

  let totalScore = 0;

  questions.forEach((question, index) => {

    if (savedProgress[index] === question.answer) {
      totalScore++;
    }

  });

  scoreContainer.innerText =
    `Your score is ${totalScore} out of 5.`;

  localStorage.setItem("score", totalScore);

});