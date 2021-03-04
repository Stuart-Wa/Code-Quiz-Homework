// variables for html elements
var quizMain = document.getElementById("quiz");
var hiscoreShownScore = document.getElementById("hiscoreShownScore");
var overDiv = document.getElementById("over");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var hiscoreDiv = document.getElementById("hiscoreDiv");
var startBtn = document.getElementById("startbtn");
var startDiv = document.getElementById("starterDiv");
var hiscoreIntl = document.getElementById("hiscoreIntl");
var endScoreEl = document.getElementById("endScore");
var hiscoreContainer = document.getElementById("hiscoreContainer");
var resultsEl = document.getElementById("results");
var hiscorePlayerName = document.getElementById("playerName");
var gameOverButton = document.getElementById("gameOverButton");
var submitBtn = document.getElementById("submit");


//html element variables for possible answers


var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// quiz questions
var quizQuestions = [{
    question: "What does HTML stand for?",
    optionA: "Hypertext Language Markup",
    optionB: "hyper tall letters",
    optionC: "The creator's initials",
    optionD: "all of the above",
    correctAnswer: "a"},
  {
    question: "What suffix do javascript files end in?",
    optionA: ".png",
    optionB: ".exe",
    optionC: ".js",
    optionD: "All of the above",
    correctAnswer: "c"},
   {
    question: "What does CSS stand for?",
    optionA: "Choice Special Styling",
    optionB: "Costco Store Size",
    optionC: "Cascading Style Sheets",
    optionD: "All of the above",
    correctAnswer: "c"},
    {
    question: "What tags might you find in an HTML document?",
    optionA: "div",
    optionB: "h1",
    optionC: "li",
    optionD: "all of the above",
    correctAnswer: "d"},
    {
    question: "What can Json be used for?",
    optionA: "adding styling to a webpage",
    optionB: "turning an array into a string",
    optionC: "processing user actions",
    optionD: "all of the above",
    correctAnswer: "b"},  
    {
    question: "What special character is an array contained in?",
    optionA: "{}",
    optionB: "()",
    optionC: "[]",
    optionD: "all of the above",
    correctAnswer: "c"},
    {
    question: "which of the following are you likely to see in a CSS document?",
    optionA: "display:flex;",
    optionB: "body",
    optionC: "var",
    optionD: "all of the above",
    correctAnswer: "a"},
        
    
    ];
// timer and other variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 30;
var timerInterval;
var score = 0;
var correct;

// runs through the array to generate questions and displays score if you've ran through all the questions
function generateQuizQuestion(){
    overDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.optionA;
    buttonB.innerHTML = currentQuestion.optionB;
    buttonC.innerHTML = currentQuestion.optionC;
    buttonD.innerHTML = currentQuestion.optionD;
};

// starts timer, quiz, and removes the start button
function startQuiz(){
    overDiv.style.display = "none";
    starterDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizMain.style.display = "block";
}
 // shows your score at the end of the quiz
function showScore(){
    quizMain.style.display = "none"
    overDiv.style.display = "flex";
    clearInterval(timerInterval);
    hiscorePlayerName.value = "";
    endScoreEl.innerHTML = "You scored " + score + " of " + quizQuestions.length + " not too bad!";

    if (score === 7) {
        alert("Hey, you got them all right!")
        return false;
        }
    if (score < 7) {
        alert("better luck next time!");
        return false;
        
    }
}

// uses json to stringify the array so it can be added to local storage, as well as displayed. 

submitBtn.addEventListener("click", function hiscore(){
    
    
    if(hiscorePlayerName.value === "") {
        alert("at least enter something");
        return false;
    }else{
        var savedHiscores = JSON.parse(localStorage.getItem("savedHiscores")) || [];
        var player = hiscorePlayerName.value.trim();
        var savedScore = {
            name : player,
            score : score
        };
    
        overDiv.style.display = "none";
        hiscoreContainer.style.display = "flex";
        hiscoreDiv.style.display = "block";
        gameOverButton.style.display = "flex";
        
        savedHiscores.push(savedScore);
        localStorage.setItem("savedHiscores", JSON.stringify(savedHiscores));
        generateHiscores();

    }
    
});

// updates hiscores 


function generateHiscores(){
    hiscoreIntl.innerHTML = "";
    hiscoreShownScore.innerHTML = "";
    var hiscores = JSON.parse(localStorage.getItem("savedHiscores")) || [];
    for (i=0; i<hiscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = hiscores[i].name;
        newScoreSpan.textContent = hiscores[i].score;
        hiscoreIntl.appendChild(newNameSpan);
        hiscoreShownScore.appendChild(newScoreSpan);
    }

}

//shows hiscores page, while hiding everything else
function showHiscore(){
    starterDiv.style.display = "none"
    overDiv.style.display = "none";
    hiscoreContainer.style.display = "flex";
    hiscoreDiv.style.display = "block";
    gameOverButton.style.display = "flex";




    generateHiscores();
}




//resets the entire quiz
function replayQuiz(){
    hiscoreContainer.style.display = "none";
    overDiv.style.display = "none";
    starterDiv.style.display = "flex";
    timeLeft = 30;
    score = 0;
    currentQuestionIndex = 0;
}

//checks if quiz answers were right or wrong and promps a response.
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Not bad, you're right!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Not quite...")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
        
    }
}



//quiz start button
startBtn.addEventListener("click",startQuiz);
