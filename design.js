 const questions = [
    {
        question: "What is the capital of France?",
        options: ["Rome","Berlin","Paris","Madrid"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java","C++","Python","Javascript"],
        answer: "Javascript"
    },
    {
        question: "Which planet is known as the red planet?",
        options: ["Earth","Mars","Jupiter","Saturn"],
        answer: "Mars"
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets","Code Style Syntax","Cool Styling System","Cascading Shifting Server"],
        answer: "Cascading Style Sheets"
    },
    {
        question:"Which HTML tag is used to create a link?",
        options:["<link>","<a>","<url>","<href>"],
        answer:"<a>"
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: ["Charles Dickens","Mark Twain","Jane Austen","Williams Shakespeare"],
        answer: "Williams Shakespeare"
    },
    {
        question:"How many minutes are in 2 hours?",
        options:["60","90","120","150"],
        answer:"120"
    },
    {
        question:"Which symbol is used for comments in javascript?",
        options:["//","##","<!-- -->","**"],
        answer:"//"
    },
    {
        question:"Which company developed the Android operating system?",
        options:["Apple","Google","Microsoft","Samsung"],
        answer:"Google"
    },
    {
        question:"What tag is used to display a picture in HTML?",
        options:["<img>","<picture>","<src>","<image>"],
        answer:"<img>"
    }
 ];

 let currentQuestion = 0;
 let score = 0;
 let timeLeft = 60;
 let timer;

 const questionNumber = 
 document.getElementById("progress");
 const questionText = 
 document.getElementById("question");
 const answersBox = 
 document.getElementById("answers");
 const feedback =
 document.getElementById("feedback");
 const timerDisplay =
 document.getElementById("timer");
 const resultBox =
 document.getElementById("result");
 const scoreDisplay =
 document.getElementById("score");
 const restartBtn =
 document.getElementById("restart");

 function loadQuestions() {
    clearInterval(timer);
    timeLeft = 60;
    startTimer();

    const q = 
    questions[currentQuestion];
    questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
    questionText.textContent =
    q.question;
    answersBox.innerHTML = "";
    feedback.textContent = "";

    q.options.forEach(option => {
        const btn = 
        document.createElement("button");
        btn.textContent = option;
        btn.onclick = () =>
            checkAnswer(btn, option);
        answersBox.appendChild(btn)
    });
 }

 function checkAnswer(button, selected) {
    clearInterval(timer);
    const correct = 
    questions[currentQuestion].answer;

    [...answersBox.children].forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add("correct");
        } else  if (btn.textContent === selected) {
            btn.classList.add("wrong");
        }
    });

    if (selected === correct) {
        feedback.textContent =
        "Correct!";
        score++;
    } else {
        feedback.textContent = "Wrong!";
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestions();
        } else {
            showResult();
        }
    }, 1500);
 }

 function startTimer() {
    timerDisplay.textContent = `Time Left: ${timeLeft}sec`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `TimeLeft: ${timeLeft}sec`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.textContent = "Time's Up!";
            checkAnswer({textContent: null }, null);
        }
    }, 1000);
 }

 function showResult() {
    
    document.getElementById("quiz-box").classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreDisplay.textContent = score;
 }

 restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hidden");

    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestions();
 };

 document.getElementById("theme").onclick = () => {
    document.body.classList.toggle("dark");
 };

 loadQuestions();