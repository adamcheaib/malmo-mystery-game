import {update_missions, mission_options} from "./missions.js";

export function detect_distance(position, map) {
    for (const statue in statues_data) {
        const distance = map.distance(position, [statues_data[statue].coordinates.latitude, statues_data[statue].coordinates.longitude]);
        if (distance <= 30) {
            update_missions("delete", {oldText: mission_options["none"]()});
            update_missions("post", {newText: mission_options["inZone"](statue)});
        }
    }
}