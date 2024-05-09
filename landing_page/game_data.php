<?php

function sendJSON($response, $http_code = 200)
{
    header('Content-type: application/json');
    http_response_code($http_code);
    echo json_encode($response);
    exit();
}

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method != 'POST') {
    sendJSON(["response" => "Invalid request method."], 405);
}

$data_recieved = json_decode(file_get_contents('php://input'), true);
$user_id = $data_recieved['user_id'];
$game_progress = $data_recieved['game_progress'];

if ($user_id == null || $game_progress == null || $user_id == '') {
    sendJSON(["response" => "Missing key information in the request"], 400);
}

if (
    !isset($game_progress["cleared_statues"])
    ||
    !isset($game_progress["current_statue"])
    ||
    !isset($game_progress["current_phase"])
    ||
    !isset($game_progress["dialogue_index"])
) {
    sendJSON(["response" => "Missing key information from user game progress!"], 400);
}

$full_db = json_decode(file_get_contents('./db.json'), true);


// Replaces the game progress for individual player.
foreach ($full_db as $user_index => $user) {
    if ($user_id == $user['user_id']) {
        $full_db[$user_index]["game_progress"] = $game_progress;
        file_put_contents("./db.json", json_encode($full_db, JSON_PRETTY_PRINT));
        sendJSON(["response" => $full_db]);
        break;
    }
}

sendJSON(["response" => "User not found!"], 400);


?>