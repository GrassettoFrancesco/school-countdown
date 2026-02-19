const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secsEl = document.getElementById('seconds');

const targetDate = new Date('2026-06-06T13:00:00');

function countdown() {
    const now = new Date();
    
    if (now >= targetDate) {
        updateDisplay(0, 0, 0, 0);
        return;
    }

    let totalMilliseconds = 0;
    let currentCheck = new Date(now.getTime());

    // Configurazione Festività 2026
    const holidays = [
        { start: new Date('2026-04-02T00:00:00'), end: new Date('2026-04-07T23:59:59') }, // Ponte Aprile
        { day: 25, month: 3 }, // 25 Aprile (Mese 3 = Aprile)
        { day: 1, month: 4 },  // 1 Maggio (Mese 4 = Maggio)
        { day: 2, month: 5 }   // 2 Giugno (Mese 5 = Giugno)
    ];

    while (currentCheck < targetDate) {
        const dayOfWeek = currentCheck.getDay(); 
        const isSunday = (dayOfWeek === 0);
        
        // Verifica se il giorno corrente è tra le festività
        const isHoliday = holidays.some(h => {
            if (h.start) return currentCheck >= h.start && currentCheck <= h.end;
            return currentCheck.getDate() === h.day && currentCheck.getMonth() === h.month;
        });

        // Calcola solo se NON è domenica e NON è festa
        if (!isSunday && !isHoliday) {
            // Finestra lavorativa: 08:00 - 13:00
            const startOfWork = new Date(currentCheck).setHours(8, 0, 0, 0);
            const endOfWork = new Date(currentCheck).setHours(13, 0, 0, 0);

            let windowStart = Math.max(currentCheck.getTime(), startOfWork);
            let windowEnd = Math.min(targetDate.getTime(), endOfWork);

            if (windowStart < windowEnd) {
                totalMilliseconds += (windowEnd - windowStart);
            }
        }

        // Vai al giorno successivo alle 00:00
        currentCheck.setDate(currentCheck.getDate() + 1);
        currentCheck.setHours(0, 0, 0, 0);
    }

    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    
    // Calcolo basato su giornata lavorativa di 5 ore
    const secondsInWorkDay = 5 * 3600; 
    const d = Math.floor(totalSeconds / secondsInWorkDay);
    const h = Math.floor((totalSeconds % secondsInWorkDay) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    updateDisplay(d, h, m, s);
}

function updateDisplay(d, h, m, s) {
    daysEl.innerHTML = d;
    hoursEl.innerHTML = h;
    minsEl.innerHTML = m;
    secsEl.innerHTML = s;
}

setInterval(countdown, 1000);
countdown();
