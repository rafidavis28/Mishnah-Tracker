import { FLAT_MISHNAH_INDEX, TOTAL_MISHNAYOT, DAILY_RATE } from '../constants';
import { DailyPortion } from '../types';

export const calculateStudyDaysElapsed = (start: string | Date, current: Date): number => {
    let d1 = new Date(start); 
    d1.setHours(0,0,0,0);
    
    let d2 = new Date(current);
    d2.setHours(0,0,0,0);

    if (d2 < d1) return 0;

    let count = 0;
    while (d1 < d2) {
        // Skip Saturdays (Day 6)
        if (d1.getDay() !== 6) {
            count++;
        }
        d1.setDate(d1.getDate() + 1);
    }
    return count;
};

export const getDailyPortion = (startDateStr: string, viewDate: Date): DailyPortion => {
    const studyDaysElapsed = calculateStudyDaysElapsed(startDateStr, viewDate);
    const isShabbat = viewDate.getDay() === 6;

    const absoluteStartIndex = (studyDaysElapsed * DAILY_RATE) % TOTAL_MISHNAYOT;
    
    const todayMishnayot = [];
    let wrapsAround = false;

    if (!isShabbat) {
        for (let i = 0; i < DAILY_RATE; i++) {
            let idx = (absoluteStartIndex + i) % TOTAL_MISHNAYOT;
            if (i > 0 && idx === 0) wrapsAround = true;
            todayMishnayot.push(FLAT_MISHNAH_INDEX[idx]);
        }
    }

    // Grouping Logic
    const groups = [];
    if (todayMishnayot.length > 0) {
        let currentGroup = { 
            name: todayMishnayot[0].name, 
            start: todayMishnayot[0], 
            end: todayMishnayot[0] 
        };

        for (let i = 1; i < todayMishnayot.length; i++) {
            const m = todayMishnayot[i];
            if (m.name === currentGroup.name) {
                currentGroup.end = m;
            } else {
                groups.push(currentGroup);
                currentGroup = { name: m.name, start: m, end: m };
            }
        }
        groups.push(currentGroup);
    }

    return {
        mishnayot: todayMishnayot,
        isShabbat,
        date: viewDate,
        wrapsAround,
        displayGroup: groups
    };
};

export const formatDate = (d: Date): string => {
    return d.toLocaleDateString('en-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};