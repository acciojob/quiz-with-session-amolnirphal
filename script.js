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

const questionBox = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreBox = document.getElementById("score");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// Display questions
function displayQuestions() {

  questionBox.innerHTML = "";

  questions.forEach((q, index) => {

    let div = document.createElement("div");

    div.innerHTML = `
      <p>${index + 1}. ${q.question}</p>
    `;

    q.options.forEach((option) => {

      div.innerHTML += `
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
      `;

    });

    questionBox.appendChild(div);

  });

}


displayQuestions();


// Save selected answers
questionBox.addEventListener("change", function(e) {

  if(e.target.type === "radio") {

    let questionIndex = e.target.name.replace("question","");

    progress[questionIndex] = e.target.value;

    sessionStorage.setItem(
      "progress",
      JSON.stringify(progress)
    );

  }

});


// Submit quiz
submitBtn.addEventListener("click", function() {

  let score = 0;

  questions.forEach((q,index)=>{

    if(progress[index] === q.answer){
      score++;
    }

  });


  scoreBox.innerText = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);

});