const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secsEl = document.getElementById('seconds');

const newBeginnings = '6 June 2026 13:00';

function countdown() {
    const newDate = new Date(newBeginnings);
    const currentDate = new Date();

    // Exclude Saturday afternoons and all of Sunday
    while (currentDate.getDay() === 6 && currentDate.getHours() >= 13) {
        // If it's Saturday after 13:00, move to Monday
        currentDate.setDate(currentDate.getDate() + 2);
    }
    
    while (currentDate.getDay() === 0) {
        // If it's Sunday, move to Monday
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // If it's Friday after 13:00, move to Monday
    if (currentDate.getDay() === 5 && currentDate.getHours() >= 13) {
        currentDate.setDate(currentDate.getDate() + 3);
    }

    const totalSeconds = (newDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minsEl.innerHTML = minutes;
    secsEl.innerHTML = seconds;
}

// initial call
countdown();

setInterval(countdown, 1000);
