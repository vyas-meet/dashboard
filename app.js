async function setBackground() {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature");
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.links.download})`
    document.querySelector(".pic-credit").innerHTML =
        `By <span class="auth">${data.user.first_name + " " + data.user.last_name}</span>, Unsplash.`
    document.querySelector(".location").textContent = data.location.name;
}


navigator.geolocation.getCurrentPosition(pos => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".temp").textContent = `${data.main.temp}° C`;
            document.querySelector(".loc").textContent = data.name;
        })
});



const setDateTime = _ => {
    let time = new Date;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"]

    const clock = document.querySelector(".clockarea__date-time");
    let mins = parseInt(time.getMinutes()) < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    clock.textContent = `${time.getHours()}:${mins}`;

    const dateDay = document.querySelector(".clockarea__date")
    dateDay.textContent = `${dayNames[time.getDay()]} ${monthNames[time.getMonth()]} ${time.getFullYear()}`

    setInterval(() => {
        time = new Date;
        clock.textContent = `${time.getHours()}:${mins}`
    }, 60000);

}

setBackground()
setDateTime()
