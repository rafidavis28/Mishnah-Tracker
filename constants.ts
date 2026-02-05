import { Masechet, MishnahLocation } from './types';

export const DAILY_RATE = 14;

export const MISHNAH_DATA: Masechet[] = [
    // ZERAIM
    { name: "Berakhot", chapters: [5,5,6,7,5,8,5,9,5] },
    { name: "Peah", chapters: [6,8,8,5,8,11,8,9] },
    { name: "Demai", chapters: [4,5,6,7,11,12,8] },
    { name: "Kilaim", chapters: [9,11,7,9,8,9,8,6,10] },
    { name: "Sheviit", chapters: [8,10,10,10,9,6,7,11,9,9] },
    { name: "Terumot", chapters: [10,6,9,13,9,6,7,12,7,12,10] },
    { name: "Maaserot", chapters: [8,8,10,6,8] },
    { name: "Maaser Sheni", chapters: [7,10,13,12,15] },
    { name: "Challah", chapters: [9,8,10,11] },
    { name: "Orlah", chapters: [9,17,9] },
    { name: "Bikkurim", chapters: [11,11,12] }, // Standardized
    
    // MOED
    { name: "Shabbat", chapters: [11,7,6,2,4,10,4,7,7,6,6,6,7,4,3,8,8,3,6,5,3,6,5,5] },
    { name: "Eruvin", chapters: [10,6,9,11,9,10,11,11,4,15] },
    { name: "Pesachim", chapters: [7,8,8,9,10,6,13,8,11,9] },
    { name: "Shekalim", chapters: [7,5,4,9,6,6,7,8] },
    { name: "Yoma", chapters: [8,7,11,6,7,8,5,9] },
    { name: "Sukkah", chapters: [11,9,15,10,8] },
    { name: "Beitzah", chapters: [10,10,8,7,7] },
    { name: "Rosh Hashanah", chapters: [9,9,8,9] },
    { name: "Taanit", chapters: [7,10,9,8] },
    { name: "Megillah", chapters: [11,6,6,10] },
    { name: "Moed Katan", chapters: [10,5,9] },
    { name: "Chagigah", chapters: [8,7,8] },

    // NASHIM
    { name: "Yevamot", chapters: [4,10,10,13,6,6,6,3,6,9,7,6,13,9,10,7] },
    { name: "Ketubot", chapters: [10,10,9,12,9,7,10,8,9,6,6,4,11] },
    { name: "Nedarim", chapters: [4,5,11,8,6,10,9,7,10,8,12] },
    { name: "Nazir", chapters: [7,10,7,7,7,11,4,2,5] },
    { name: "Sotah", chapters: [9,6,8,6,5,4,8,7,15] },
    { name: "Gittin", chapters: [6,7,8,9,9,7,9,10,10] },
    { name: "Kiddushin", chapters: [10,10,13,14] },

    // NEZIKIN
    { name: "Bava Kamma", chapters: [4,6,11,9,7,6,7,7,12,10] },
    { name: "Bava Metzia", chapters: [8,11,12,12,11,8,11,9,13,6] },
    { name: "Bava Batra", chapters: [6,14,8,9,11,8,4,8,10,8] },
    { name: "Sanhedrin", chapters: [6,5,8,5,5,6,11,7,6,6,6] },
    { name: "Makkot", chapters: [10,8,16] },
    { name: "Shevuot", chapters: [7,5,11,13,5,7,8,6] },
    { name: "Eduyot", chapters: [14,10,12,12,7,3,9,7] },
    { name: "Avodah Zarah", chapters: [9,7,10,12,12] },
    { name: "Avot", chapters: [18,16,18,22,23,11] }, 
    { name: "Horayot", chapters: [5,7,8] },

    // KODASHIM
    { name: "Zevachim", chapters: [4,5,6,6,8,7,6,12,7,8,8,6,8,10] },
    { name: "Menachot", chapters: [4,5,7,5,9,7,6,7,9,9,9,5,11] },
    { name: "Chullin", chapters: [7,10,7,7,5,7,6,6,8,4,2,5] },
    { name: "Bekhorot", chapters: [7,9,4,10,7,12,7,10,8] },
    { name: "Arakhin", chapters: [4,6,5,4,6,5,5,7,8] },
    { name: "Temurah", chapters: [6,3,5,4,6,5,6] },
    { name: "Keritot", chapters: [7,6,10,3,8,28] },
    { name: "Meilah", chapters: [4,9,8,6,5,5] },
    { name: "Tamid", chapters: [4,3,9,3,6,4,4] }, 
    { name: "Middot", chapters: [9,6,8,7,4] },
    { name: "Kinnim", chapters: [4,5,6] },

    // TAHAROT
    { name: "Kelim", chapters: [9,8,8,4,11,4,6,11,8,8,9,8,8,8,6,8,17,9,10,7,3,10,5,17,9,9,12,10,8,4] },
    { name: "Oholot", chapters: [8,7,7,3,7,7,6,6,16,7,9,8,6,7,10,5,5,10] },
    { name: "Negaim", chapters: [6,5,8,7,5,8,5,10,3,10,12,7,13,13] },
    { name: "Parah", chapters: [4,5,11,4,9,5,12,11,9,6,9,11] },
    { name: "Taharot", chapters: [9,8,8,13,9,10,9,9,9,7] },
    { name: "Mikvaot", chapters: [8,10,4,5,6,11,7,5,7,8] },
    { name: "Niddah", chapters: [7,7,7,7,9,14,5,4,10,8] },
    { name: "Makhshirin", chapters: [6,11,8,10,11,8] },
    { name: "Zavim", chapters: [6,4,3,7,12] },
    { name: "Tevul Yom", chapters: [5,8,6,7] },
    { name: "Yadayim", chapters: [5,4,2,8] },
    { name: "Uktzin", chapters: [6,10,12] }
];

// Flat index generation
export const FLAT_MISHNAH_INDEX: MishnahLocation[] = [];
let globalCounter = 0;

MISHNAH_DATA.forEach(masechet => {
    masechet.chapters.forEach((count, chapterIndex) => {
        for (let i = 1; i <= count; i++) {
            FLAT_MISHNAH_INDEX.push({
                name: masechet.name,
                chapter: chapterIndex + 1,
                mishnah: i,
                globalIndex: globalCounter++
            });
        }
    });
});

export const TOTAL_MISHNAYOT = FLAT_MISHNAH_INDEX.length;