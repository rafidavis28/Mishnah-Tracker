export interface Masechet {
    name: string;
    chapters: number[]; // Array of mishnah counts per chapter
}

export interface MishnahLocation {
    name: string;
    chapter: number;
    mishnah: number;
    globalIndex: number;
}

export interface DailyPortion {
    mishnayot: MishnahLocation[];
    isShabbat: boolean;
    date: Date;
    wrapsAround: boolean;
    displayGroup: {
        name: string;
        start: MishnahLocation;
        end: MishnahLocation;
    }[];
}

export interface UserSettings {
    startDateStr: string;
}

export enum AppRoute {
    TRACKER = 'tracker',
    STATS = 'stats'
}