let start = document.querySelector("#start");
let timer = document.querySelector(".time-remaining");
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
let savedName = document.querySelector(".p-name");
let savedScore = document.querySelector(".p-score");
let savedTime = document.querySelector(".p-time");

let sessionScore = 0;
let sessionTime = 0;
let highScores = {};
let currentQ = '';
let count = 0;
let status = '';

question.innerText = "";
answer4.innerText = "yo";
yourScore.innerText = "hey"

let savedScores = [];


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
    questionArea.style.display = "flex";
    nextQ();
    let inner = setInterval(function () {
        if (a > 0 && status !== 'complete') {
            a--;
            sessionTime++;
            timer.innerHTML = aFormatted();
            console.log(a)
        }
        else {
            console.log("done");
            clearInterval(inner);
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
        console.log("arrived");
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
            result.innerText = 'correct';
            console.log('correct');
        } else {
            result.innerText = 'wrong';
            console.log('wong');
        }
        setTimeout(function () {
            result.innerText = '';
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
};

//this function saves the result to local storage
addScore.addEventListener('click', function () {
    let newPlayer = {
        name: input.value,
        score: sessionScore,
        time: sessionTime
    }
    savedScores.push(newPlayer);
    localStorage.setItem('player', JSON.stringify(savedScores));
})

//this function returns the saved high scores from local storage.
let retrievedScores = JSON.parse(localStorage.getItem('player'));
retrievedScores.forEach(function (val) {
    let nam = document.createElement('li');
    let sco = document.createElement('li');
    let tim = document.createElement('li');
    nam.innerText = val.name;
    sco.innerText = val.score;
    tim.innerText = val.time;
    savedName.appendChild(nam);
    savedScore.appendChild(sco);
    savedTime.appendChild(tim);

})


//this function clears the high scores from local storage. 
delScore.addEventListener('click', function () {
    localStorage.removeItem('player');
    window.location.reload(true);
})

