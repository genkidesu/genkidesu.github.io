let start = document.querySelector("#start");
let timer = document.querySelector(".time-left");
let question = document.querySelector(".question p");
let answers = document.querySelector("#ok");
let ansbuttons = document.querySelectorAll(".ans-buttons");
let answer1 = document.querySelector("#a1");
let answer2 = document.querySelector("#a2");
let answer3 = document.querySelector("#a3");
let answer4 = document.querySelector("#a4");
let result = document.querySelector(".result");
let questionArea = document.querySelector(".question-area");
let endResults = document.querySelector(".results-area");
let yourScore = document.querySelector("#you");
let yourTime = document.querySelector("#time");
let addScore = document.querySelector("#add-score");
let delScore = document.querySelector("#del-score");
let input = document.querySelector("#input");
let rows = document.getElementById("tbod");
let hsTable = document.querySelector(".high-scores");
let endControls = document.querySelector(".controls1");
let otControls = document.querySelector(".controls");
let leaderboard = document.querySelector(".leaderboard");

// these variables are used to decide what to do next and also to display scores, etc. 
let sessionScore = 0;
let sessionTime = 0;
let highScores = {};
let currentQ = '';
let count = 0;
let status = '';

//these are the questions and answers 
let questions = [{
    quest: "In Javascript, what is the built in function that enables you to write a message in the console?",
    answers: {
        a: 'print()',
        b: 'write.msg()',
        c: 'console.log()',
        d: 'hello.world()'
    },
    correct: 'a3'
},
{
    quest: "In CSS, what is the property used to create animations by changing size, angle, or other properties?",
    answers: {
        a: 'size',
        b: 'conCat',
        c: 'Transform',
        d: 'resize'
    },
    correct: 'a3'
},
{
    quest: "Hello, in HTML, what does the alt attribute do?",
    answers: {
        a: 'It stands for the Alt key on your keyboard',
        b: 'it means alternate code',
        c: 'it allows us to dynamically create elements',
        d: 'it shows text in place of an image if image cannot be displayed'
    },
    correct: 'a4'
},
{
    quest: "What is the function to insert a value to the beginning of an array?",
    answers: {
        a: '.pop()',
        b: '.unshift()',
        c: '.push()',
        d: '.slice()'
    },
    correct: 'a2'
},
{
    quest: "Why would you want to use a .map function?",
    answers: {
        a: 'to gather data from an array',
        b: 'to copy code from another site',
        c: 'to check that your code layout is logical',
        d: 'to make a copy of an array and/or apply changes to each value'
    },
    correct: 'a4'
},
{
    quest: "What is the order of priority for CSS selectors? (highest priority to lowest)",
    answers: {
        a: 'Top to Bottom, Class, Element, ID',
        b: 'Bottom to Top, ID, Class, Element',
        c: 'ID, Class, Top to Bottom, Element',
        d: 'Bottom to Top, Element, Class, ID'
    },
    correct: 'a2'
},
{
    quest: "If you use a splice function on an array what are you trying to do?",
    answers: {
        a: 'split it into parts',
        b: 'delete every second item',
        c: 'remove and/or add items at a specific position ',
        d: 'join 2 arrays together'
    },
    correct: 'a3'
},
{
    quest: "How do you access a specific Object key?",
    answers: {
        a: 'object(key)',
        b: 'object.key',
        c: 'object[key]',
        d: 'key.object'
    },
    correct: 'a2'
},
{
    quest: "What is jQuery?",
    answers: {
        a: 'a tool for debugging javascript',
        b: 'a function for executing queries on javascript objects',
        c: 'a tool for converting javascript to java',
        d: 'a library which is used to make executing javascript functions easier'
    },
    correct: 'a4'
},
{
    quest: "What is a call back function?",
    answers: {
        a: 'a function passed as an argument to another function',
        b: 'a function that is used over and over',
        c: 'a function from the past being recycled',
        d: 'a function that causes an eternal loop'
    },
    correct: 'a1'
}
];


//inital timer value and function to display it as mm:ss
a = 120;
aFormatted = function () {
    let minutes = Math.floor(a / 60);
    let seconds = a - (minutes * 60);
    if (a - (minutes * 60) < 10) {
        return (minutes + ":0" + seconds);
    } else {
        return (minutes + ":" + seconds);
    }
}

