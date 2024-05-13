"use strict"

export const all_statues_data =
    [
        {
            statue_id: 0,
            statue_name: "Gustav Adolf",
            image: "PATH HERE",
            color: "#D48C8C",
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
                    iframe_src: "./games/kuk/",
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
                    phase: 2,
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
            color: "#dea279",
            coordinates: {
                latitude: 55.60755033894429, 
                longitude: 12.998519697215286
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/mouse_game/",
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
        {
            statue_id: 2,
            statue_name: "Pojke med gäss",
            image: "PATH HERE",
            color: "#93AE88",
            coordinates: {
                latitude: 55.602315039588795,
                longitude: 12.98734215319501
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/mouse_game/",
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
                        "I Slottsparkens lummiga vrå, där lugnet råder och naturen står i full blom möter du mig,",
                        "en pojke i evig lek med sina fjäderklädda vänner.",
                        "Mitt hjärta och min själ är bundna till denna plats av ro.",
                        "Följ stigarna där gässen samlas vid vattnets rand, och där lekens echo ljuder.",
                        "Vem kan jag vara?"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        // finns inte i dokumentet så jag bara skriver nåt
                        "Jag är pojken med gäss. Min önskan är att gässen ska bli besegrade.",
                        "Jag är en riktigt dålig förlorare men lyckas aldrig få en vinst.",
                        "Gässen omkring mig vinner varenda gång, men nu ska de få på nöten!",
                        "Vinn mot alla tre gäss i en lek för att befria min själ."
                    ]
                }
            ]
        },
        {
            statue_id: 3,
            statue_name: "Katarkt",
            image: "PATH HERE",
            color: "#84a8b9",
            coordinates: {
                latitude: 55.60132802122993,
                longitude: 13.000414613334193
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/mouse_game/",
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
                        "Vid kanalens svala kant, där tiden står still, vilar jag.",
                        "Med ögon som glimmar av vatten och hemligheter, håller mitt spöke vakt.",
                        "Följ strömmens viskningar och sök där ljuset dansar med skuggorna.",
                        "Min närvaro är nyckeln till att bryta ensamhetens bojor.",
                        "Vem är jag?"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        // finns inte i dokumentet så jag bara skriver nåt
                        "Jag är Katarakt, en väktare av kanalen.",
                        "Min dödsorsak var drunknande när jag försökte fånga fisk.", 
                        "Min hunger har aldrig avlidigt, jag vill att den ska avta.",
                        "Om du fångar föda till mig blir jag mätt och belåten."
                    ]
                }
            ]
        },
        {
            statue_id: 4,
            statue_name: "Tungsinnet",
            image: "PATH HERE",
            color: "#e9d1ae",
            coordinates: {
                latitude: 55.603156508261634,
                longitude: 13.00720665598558
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/mouse_game/",
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
                        "Jag står här i Malmös hjärta, vid sten och strand.",
                        "En man med tårar som flödar fritt, sorg i blicken och hjärta av sten.",
                        "Mitt spöke är fångat i detta tunga öde.",
                        "Vem är jag?"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        "Jag kallas för tungsinnet, bunden till mina egna sorger och bekymmer.",
                        "Mitt hjärta är tyngd av olycka från fångenskap, sätt min ande fri från dessa osynliga bojor.", 
                        "Hjälp mig att finna föremålet som gav mig tröst och hopp, mitt ljuset i mörkret.",
                    ]
                }
            ]
        },
        {
            statue_id: 5,
            statue_name: "Diana",
            image: "PATH HERE",
            color: "#baa3b8",
            coordinates: {
                latitude: 55.60371767788408,
                longitude: 12.992158258580288
            },
            statue_challenges: [
                {
                    phase: 0,
                    name: "Skriv Spelet",
                    game: true,
                    riddle: false,
                    location_based: false,
                    iframe_src: "./games/mouse_game/",
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
                        "I Kungsparkens grönskande glans, där svanar dansar under månadens krans.",
                        "Sök mig där skogens melodier ekar klart och rådjurens viskningar färdas.",
                        "Vid en fridfyll knytpunkt, beskyddad av rävar, grävlingar och björnar.",
                        "Vem är jag?"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        "Jag är Diana, naturens väktare.",
                        "Jag är alla djuren i parken, vindarnas sus och dagsstjärnans ljus.", 
                        "Mitt hjärta slår i takt med naturens pulsslag, men min själ är fångad.",
                        "Hjälp mig till parkens hjärta där jag kan vila i frid."
                    ]
                }
            ]
        },

    ]