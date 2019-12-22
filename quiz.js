// select all elements
const quiz1 = document.getElementById("quiz1");
const quiz2 = document.getElementById('quiz2');
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const cA = document.getElementById("A");
const cB = document.getElementById("B");
const cC = document.getElementById("C");
const cD = document.getElementById("D");
const counter1 = document.getElementById("counter1");
const timeG = document.getElementById("timeG");
const progress1 = document.getElementById("progress1");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "If two left handed people argue, which one is right?",
        cA : "The one on the right",
        cB : "The one on the left",
        cC : "The one on the gun",
        cD : "Tom",
        correct : "B"
    },{
        question : "What does Google use if it can't find an answer on Google?",
        cA : "Bing",
        cB : "Bang",
        cC : "Bong",
        cD : "Ask Jeeves",
        correct : "D"
    },{
        question : "What kind of pants do Mario and Luigi wear?",
        cA : "Dussault apparel slashed jeans",
        cB : "Tapered bell bottoms",
        cC : "Acid washed Guccis",
        cD : "Denim denim denim",
        correct : "D"
    }
  ];


let questions2 = [

    {
        question: "How many programmers does it take to change a lightbulb?",
        cA : "x = x + 1",
        cB : "undefined",
        cC : "NaN === NaN",
        cD : "None. It's a hardware problem",
        correct : "D"
    },{
        question : "What's the object oriented way to become wealthy?",
        cA : "Inheritance",
        cB : "Have some class",
        cC : "Super props",
        cD : "Wealth is subjective",
        correct : "A"
    },{
        question : "What should you do when a bug is sad?",
        cA : "Help it out of a bind",
        cB : "Console it",
        cC : "Express your feelings",
        cD : "Be more responsive",
        correct : "B"
        }
    ];


const lastQuestion1 = questions.length - 1;
const lastQuestion2 = questions2.length - 1;

let runQuestion = 0;
let count = 0;
const questionTime = 2; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;



function renderQ()  {
    let q = questions[runQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    cA.innerHTML = q.cA;
    cB.innerHTML = q.cB;
    cC.innerHTML = q.cC;
    cD.innerHTML = q.cD;
}

function renderQ1()  {
    let q2 = questions2[runQuestion];

    question.innerHTML = "<p>"+ q2.question +"</p>";
    cA.innerHTML = q2.cA;
    cB.innerHTML = q2.cB;
    cC.innerHTML = q2.cC;
    cD.innerHTML = q2.cD;
}


quiz1.addEventListener("click",startQuiz1);
quiz2.addEventListener("click",startQuiz2);




function startQuiz1(){
    quiz1.style.display = "none";
    quiz2.style.display = "none";
    renderQ();
    quiz.style.display = "block";
    renderP();
    renderC();
    TIMER = setInterval(renderC,1100); // 1000ms = 1s
}

function startQuiz2(){
    quiz1.style.display = "none";
    quiz2.style.display = "none";
    renderQ1();
    quiz.style.display = "block";
    renderP();
    renderC();
    TIMER = setInterval(renderC,1100); // 1000ms = 1s
}



function renderP(){
    for(let qIndex = 0; qIndex <= lastQuestion1; qIndex++){
        progress1.innerHTML += "<div class='progg' id="+ qIndex +"></div>";
    }
}






function renderC(){
    if(count <= questionTime){
        counter1.innerHTML = count;
        timeG.style.width = count * gaugeUnit + "px";
        count++;
    }else{
        count = 0;
        answerWrong();
        if(runQuestion < lastQuestion1){
            runQuestion++;
            renderQ();
        }else{
            clearInterval(TIMER);
            scoreR();
        }
    }
}




function checkAnswer(answer){
    if( answer == questions[runQuestion].correct){
        score++;
        answerCorrect();
    }else{
        answerWrong();
    }
    count = 0;
    if(runQuestion < lastQuestion1){
        runQuestion++;
        renderQ();
    }else{
        clearInterval(TIMER);
        scoreR();
    }
}



function answerCorrect(){
    document.getElementById(runQuestion).style.backgroundColor = "#2E8B57";
}

function answerWrong(){
    document.getElementById(runQuestion).style.backgroundColor = "#FF0000";
}

function scoreR(){
    scoreDiv.style.display = "block";

    const scorePCent = Math.round(100 * score/questions.length);

    let a = (scorePCent >= 50) ? "pass" :
              (scorePCent <= 49) ? "fail" :
              "fail";

    scoreDiv.innerHTML = "<p>"+ a + " " + scorePCent  +  "%" + "</p>";


}
