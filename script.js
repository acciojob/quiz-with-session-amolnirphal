const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web development?",
    choices: ["Python", "HTML", "Java", "C++"],
    answer: "HTML"
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Which is a JavaScript framework?",
    choices: ["React", "Django", "Laravel", "Spring"],
    answer: "React"
  }
];


const questionBox = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreBox = document.getElementById("score");


let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// Render questions
questions.forEach((q, index) => {

  const div = document.createElement("div");

  let html = `<p>${q.question}</p>`;

  q.choices.forEach(choice => {

    html += `
      <input 
        type="radio"
        name="question${index}"
        value="${choice}"
        ${progress[index] === choice ? 'checked="true"' : ""}
      >
      ${choice}
      <br>
    `;

  });


  div.innerHTML = html;

  questionBox.appendChild(div);

});


// Save selected options
document.querySelectorAll("input[type='radio']").forEach(input => {

  input.addEventListener("change", function(){

    const index = this.name.replace("question", "");

    progress[index] = this.value;

    sessionStorage.setItem(
      "progress",
      JSON.stringify(progress)
    );

  });

});


// Submit
submitBtn.addEventListener("click", function(){

  let score = 0;


  questions.forEach((q,index)=>{

    if(progress[index] === q.answer){
      score++;
    }

  });


  scoreBox.textContent = 
    `Your score is ${score} out of 5.`;


  localStorage.setItem(
    "score",
    score
  );

});