//this is the countdown clock and it also resets all scores and counters when it begins.
function countDown() {
    a = 120;
    count = 0;
    status = 'go';
    sessionTime = 0;
    sessionScore = 0;
    start.style.display = "none";
    answers.style.display = "flex";
    endResults.style.display = "none";
    hsTable.style.display = "none";
    endControls.style.display = "none";
    questionArea.style.display = "flex";
    delScore.style.display = "none";
    nextQ();
    let inner = setInterval(function () {
        if (a > 0 && status !== 'complete') {
            a--;
            sessionTime++;
            timer.innerHTML = aFormatted();
        }
        else {
            clearInterval(inner);
            results();
        }
    }, 1000)
}

//This function chooses the next question or ends the test if timer is done or all questions answered. 
//This function is triggered by the countdown clock initially and then is triggered by the answer buttons subsequently

function nextQ() {
    if (count < questions.length) {
        question.innerText = questions[count].quest;
        answer1.innerText = questions[count].answers.a;
        answer2.innerText = questions[count].answers.b;
        answer3.innerText = questions[count].answers.c;
        answer4.innerText = questions[count].answers.d;
        currentQ = questions[count].correct;
        count++
    }
    else {
        results();
    }
};

//this is the START button listener which starts timer and begins the test. 
start.addEventListener('click', countDown);

//this function adds a listener to each answer button and compares it to the correct answer for current question. 
ansbuttons.forEach(function (buttn) {
    buttn.addEventListener('click', function (e) {
        e.preventDefault();
        let ans = this.id;
        if (ans == currentQ) {
            sessionScore++;
            result.innerText = '...correct';
            result.style.color = 'green';
            result.style["font-weight"] = 'bold';
        } else {
            result.innerText = '...wrong';
            result.style.color = 'red';
            result.style["font-weight"] = 'bold';
        }
        setTimeout(function () {
            result.style.color = 'white'
        }, 1250);
        nextQ();
    })
});


//This function closes the quiz and opens up the results panel
function results() {
    questionArea.style.display = "none";
    answers.style.display = "none";
    endResults.style.display = "flex";
    yourScore.innerText = sessionScore;
    yourTime.innerText = sessionTime;
    status = 'complete';
    start.style.display = "block";
    hsTable.style.display = "flex";
    endControls.style.display = "flex";
    delScore.style.display = "block";
};

//creates new player record
function NewPlayer(names, score, time) {
    this.name = names;
    this.score = score;
    this.time = time;
}


//this function saves the result to local storage and updates the high score table on the screen
addScore.addEventListener('click', function () {
    var newScore = new NewPlayer(input.value, sessionScore, sessionTime);
    retrievedScores.push(newScore);
    localStorage.setItem('player', JSON.stringify(retrievedScores));
    let tro = rows.insertRow(0);
    let nam = document.createElement('td');
    let sco = document.createElement('td');
    let tim = document.createElement('td');
    nam.innerText = input.value;
    sco.innerText = sessionScore;
    tim.innerText = sessionTime;
    tro.appendChild(nam);
    tro.appendChild(sco);
    tro.appendChild(tim);
})

//this function returns the saved high scores from local storage. 
let retrievedScores =
    JSON.parse(localStorage.getItem("player")) || []
for (let i = 0; i < retrievedScores.length; i++) {

    let tro = rows.insertRow(0);
    let nam = document.createElement('td');
    let sco = document.createElement('td');
    let tim = document.createElement('td');

    nam.innerText = retrievedScores[i].name;
    sco.innerText = retrievedScores[i].score;
    tim.innerText = retrievedScores[i].time;

    tro.appendChild(nam)
    tro.appendChild(sco)
    tro.appendChild(tim);
}

//this function clears the high scores from local storage. 
delScore.addEventListener('click', function () {
    localStorage.removeItem('player');
    window.location.reload();
})

//this function displays the high scores list.
leaderboard.addEventListener('click', function () {
    hsTable.style.display = "flex";
    questionArea.style.display = "none";
    answers.style.display = "none";
    delScore.style.display = "block";
    start.style.display = "block";
})

