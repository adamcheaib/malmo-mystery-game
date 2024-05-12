import {update_missions, mission_options} from "./missions.js";
import {all_statues_data} from "../data/data.js";

// export function detect_distance(position, map) {
//     for (const statue in all_statues_data) {
//         const distance = map.distance(position, [all_statues_data[statue].coordinates.latitude, all_statues_data[statue].coordinates.longitude]);
//         if (distance <= 30) {
//             update_missions("delete", {oldText: mission_options["none"]()});
//             update_missions("post", {newText: mission_options["inZone"](statue)});
//         }
//     }
// }
export function detect_distance(position, map, statue) {
    const distance = map.distance(position, [statue.latitude, statue.longitude]);
    if (distance <= 30) {
        update_missions("delete", {oldText: mission_options["none"]()});
        update_missions("post", {newText: mission_options["inZone"]("statue")});
    }
}