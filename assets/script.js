var body = document.body;

//selects the span where the time will be displayed
var timeEl = document.getElementById("time");
//selects the button which starts the quiz
var startButtonEl = document.getElementById("startButton");
//selects the section which is visible when the page is first opened
var startEl = document.getElementById("startSection");

//creates the section which will contain the quiz questions and answer choices
var questionSectionEl = document.createElement("section");
//creates the heading where the question is displayed
var questionEl = document.createElement("h2");
//creates the list containing the answer choices
var answerChoicesEl = document.createElement("ol");
//creates the answer choices
var choice1El = document.createElement("li");
var choice2El = document.createElement("li");
var choice3El = document.createElement("li");
var choice4El = document.createElement("li");
//creates the paragraph element where the 
var correctnessEl = document.createElement("p");
//creates the button which causes the next question to be displayed
var nextButton = document.createElement("button");
nextButton.textContent = "next question";

//selects the section which is displayed when the quiz is finished
var endSectionEl = document.getElementById("endSection")
//sets the end section to be invisible
endSectionEl.setAttribute("style", "display:none;")
//selects the heading which says whether the user answered all questions or ran out of time
var endMessageEl = document.getElementById("endMessage")
//selects the button which records the user'sscore
var recordScoreButton = document.getElementById("recordScoreBtn")
//selects the span which states the user's score
var scoreEl = document.getElementById("score")
//selects the input bar where the user enters initials
var initialsInput = document.getElementById("initials")

//selects the section where the recorded scores are displayed
var recordedScoresEl = document.getElementById("recordedScores")
//sets that section to be invisible
recordedScoresEl.setAttribute("style", "display:none;")

//selects the button which displays recorded scores
var viewScoresEl = document.getElementById("viewScores")
//selects the list of recorded scores
var scoresListEl = document.getElementById("scoresList")

//the number of seconds the user has to complete the quiz
var timeLeft = 60;

var answerChosen = false;
var quizCompleted = false;
var displayedQuestion;
var score = 0;
var initials

//the object in which the scores are recorded
var scoreRecord = {

}; 
//adds the previously recorded scores to the object
var storedScores = JSON.parse(localStorage.getItem("scoreRecord"))
if (storedScores !== null) {
    scoreRecord = storedScores;
}

//hides the start section, starts the timer and calls the questionOne function
function startQuiz (event) {
    event.preventDefault()
    startEl.setAttribute("style", "display:none;")
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft + " seconds";
    
        if(timeLeft === 0) {
          endQuiz()
          clearInterval(timerInterval);
        }
        else if (quizCompleted) {
            clearInterval(timerInterval);
        }
        
    }, 1000)
    questionOne()

}

//displays the first question
function questionOne() {

    displayedQuestion = 1
    
    //changes the content of the elements which contain the question and answer choices
    questionEl.textContent = "Which logs the word \"message\" to the console";
    choice1El.textContent = "console.log(message)";
    choice2El.textContent = "console.log(\"message\")";
    choice3El.textContent = "print(message)";
    choice4El.textContent = "console,log(\"message\")";

    //appends the question section to the page and appends the question and answer choices to the question section
    body.appendChild(questionSectionEl);
    questionSectionEl.appendChild(questionEl);
    questionSectionEl.appendChild(answerChoicesEl);
    answerChoicesEl.appendChild(choice1El);
    answerChoicesEl.appendChild(choice2El);
    answerChoicesEl.appendChild(choice3El);
    answerChoicesEl.appendChild(choice4El);
    questionSectionEl.setAttribute("id", "questionSection");
    
    //the second answer choice is the correct one
    choice1El.addEventListener("click", incorrect);
    choice2El.addEventListener("click", correct);
    choice3El.addEventListener("click", incorrect);
    choice4El.addEventListener("click", incorrect);

    //appends the element stating whether the user chose a correct or incorrect answer
    questionSectionEl.appendChild(correctnessEl);
    
}

function questionTwo() {

    displayedQuestion = 2
    console.log(displayedQuestion)

    questionEl.textContent = "What value does the expression 10 == \"10\" return?";
    choice1El.textContent = "true";
    choice2El.textContent = "false";
    choice3El.textContent = "10";
    choice4El.textContent = "\"10\"";

    questionSectionEl.appendChild(correctnessEl);
    

}

function questionThree() {

    displayedQuestion = 3
    console.log(displayedQuestion)

    questionEl.textContent = "Which adds \"four\" to the end of an array with three elements named numbers";
    choice1El.textContent = "numbers += \"four\"";
    choice2El.textContent = "numbers.append(\"four\")";
    choice3El.textContent = "numbers.push(\"four\")";
    choice4El.textContent = "numbers[3] = \"four\"";

    //changes the correct answer choice to the third one
    choice2El.removeEventListener("click", correct);
    choice3El.removeEventListener("click", incorrect);
    choice2El.addEventListener("click", incorrect);
    choice3El.addEventListener("click", correct);

    questionSectionEl.appendChild(correctnessEl);
    

}

