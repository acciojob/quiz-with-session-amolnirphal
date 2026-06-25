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

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// Create questions
questions.forEach((q, index) => {

  const div = document.createElement("div");

  div.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  q.options.forEach(option => {

    div.innerHTML += `
      <input 
        type="radio"
        name="q${index}"
        value="${option}"
        ${progress[index] === option ? "checked" : ""}
      >
      ${option}
      <br>
    `;

  });

  questionsDiv.appendChild(div);

});


// Save progress
document.querySelectorAll("input[type='radio']").forEach(input => {

  input.addEventListener("change", function(){

    let index = this.name.replace("q","");

    progress[index] = this.value;

    sessionStorage.setItem(
      "progress",
      JSON.stringify(progress)
    );

  });

});


// Calculate score
submitBtn.addEventListener("click", function(){

  let score = 0;

  questions.forEach((q,index)=>{

    if(progress[index] === q.answer){
      score++;
    }

  });


  scoreDiv.innerText = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);

});