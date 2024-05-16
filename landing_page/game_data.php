<?php

ini_set('display_errors', 1);

$file_name = "./db.json";
$temp_name = "./*db.json";

function sendJSON($response, $http_code = 200)
{
    header('Content-type: application/json');
    http_response_code($http_code);
    echo json_encode($response);
    exit();
}

function set_db_busy($file_name, $temp_name)
{
    rename($file_name, $temp_name);
}

function unset_db_busy($file_name, $temp_name)
{
    rename($temp_name, $file_name);
}

$request_method = $_SERVER['REQUEST_METHOD'];

if (!file_exists($file_name)) {
    sendJSON(["response" => "Något gick fel. Försök igen!"], 409);
}

set_db_busy($file_name, $temp_name);

if ($request_method != 'PATCH') {
    unset_db_busy($file_name, $temp_name);
    sendJSON(["response" => "Invalid request method."], 405);
}

$data_recieved = json_decode(file_get_contents('php://input'), true);
$user_id = $data_recieved['user_id'];
$game_progress = $data_recieved['game_progress'];

if ($user_id == null || $game_progress == null || $user_id == '') {
    unset_db_busy($file_name, $temp_name);
    sendJSON(["response" => "Missing key information in the request"], 400);
}

if (
    !isset($game_progress["cleared_statues"])
//     ||
//     !isset($game_progress["current_statue"])
//     ||
//     !isset($game_progress["current_phase"])
//     ||
//     !isset($game_progress["dialogue_index"])
) {
    unset_db_busy($file_name, $temp_name);
    sendJSON(["response" => "Missing key information from user game progress!"], 400);
}

$full_db = json_decode(file_get_contents($temp_name), true);

// Replaces the game progress for the individual player.
foreach ($full_db as $user_index => $user) {
    if ($user_id == $user['user_id']) {
        $game_progress["phase_index"] = 0;
        $game_progress["dialogue_index"] = 0;
        $full_db[$user_index]["game_progress"] = $game_progress;
        file_put_contents($temp_name, json_encode($full_db, JSON_PRETTY_PRINT));
        unset_db_busy($file_name, $temp_name);
        sendJSON(["response" => $user["game_progress"]]);
        break;
    }
}

unset_db_busy($file_name, $temp_name);
sendJSON(["response" => "User not found!"], 400);


?>