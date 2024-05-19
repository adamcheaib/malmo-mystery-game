"use strict"

/*
Mall för statyerna:
    {
        statue_id: int,
        statue_name: str,
        image: str,
        color: str,
        coordinates: {latitude: int, longitude: int},
        statue_challenges: [
            {
                phase: int,
                name: str,
                fullSize: bool
            },
            ...
        ],
        statue_dialogues: [
            {
                phase: int,
                dialogue_lines: [str, str, str...]
            }
        ]

    }

 */

export const all_statues_data =
    [
        {
            statue_id: 0,
            statue_name: "Gustav Adolf",
            image: "./media/karlxgustav.png",
            color: "#D48C8C",
            coordinates: {
                latitude: 55.60619668984432,
                longitude: 13.000168597537746
            },
            statue_challenges: [
                {
                    phase: 0,
                    game: false,
                    completed: false,

                    interacted: false
                },
                {
                    phase: 1,
                    name: "Spel",
                    iframe_src: "./games/horse_race/",
                    fullSize: true,
                    game: true,
                    completed: false,

                    interacted: false
                }
            ],
            statue_dialogues: [
                {
                    phase: 0,
                    dialogue_lines: [
                        "Jag var en gång en mäktig kung, nu fast mellan stenar och tid.",
                        "Vid min staty ska du söka, för att släppa mig fri.",
                        "Mitt namn är ett minne från en svunnen tid.",
                        "Vem är jag?"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        "Jag är Karl X Gustav, jag sitter på min ståtliga häst.",
                        "Mitt livs sista krig förlorade jag mot danskarna.",
                        "Min sista önskan är att vinna en gång för alla.",
                        "En hästkapplöpning mot mina fiender må bli min sista kamp.",
                        "Hurra på mig så att jag kan bli fri."
                    ]
                }
            ]
        },
        {
            statue_id: 1,
            statue_name: "Frans Suell",
            image: "./media/franssuell.png",
            color: "#dea279",
            coordinates: {
                latitude: 55.60755033894429,
                longitude: 12.998519697215286
            },
            statue_challenges: [
                {
                    phase: 0,
                    game: false,
                    completed: false,

                    interacted: false
                },
                {
                    phase: 1,
                    name: "Spel",
                    iframe_src: "./games/type_game/",
                    fullSize: true,
                    game: true,
                    completed: false,

                    interacted: false
                }
            ],
            statue_dialogues: [
                {
                    phase: 0,
                    dialogue_lines: [
                        "På Malmös gator står jag, en herre, stadig och stolt.",
                        "Med rockens veck och staven i min hand, vandrar mitt spöke.",
                        "Här vandrar mitt spöke, bundet till denna epok.",
                        "Sök mig där jag en gång satte min fot, bland minnen och tiders skatter.",
                        "Vem är jag?"
                    ],
                    challenge_attached: true
                },
                {
                    phase: 1,
                    dialogue_lines: [
                        "Jag är Frans Suell, en handelsman från förr.",
                        "Jag levde för längesen men vandrar än idag Malmös gator.",
                        "För länge sedan gjorde min inköpare ett grovt misstag.",
                        "I sin beställning fanns ett skrivfel och för mycket tobak blev köpt.",
                        "Bevisa för mig att dina kunskaper är bättre, så att jag må finna frid.",
                    ]
                }
            ]
        },
        {
            statue_id: 2,
            statue_name: "Pojke med gäss",
            image: "./media/gaspojke.png",
            color: "#93AE88",
            coordinates: {
                latitude: 55.602315039588795,
                longitude: 12.98734215319501
            },
            statue_challenges: [
                {
                    phase: 0,
                    game: false,
                    completed: false,

                    interacted: false
                },
                {
                    phase: 1,
                    name: "Spel",
                    iframe_src: "./games/rock_paper/",
                    fullSize: true,
                    game: true,
                    completed: false,

                    interacted: false
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
            image: "./media/katarakt.png",
            color: "#84a8b9",
            coordinates: {
                latitude: 55.60132802122993,
                longitude: 13.000414613334193
            },
            statue_challenges: [
                {
                    phase: 0,
                    game: false,
                    completed: false,

                    interacted: false
                },
                {
                    phase: 1,
                    name: "Spel",
                    iframe_src: "./games/mouse_game/",
                    fullSize: true,
                    game: true,
                    completed: false,

                    interacted: false
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
            image: "./media/tungsinnet.png",
            color: "#e9d1ae",
            coordinates: {
                latitude: 55.603156508261634,
                longitude: 13.00720665598558
            },
            statue_challenges: [
                {
                    phase: 0,
                    game: false,
                    completed: false,

                    interacted: false
                },
                {
                    phase: 1,
                    name: "Spel",
                    iframe_src: "./games/riddle_game/",
                    fullSize: true,
                    game: true,
                    completed: false,

                    interacted: false
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
            image: "./media/radjur.png",
            color: "#baa3b8",
            coordinates: {
                latitude: 55.604506066537596,
                longitude: 12.992848186072646
            },
            statue_challenges: [
                {
                    phase: 0,
                    game: false,
                    completed: false,

                    interacted: false
                },
                {
                    phase: 1,
                    name: "Spel",
                    iframe_src: "./games/deer_jump/",
                    fullSize: true,
                    game: true,
                    completed: false,

                    interacted: false
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
        }
    ]