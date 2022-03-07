// Function to set the background from the unsplash API.
async function setBackground() {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.links.download})`
    document.querySelector(".pic-credit").innerHTML =
        `By <span class="auth">${data.user.first_name + " " + data.user.last_name}</span>, Unsplash.`
    document.querySelector(".location").textContent = data.location.name;
}
//  Fn to set temperature based on client location. 

navigator.geolocation.getCurrentPosition(pos => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".temp").textContent = `${data.main.temp}° C`;
            document.querySelector(".loc").textContent = data.name;
        })
});

// Fn to update date and time every minute.


const setDateTime = _ => {
    let time = new Date;
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"]

    const clock = document.querySelector(".clockarea__date-time");
    let hours = parseInt(time.getHours()) < 10 ? `0${time.getHours()}` : time.getHours();
    let mins = parseInt(time.getMinutes()) < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    clock.textContent = `${hours}:${mins}`;

    const dateDay = document.querySelector(".clockarea__date")
    dateDay.textContent = `${dayNames[time.getDay()]} ${monthNames[time.getMonth()]} ${time.getFullYear()}`

    const updateTime = setInterval(() => {
        time = new Date;
        hours = parseInt(time.getHours()) < 10 ? `0${time.getHours()}` : time.getHours();
        mins = parseInt(time.getMinutes()) < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        clock.textContent = `${hours}:${mins}`
    }, 1000);

    document.querySelector(".clockarea__day").textContent = weekdays[time.getDay()];

}

setBackground()
setDateTime()


//  To do.


// Fetching elements. 

const btnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
class="close_svg" viewBox="0 0 16 16">
<path fill-rule="evenodd"
    d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
<path fill-rule="evenodd"
    d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
</svg>`;

const body = document.body;
const taskInput = document.getElementById("taskInput");
const taskListEl = document.querySelector(".todo__tasklist");
let taskListArr = [];

// Fn to: create a new task

const create = (task) => {
    const li = document.createElement("li");
    li.classList.add("todo__task")
    // P is made, class & text added to p, P ADDED TO LI.
    const p = document.createElement("p");
    p.classList.add("todo__task__text");
    p.innerText = task;
    li.appendChild(p)
    // Button is made, SVG added to Btn, Btn added to LI.
    const btn = document.createElement("button");
    btn.classList.add("todo__task__closeBtn");
    btn.innerHTML = btnIcon;
    li.appendChild(btn);
    // LI finally pushed to DOM.
    taskListEl.insertBefore(li, taskListEl.childNodes[0]);

}
// Fn to: Close button functionality.
const closeFunction = () => {
    // Function for adding event listener.
    const onclickAdd = (e) => {
        const taskText = e.currentTarget.previousSibling.innerText;
        const textIndex = taskListArr.indexOf(taskText);
        taskListArr.splice(textIndex, 1)
        renderTasks();
        saveToLocal();
    }

    if (taskListArr.length) {
        taskListArr.forEach((task, index) => {
            const btnEl = taskListEl.children[index].children[1]
            btnEl.addEventListener("click", onclickAdd)
        })
    }
}


// Rendering all tasks.
const renderTasks = _ => {
    taskListEl.innerHTML = null;
    taskListArr.forEach((task, index) => {
        create(task);
    })
    closeFunction();
}

// If the local storage array exists & has any tasks (length != 0), render them.
if (JSON.parse(localStorage.getItem("taskArray")) && JSON.parse(localStorage.getItem("taskArray")).length) {
    taskListArr = JSON.parse(localStorage.getItem("taskArray"));
    renderTasks()
}

// Fn to save tasks to local storage.

function saveToLocal() {
    localStorage.setItem("taskArray", JSON.stringify(taskListArr));
}






// Adding a new task.

taskInput.addEventListener("keyup", e => {
    if (e.currentTarget.value && e.key === "Enter") {
        e.preventDefault();
        let taskText = e.currentTarget.value;
        taskListArr.push(taskText);
        e.currentTarget.value = null;
        saveToLocal()
        renderTasks();
    }
})



