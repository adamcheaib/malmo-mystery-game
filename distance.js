import { update_missions, mission_options } from "./missions.js";
import { statue_coords } from "/index.js";

export function testing (position, map) {
    for (const statue in statue_coords) {
        const distance = map.distance(position, [statue_coords[statue].latitude, statue_coords[statue].longitude]);
        if(distance <= 30) {
            console.log(distance);
            update_missions("delete", {oldText: mission_options["none"]()});
            update_missions("post", {newText: mission_options["inZone"](statue)});
        }
    }
}

