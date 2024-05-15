import {update_missions, mission_options} from "./missions.js";
import {all_statues_data} from "../data/data.js";
import { game_progress } from "../index.js";

// export function detect_distance(position, map) {
//     for (const statue in all_statues_data) {
//         const distance = map.distance(position, [all_statues_data[statue].coordinates.latitude, all_statues_data[statue].coordinates.longitude]);
//         if (distance <= 30) {
//             update_missions("delete", {oldText: mission_options["none"]()});
//             update_missions("post", {newText: mission_options["inZone"](statue)});
//         }
//     }
// }
export function detect_distance(position, map, statue_coords, statue_id, name) {
    const distance = map.distance(position, [statue_coords.latitude, statue_coords.longitude]);
    // if (name == "Test") console.log(distance);

    if(distance <= 50) {
        update_missions("delete", {oldText: mission_options["none"]()});
        update_missions("post", {newText: mission_options["inZone"]()});

        game_progress.current_statue = statue_id;
        game_progress.current_phase = 0;
        localStorage.setItem("game_progress", JSON.stringify(game_progress));

        document.getElementById("btn-interact").classList.add("blink");
        // console.log(game_progress);
    }

    if (distance <= 20) {
        const statue = all_statues_data.find(statue => statue["statue_id"] == statue_id);

        update_missions("delete", {oldText: mission_options["inZone"]("statue")});
        update_missions("post", {newText: mission_options["challenge"](statue["statue_name"])});

        document.getElementById("btn-interact").classList.add("blink");

        // game_progress.current_statue = statue_id;
        // game_progress.current_phase = 1;
        // localStorage.setItem("game_progress", JSON.stringify(game_progress));
    }
}