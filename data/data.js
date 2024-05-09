"use strict"

export let state = {
    cleared_statues: [], // När man ska interagera med en staty, så kontrolleras den först om den är avklarad.
    current_statue: 1,
    current_phase: 0,
    dialogue_index: 0
}

export const all_statues_data =
    [
        {
            statue_id: 0,
            statue_name: "Gustav Adolf",
            image: "PATH HERE",
            color: "red",
            coordinates: {
                latitude: 55.606749499890064,
                longitude: 13.000073510709273
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/type_game/",
                    challenge_attached: true
                },
                {
                    phase: 1,
                    name: "Fisk gåtan",
                    game: false,
                    riddle: true,
                    location_based: false,
                    question: "Vilken typ av fisk använder man när man grillar lax?",
                    answer: "Lax",
                },
                {
                    phase: 1,
                    name: "Hitta Spanaren",
                    game: false,
                    riddle: true,
                    location_based: true,
                    riddle_coordinates: {
                        latitude: 0, // Uppdatera dessa
                        longitude: 0 // Uppdatera dessa
                    }
                }
            ],
            statue_dialogues: [
                {
                    phase: 0,
                    dialogue_lines: [
                        "Du där din äckliga gris!",
                        "Du luktar skit!",
                        "Åk hem till ditt hemland igen invandrarjävel!"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        "Tack för att du räddade Svea-riket från arab-jävlarna!",
                        "Ditt nästa steg är att döda alla danskar!"
                    ]
                }
            ]
        },
        {
            statue_id: 1,
            statue_name: "Frans Suell",
            image: "PATH HERE",
            color: "orange",
            coordinates: {
                latitude: 55.606749499890064,
                longitude: 13.000073510709273
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/deer_jump/",
                    fullSize: true,
                    completed: false
                },
                {
                    phase: 1,
                    name: "Fisk gåtan",
                    game: false,
                    riddle: true,
                    location_based: false,
                    question: "Vilken typ av fisk använder man när man grillar lax?",
                    answer: "Lax",
                    completed: false
                },
                {
                    phase: 2,
                    name: "Hitta Skattet",
                    game: false,
                    riddle: true,
                    location_based: true,
                    riddle_coordinates: [
                        {
                            name: "mask",
                            latitude: 0, // Uppdatera dessa
                            longitude: 0, // Uppdatera dessa
                            found: false
                        },
                        {
                            name: "mask",
                            latitude: 0, // Uppdatera dessa
                            longitude: 0, // Uppdatera dessa
                            found: false,
                        },
                    ]
                    ,
                    completed: false
                }
            ],
            statue_dialogues: [
                {
                    phase: 0,
                    dialogue_lines: [
                        "Jag heter Frans Suell!",
                        "Jag köpte tobak från USA för inte så längesen...!",
                        "Jag råkade köpa för mycket på grund av min inköpare som är dum!",
                        "Därför vill jag testa din skrivkunskaper innan du får prata med mig!"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        "Tack för att du räddade Svea-riket från arab-jävlarna!",
                        "Ditt nästa steg är att döda alla danskar!"
                    ]
                }
            ]
        },

    ]