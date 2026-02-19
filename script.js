const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secsEl = document.getElementById('seconds');

const newBeginnings = '06 June 2026 13:00';

function countdown() {
    const newDate = new Date(newBeginnings);
    let currentDate = new Date();

    // 1. Esclusione date specifiche (Vacanze Aprile/Maggio/Giugno)
    // Controlliamo se la data corrente cade nei range vietati
    
    // Dal 2 al 7 Aprile 2026
    const startAprilGap = new Date('2026-04-02T00:00:00');
    const endAprilGap = new Date('2026-04-07T23:59:59');
    if (currentDate >= startAprilGap && currentDate <= endAprilGap) {
        currentDate = new Date('2026-04-08T00:00:00');
    }

    // 25 Aprile
    if (currentDate.getMonth() === 3 && currentDate.getDate() === 25) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0);
    }

    // 1 Maggio
    if (currentDate.getMonth() === 4 && currentDate.getDate() === 1) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0);
    }

    // 2 Giugno
    if (currentDate.getMonth() === 5 && currentDate.getDate() === 2) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0);
    }

    // 2. Logica originale per i weekend
    // Sabato pomeriggio (dalle 13:00) -> sposta a Lunedì
    if (currentDate.getDay() === 6 && currentDate.getHours() >= 13) {
        currentDate.setDate(currentDate.getDate() + 2);
        currentDate.setHours(0, 0, 0, 0);
    }
    
    // Domenica -> sposta a Lunedì
    if (currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
        currentDate.setHours(0, 0, 0, 0);
    }

    // Venerdì dopo le 13:00 (Opzionale, basato sul tuo codice originale)
    if (currentDate.getDay() === 5 && currentDate.getHours() >= 13) {
        currentDate.setDate(currentDate.getDate() + 3);
        currentDate.setHours(0, 0, 0, 0);
    }

    const totalSeconds = (newDate - currentDate) / 1000;

    // Se il countdown è finito (evita numeri negativi)
    if (totalSeconds < 0) {
        daysEl.innerHTML = 0;
        hoursEl.innerHTML = 0;
        minsEl.innerHTML = 0;
        secsEl.innerHTML = 0;
        return;
    }

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
