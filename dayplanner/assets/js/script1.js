let current = document.querySelector("#current-time");
// let inputs = document.querySelectorAll(".entry");
let inputs = '';
let buttons = '';
let time = '';

rightNow = moment().format('MM/DD/YYYY');

// function to keep calling the current time function each second
function currentTime() {
    now = moment().format('dddd [,] Do MMMM YYYY [-] HH:mm:ss');
    current.innerHTML = now;
    setTimeout(function () {
        currentTime();
    }, 1000);
}

currentTime();

savedActivities = [
    {
        slot: 8,
        activities: '',
        completed: false
    },
    {
        slot: 9,
        activities: '',
        completed: true
    },
    {
        slot: 10,
        activities: '',
        completed: false
    },
    {
        slot: 11,
        activities: '',
        completed: false
    },
    {
        slot: 12,
        activities: '',
        completed: false
    },
    {
        slot: 13,
        activities: '',
        completed: false
    },
    {
        slot: 14,
        activities: '',
        completed: false
    },
    {
        slot: 15,
        activities: '',
        completed: false
    },
    {
        slot: 16,
        activities: '',
        completed: false
    }
]

// display calendar
let rows = document.getElementById("tbod");

function tableMake() {
    for (let i = 0; i < 9; i++) {
        let ok = i + 8;
        let ok1 = i + 9;
        let start = " " + ok.toString() + ":00";
        let end = " " + ok1.toString() + ":00";

        startTime = (moment(rightNow + start)).format('h A')
        endTime = (moment(rightNow + end)).format('h A')

        let tro = rows.insertRow(i);
        let timeBlock = document.createElement('td');
        let activities = document.createElement('td');
        let complete = document.createElement('td');
        let saveButton = document.createElement('div');
        let entry = document.createElement('textarea');

        tro.id = i;
        saveButton.className = "saveItem";
        entry.className = "entry";
        activities.className = "activities";
        activities.appendChild(entry);
        saveButton.innerText = "Save";
        timeBlock.innerText = startTime + ' - ' + endTime;
        timeBlock.className = "slots";
        try {
            entry.value = savedActivities[i].activities;
        }
        catch (e) {
            entry.value = "";
        }
        //  entry.value = savedActivities[i].activities;
        complete.appendChild(saveButton);
        tro.appendChild(timeBlock);
        tro.appendChild(activities);
        tro.appendChild(complete);




    }
    inputs = document.querySelectorAll(".entry");
    // buttons = document.getElementsByClassName("saveItem");
    // time = document.getElementsByClassName('slots');
}



tableMake();

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
    console.log("arrived");
}


$(document).on('click', '.saveItem', function () {
    let timeS = $(this).closest('tr').attr('id');
    let item = $(this).closest('tr').children('td.activities').children('textarea').val();
    try {
        saved[timeS].activities = item;
        console.log(saved);
        localStorage.setItem("dayplan", JSON.stringify(saved))
    }
    catch (e) {
        console.log('path2')
        saved.push({ slot: timeS, activities: item });
        localStorage.setItem("dayplan", JSON.stringify(saved))
    }
})



var d = new Date();
var n = d.getHours();
