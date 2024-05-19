let current_missions = [];
export let mission_options =
    {
        none() {
            return "Gå in i en zon"
        },

        inZone() {
            return `Hitta statyn i zonen`
        },
        challenge(statue) {
            return `Lös ${statue}s utmaning`
        },

        finished() {
            return "Du klarade alla uppdrag!!"
        },

        final_update() {
            return "Du befriade alla spöken. Bra jobbat!"
        }
    }

export function update_missions(method, text) {
    const {newText = null, oldText = null} = text;

    if (method == "post") {
        if (current_missions.includes(newText)) return;
        current_missions.push(newText);
    }

    if (method == "delete") {
        let index = current_missions.findIndex(mission => mission == oldText);
        index !== -1 ? current_missions.splice(index, 1) : "";
    }

    if (method == "patch") {
        let index = current_missions.findIndex(mission => mission == oldText);
        index !== -1 ? current_missions[index] = newText : "";
    }

    if (method == "wipe") {
        current_missions = [];
    }

    // wipe and fill
    document.querySelector("#mission_board ul").innerHTML = "";
    for (const mission of current_missions) {
        document.querySelector("#mission_board ul").innerHTML += `<li>${mission}</li>`;
    }
}