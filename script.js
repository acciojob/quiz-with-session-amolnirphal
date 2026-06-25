const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Everest", "Kilimanjaro", "Fuji"],
    answer: "Everest"
  },
  {
    question: "Which planet is known as Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which language is used for web development?",
    choices: ["Python", "Java", "HTML", "C++"],
    answer: "HTML"
  }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// Display questions
function loadQuiz() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {

    const div = document.createElement("div");

    div.innerHTML = `
      ${q.question}
      <br>
      ${q.choices.map(choice => `
        <label>
          <input 
            type="radio"
            name="question${index}"
            value="${choice}"
            ${progress[index] === choice ? "checked" : ""}
          >
          ${choice}
        </label>
        <br>
      `).join("")}
      <br>
    `;

    questionsDiv.appendChild(div);
  });


  document.querySelectorAll("input[type='radio']").forEach(input => {

    input.addEventListener("change", function(){

      const name = this.name;
      const index = name.replace("question","");

      progress[index] = this.value;

      sessionStorage.setItem(
        "progress",
        JSON.stringify(progress)
      );

    });

  });

}


// Submit quiz
submitBtn.addEventListener("click", function(){

  let score = 0;

  questions.forEach((q,index)=>{

    if(progress[index] === q.answer){
      score++;
    }

  });


  scoreDiv.innerText = 
    `Your score is ${score} out of 5.`;

  localStorage.setItem(
    "score",
    score
  );

});


// Load previous score after refresh
window.onload = function(){

  loadQuiz();

};