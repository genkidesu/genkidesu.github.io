let current = document.querySelector("#current-time");
let timeSlots = document.getElementsByTagName("tr");
let clearButton = document.querySelector("#corner2");
let inputs = '';
let buttons = '';
let time = '';

date = moment().format('MM/DD/YYYY');
hour = moment().format('HH');


// function to keep the current time and date up to date on the page
function currentTime() {
    now = moment().format('dddd [,] Do MMMM YYYY [-] HH:mm:ss');
    current.innerHTML = now;
    setTimeout(function () {
        currentTime();
    }, 1000);
}
currentTime();


// create a table which shows the time slots
let rows = document.getElementById("tbod");

function tableMake() {
    for (let i = 0; i < 10; i++) {
        let ok = i + 8;
        let start = " " + ok.toString() + ":00";

        startTime = (moment(date + start)).format('h A')

        // Create elements
        let tro = rows.insertRow(i);
        let timeBlock = document.createElement('td');
        let activities = document.createElement('td');
        let complete = document.createElement('td');
        let saveButton = document.createElement('div');
        let entry = document.createElement('textarea');

        // assign values and classes
        tro.id = i;
        saveButton.className = "saveItem";
        entry.className = "entry";
        activities.className = "activities";
        activities.appendChild(entry);
        saveButton.innerText = "Save";
        timeBlock.innerText = startTime;
        timeBlock.className = "slots";
        try {
            entry.value = savedActivities[i].activities;
        }
        catch (e) {
            entry.value = "";
        }

        // add the elements to the table
        complete.appendChild(saveButton);
        tro.appendChild(timeBlock);
        tro.appendChild(activities);
        tro.appendChild(complete);
    }
    inputs = document.querySelectorAll(".entry");
    // Call the function to past, present, future
    currentSlot()
}

// call the table make function
tableMake();

// handle the saved activity data
let saved = JSON.parse(localStorage.getItem("dayplan"));
try {
    for (i = 0; i < saved.length; i++) {
        activityField = saved[i].activities;
        inputs[i].value = activityField;
    }
}
catch (e) {
    console.log('there are no activities to display yet');
    localStorage.setItem("dayplan", "[]");
    location.reload();
}
finally {
}

// Configure the 'save' button to make it send the data to local storage
$(document).on('click', '.saveItem', function () {
    let timeS = $(this).closest('tr').attr('id');
    let item = $(this).closest('tr').children('td.activities').children('textarea').val();
    try {
        saved[timeS].activities = item;
        localStorage.setItem("dayplan", JSON.stringify(saved))
    }
    catch (e) {
        console.log('First time user, creating data table');
        for (let i = 0; i < 10; i++) {
            saved.push({ slot: i, activities: "" });
        };
        saved[timeS].activities = item;
        localStorage.setItem("dayplan", JSON.stringify(saved))
    }
})

// determine if timeslot is past present or future and assign a class to change its color
function currentSlot() {
    for (let i = 1; i < timeSlots.length; i++) {
        if ((parseInt(timeSlots[i].getAttribute('id')) + 8) > hour) {
            timeSlots[i].className = "future";
        } else if ((parseInt(timeSlots[i].getAttribute('id')) + 8) < hour) {
            timeSlots[i].className = "past";
        } else {
            timeSlots[i].className = "present";
        }
    }
}

//ensures the currently highlighted slot stays up to date.
let refresh = setInterval(function () {
    currentSlot();
}, 60000);

// clears all the saved data so that a new day can begin

clearButton.addEventListener('click', function () {
    if (confirm("This will delete all activities, are you sure?")) {
        localStorage.removeItem('dayplan');
        window.location.reload();
    }
    else {
        return false;
    }
})