function questionFour() {

    displayedQuestion = 4;
    console.log(displayedQuestion)

   questionEl.textContent = "which returns the first three elements of the array items";
    choice1El.textContent = "items.slice(0,3)";
    choice2El.textContent = "items[3]";
    choice3El.textContent = "items[2]";
    choice4El.textContent = "items.cut(0,3)";
    
    //changes the correct answer choice to the first one
    choice3El.removeEventListener("click", correct);
    choice1El.removeEventListener("click", incorrect);
    choice3El.addEventListener("click", incorrect);
    choice1El.addEventListener("click", correct);

    questionSectionEl.appendChild(correctnessEl); 
    

}

function questionFive() {

    displayedQuestion = 5
    console.log(displayedQuestion)

    questionEl.textContent = "Which HTML element links script.js to the website";
    choice1El.textContent = "<link src=\"script.js\"></link>";
    choice2El.textContent = "<link href=\"script.js\"></link>";
    choice3El.textContent = "script rel=\"script.js\"></script>";
    choice4El.textContent = "<script src=\"script.js\"></script>";

    questionSectionEl.setAttribute("id", "question");
    
    //changes the correct answer choice to the fourth one
    choice1El.removeEventListener("click", correct);
    choice4El.removeEventListener("click", incorrect);
    choice1El.addEventListener("click", incorrect);
    choice4El.addEventListener("click", correct);

    questionSectionEl.appendChild(correctnessEl);

    nextButton.textContent = "finish quiz";

}

//this is called when the correct answer is chosen
function correct(event) {
    var element = event.target;
    //makes sure an answer has not already been chosen before making the chosen list item green, displaying "correct", incrementing the score, and appending the next button
    if (!answerChosen) {
        element.setAttribute("style", "background-color:green");
        correctnessEl.textContent = "correct";
        answerChosen = true;
        score++;
        questionSectionEl.appendChild(nextButton)
    }
    
}

//this is called when an incorrect answer is chosen
function incorrect(event) {
    var element = event.target;
    //makes sure an answer has not already been chosen before making the chosen list item red, displaying "incorrect", reducing the remaining time, and appending the next button
    if (!answerChosen) {
        element.setAttribute("style", "background-color:red")
        correctnessEl.textContent = "incorrect"
        answerChosen = true
        timeLeft -= 10
        questionSectionEl.appendChild(nextButton)
    }
}

//undoes the things which occur when an answer is chosen and displays the next question
function nextQuestion() {
    correctnessEl.textContent = ""
    questionSectionEl.removeChild(nextButton)
    choice1El.setAttribute("style", "background-color:white")
    choice2El.setAttribute("style", "background-color:white")
    choice3El.setAttribute("style", "background-color:white")
    choice4El.setAttribute("style", "background-color:white")
    answerChosen = false
    if (displayedQuestion === 1) {
        questionTwo()
    }
    else if (displayedQuestion === 2) {
        questionThree()
    }
    else if (displayedQuestion === 3) {
        questionFour()
    }
    else if (displayedQuestion === 4) {
        questionFive()
        nextButton.textContent = "Finish quiz"
    }
    else if (displayedQuestion === 5) {
        quizCompleted = true;
        endQuiz();
    }

}

//Makes the end section visible and removes the question section
function endQuiz() {
    endSectionEl.setAttribute("style", "display:inline;")
    scoreEl.textContent = score
    body.removeChild(questionSectionEl)
    
    if (quizCompleted) {
        endMessageEl.textContent = "Quiz complete"
        
    }
    else {
        endMessageEl.textContent = "Out of time"
    }
    
}

//records the initials and score in the local storage
function recordScore(event) {
    event.preventDefault()
    scoreRecord[initialsInput.value] = score
    localStorage.setItem("scoreRecord", JSON.stringify(scoreRecord));
}

//displays the recoded scores 
function displayScores() {
    recordedScoresEl.setAttribute("style", "display:inline;")
    endSectionEl.setAttribute("style", "display:none;")
    questionSectionEl.setAttribute("style", "display:none;")
    startEl.setAttribute("style", "display:none;")
    viewScoresEl.setAttribute("style", "display:none;")

    var scoreDisplay = JSON.parse(localStorage.getItem("scoreRecord"))
    //iterates through the recorded scores and creates and appends a list item containing the intitial and score for each one
    for (var recordedInitial in scoreDisplay){
        var scoreEntry = document.createElement("li");
        scoreEntry.textContent = recordedInitial + ": " + scoreDisplay[recordedInitial]
        scoresListEl.appendChild(scoreEntry)
    }
    
}

//starts the timer and displays first question when the start button is clicked
startButtonEl.addEventListener("click", startQuiz);
//displays the next question when the next question button is clicked
nextButton.addEventListener("click", nextQuestion);
recordScoreButton.addEventListener("click", recordScore);
viewScoresEl.addEventListener("click", displayScores);