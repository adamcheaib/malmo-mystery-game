"use strict"

const statue_coords =
    {
        adolf: {latitude: 55.606749499890064, longitude: 13.000073510709273, color: "red"},
        gass: {latitude: 55.602315039588795, longitude: 12.98734215319501, color: "green"},
        katt: {latitude: 55.60132802122993, longitude: 13.000414613334193, color: "blue"},
        tungsinnet: {latitude: 55.603156508261634, longitude: 13.00720665598558, color: "yellow"},
        frans: {latitude: 55.607391899774534, longitude: 12.99839459721525, color: "orange"},
        radjur: {latitude: 55.60371767788408, longitude: 12.992158258580288, color: "purple"},
    }

let state = {
    cleared_statues: [0], // När man ska interagera med en staty, så kontrolleras den först om den är avklarad.
    current_statue: 0,
    current_phase: 0,
    dialogue_index: 0
}

const statues_data =
    [
        {
            statue_id: 0,
            image: "PATH HERE",
            statue_name: "Gustav Adolf",
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
                    listener: "trigger_tictactoe", // <-- Ska vara en funktion som triggar spelet.
                },
                {
                    phase: 1,
                    name: "Fisk gåtan",
                    game: false,
                    riddle: true,
                    location_based: false,
                    question: "Vilken typ av fisk använder man när man grillar lax?",
                    answer: "Lax",
                    listener: "trigger_riddle", // <-- Ska vara en funktion som triggar gåtan.
                },
                {
                    phase: 1,
                    name: "Hitta Spanaren",
                    game: false,
                    riddle: true,
                    location_based: true,
                    listener: "trigger_find_lion", // <-- Ska vara en funktion som triggar platsgåtan
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
                    ]
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