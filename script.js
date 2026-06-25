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


const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");


let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


// Display Questions
questions.forEach((q, index) => {

  let div = document.createElement("div");

  div.innerHTML = `
    <p>${q.question}</p>
  `;


  q.choices.forEach(choice => {

    let checked = "";

    if(progress[index] === choice){
      checked = 'checked="true"';
    }


    div.innerHTML += `
      <input 
        type="radio"
        name="question${index}"
        value="${choice}"
        ${checked}
      >
      ${choice}
      <br>
    `;

  });


  questionsDiv.appendChild(div);

});



// Save progress
document.querySelectorAll("input[type='radio']").forEach(input => {

  input.addEventListener("click", function(){

    let index = this.name.replace("question","");

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


  scoreDiv.innerText =
    `Your score is ${score} out of 5.`;


  localStorage.setItem(
    "score",
    score
  );

});