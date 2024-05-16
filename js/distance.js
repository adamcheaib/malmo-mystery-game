import {update_missions, mission_options} from "./missions.js";
import {all_statues_data} from "../data/data.js";
import { game_progress } from "../index.js";


export function detect_distance(position, map, statue_coords, statue_id, name) {
    const distance = map.distance(position, [statue_coords.latitude, statue_coords.longitude]);

    // only look at relevant statue
    if(game_progress.current_statue && game_progress.current_statue !== statue_id) return; 
    // check if we exited the zone
    if(game_progress.current_statue && distance > 50) {game_progress.current_statue = null; localStorage.setItem("game_progress", JSON.stringify(game_progress)); update_missions("wipe"); update_missions("post", {newText: mission_options["none"]()});}

    const statue_data = all_statues_data.find(statue => statue.statue_id == statue_id);

    if(distance <= 20) {
        gettingCloser(20, 1);
    } else if (distance <= 50) {
        gettingCloser(50, 0);
    }


    function gettingCloser (distance, phase) {
        update_missions("wipe", {});
        distance == 50 ? update_missions("post", {newText: mission_options["inZone"]()}) : update_missions("post", {newText: mission_options["challenge"](name)});
    
        game_progress.current_statue = statue_id;
        game_progress.current_phase = phase;
        localStorage.setItem("game_progress", JSON.stringify(game_progress));
    
        document.getElementById("btn-interact").removeAttribute("disabled");
        if(!statue_data.statue_challenges[phase].interacted) document.getElementById("btn-interact").classList.add("blink");
    }
}