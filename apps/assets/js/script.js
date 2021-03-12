//  *************GLOBAL VARIABLES*************

//criteria inputs
let lowC = "abcdefghijklmnopqrstuvwxyz";
let uppC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numC = "1234567890";
let speC = "!#$%&()*@/:;<=";
//* removed +',-.>[]^_`{|}~ to lessen the amount of symbols

//Screen selectors
let begin = document.querySelector("#generate");
let endend = document.querySelector("#password")
let errors = document.querySelector(".error-display")
let lengthFail = document.querySelector("#length-fail");
let nonNumber = document.querySelector("#not-number");
let noChars = document.querySelector("#no-chars");

//buttons
let lower = document.querySelector("#lowerY");
let lowerN = document.querySelector("#lowerN");
let upper = document.querySelector("#upperY");
let upperN = document.querySelector("#upperN");
let num = document.querySelector("#numY");
let numN = document.querySelector("#numN");
let special = document.querySelector("#specialY");
let specialN = document.querySelector("#specialN");

//questions & question components
let q2 = document.querySelector("#ok1");
let q3 = document.querySelector("#ok2");
let q4 = document.querySelector("#ok3");
let q5 = document.querySelector("#ok4");
let submit = document.querySelector(".next");
let optionA = document.querySelector("#plength");
let option1 = document.querySelector(".amount");
let option2 = document.querySelector(".options");
let option3 = document.querySelector(".options2");
let option4 = document.querySelector(".options3");
let option5 = document.querySelector(".options4");

//Empty variables used to record choices
let pSize = [];
let choices = [];
let baseArray = "";
let pw = "";
let illegalCombos = [];


// ***************START PROCESS*****************

//This is a listener on the red 'generate' button which starts the process and resets previous choices
begin.addEventListener('click', function () {
    pSize = [];
    choices = [];
    baseArray = "";
    endend.innerText = pw;
    lengthFail.style.display = "none";
    noChars.style.display = "none";
    nonNumber.style.display = "none";
    option1.style.display = "flex";
})


// **************LENGTH SELECTION**************

// Listeners to record and validate length selections and move to next choice.

// Listener for the enter key press event
optionA.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        lengthFail.style.display = "none";
        nonNumber.style.display = "none";

        if (isNaN(optionA.value)) {
            nonNumber.style.display = "block";
            return "fail: not a number";
        }
        if (optionA.value < 8) {
            lengthFail.style.display = "block";
            return "fail: password too short";
        }
        if (optionA.value > 128) {
            lengthFail.style.display = "block";
            return "fail: too short";
        }

        pSize.push(optionA.value);
        option1.style.display = "none";
        option2.style.display = "flex";
        q2.style.display = "block";
    }
});

//Listener for the submit button click 
submit.addEventListener('click', function () {
    lengthFail.style.display = "none";
    nonNumber.style.display = "none";

    if (isNaN(optionA.value)) {
        nonNumber.style.display = "block";
        return "fail: not a number";
    }
    if (optionA.value < 8) {
        lengthFail.style.display = "block";
        return "fail: password too short";
    }
    if (optionA.value > 128) {
        lengthFail.style.display = "block";
        return "fail: too short";
    }

    pSize.push(optionA.value);
    option1.style.display = "none";
    option2.style.display = "flex";
    q2.style.display = "block";
})

// ***********CHARACTER SELECTION*************

// These functions record choices and then display the next choice //

// Lower case characters- yes or no
lower.addEventListener('click', function () {
    choices.push("y");
    setTimeout(function () {
        option2.style.display = "none";
        option3.style.display = "flex";
        q3.style.display = "flex";
    }, 150);
});
lowerN.addEventListener('click', function () {
    choices.push("n");
    setTimeout(function () {
        option2.style.display = "none";
        option3.style.display = "flex";
        q3.style.display = "flex";
    }, 150);
});

//Uppercase Characters - yes or no
upper.addEventListener('click', function () {
    choices.push("y");
    setTimeout(function () {
        option3.style.display = "none";
        option4.style.display = "flex";
        q4.style.display = "block";
    }, 150);
});
upperN.addEventListener('click', function () {
    choices.push("n");
    setTimeout(function () {
        option3.style.display = "none";
        option4.style.display = "flex";
        q4.style.display = "block";
    }, 150);
});

//Numbers - yes or no
num.addEventListener('click', function () {
    choices.push("y");
    setTimeout(function () {
        option4.style.display = "none";
        option5.style.display = "flex";
        q5.style.display = "block";
    }, 150);
});
numN.addEventListener('click', function () {
    choices.push("n");
    setTimeout(function () {
        option4.style.display = "none";
        option5.style.display = "flex";
        q5.style.display = "block";
    }, 150);
});

//Special characters - yes or no
special.addEventListener('click', function () {
    choices.push("y");
    setTimeout(function () {
        option5.style.display = "none";
        q5.style.display = "none";
        charSelector();
    }, 150);
});
specialN.addEventListener('click', function () {
    choices.push("n");
    setTimeout(function () {
        option5.style.display = "none";
        q5.style.display = "none";
        charSelector();
    }, 150);
});


// *********CHOICE VALIDATION **********

//Choice validation: Constructs an input pool of characters based on user choices
function charSelector() {
    if (choices.toString() == "n,n,n,n") {

        noChars.style.display = "block";
        return "fail: No characters selected";
    }
    if (choices[0] == "y") {
        baseArray += lowC;
    };
    if (choices[1] == "y") {
        baseArray += uppC;
    };
    if (choices[2] == "y") {
        baseArray += numC;
    };
    if (choices[3] == "y") {
        baseArray += speC;
    };
    randomG();
}

//  ************RANDOM GEN****************

//This function does the actual calculation and sends it to the screen
function randomG() {
    let lengthz = pSize;
    let inp = baseArray;
    let pass = "";

    for (let i = lengthz; i > 0; i--) {
        let choice = inp[Math.floor(Math.random() * inp.length)];
        pass += choice;
    }
    endend.innerText = pass;
}




