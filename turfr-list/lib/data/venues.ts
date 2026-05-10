
export const VENUES = {
    "cp_goenka": {
        name: "CP Goenka International School Turf",
        shortName: "CP Goenka",
        address: "Sec 5, Ulwe"
    },

    "fr_agnels" : {
        name: "Fr. Agnel Astroturf",
        shortName: "Fr Agnel's",
        address: "Sec 9, Vashi"
    },

    "gurukul" : {
        name: "MAEER's MIT PUNE's Vishwashanti Gurukul School",
        shortName: "Gurukul",
        address: "Sec 23, Ulwe"
    },
    "nr_bhagat" : {
        name: "NR Bhagat College",
        shortName: "NR Bhagat",
        address: "Sec 12, Nerul W"
    },

    "sng" : {
        name: "Sree Narayana Guru International School",
        shortName: "SNG",
        address: "Sec 21, Ulwe"
    },

    "terna" : {
        name: "Terna College Turf",
        shortName: "Terna",
        address: "Sec 18, Ulwe"
    },

    "yashwantrao" : {
        name : "Yashwantrao Chavan Ground",
        shortName: "Yashwantrao",
        address: "Sec 19A, Nerul E"
    },
} as const;

export type VenueId = keyof typeof VENUES;