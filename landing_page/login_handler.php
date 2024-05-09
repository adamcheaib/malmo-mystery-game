<?php

ini_set('display_errors', 1);

function sendJSON($response, $http_code = 200)
{
    header('Content-type: application/json');
    http_response_code($http_code);
    echo json_encode($response);
    exit();
}

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method != 'POST') {
    sendJSON(["response" => "Invalid request method!"], 405);
}

$data_recieved = json_decode(file_get_contents("php://input"), true);
$username = $data_recieved['username'];
$password = $data_recieved['password'];
$repeatPassword = "";
$register = false;

if (isset($data_recieved['repeatPassword'])) {
    $repeatPassword = $data_recieved['repeatPassword'];
    $register = true;
    if ($password != $repeatPassword) sendJSON(["response" => "Lösenorden måste matcha varandra!"], 400);
}

if (strlen($username) <= 3 or strlen($password) <= 3) {
    sendJSON(["response" => "Användarnamnet och lösenordet kan inte vara kortare än 3 karaktärer!"], 400);
}

$full_db = json_decode(file_get_contents("db.json"), true);
$user_state = "";

// Register section
if ($register == true) {
    $new_user_id = 0;

    if (count($full_db) != 0) {
        foreach ($full_db as $user) {
            if ($user["username"] == $username) sendJSON(["response" => "Username already exists!"], 400);
            if ($new_user_id < $user['id']) {
                $new_user_id = $user['id'];
                break;
            }
        }
    }

    $new_user_id = $new_user_id + 1;

    $new_user = [
        "username" => $username,
        "password" => $password,
        "id" => $new_user_id,
        "game_progress" => [
            "cleared_statues" => [],
            "current_statue" => 0,
            "current_phase" => 0,
            "dialogue_index" => 0
        ]
    ];

    $full_db[] = $new_user;
    file_put_contents("db.json", json_encode($full_db, JSON_PRETTY_PRINT));
    sendJSON(["username" => $username, "user_id" => $new_user_id]);
}

// Login section
if ($register == false) {
    foreach ($full_db as $user) {
        if ($user["username"] == $username and $password == $user["password"]) {
            $user_data = [
                "username" => $username,
                "game_progress" => $user["game_progress"],
                "user_id" => $user["id"],
                "redirect" => "../"
            ];

            sendJSON($user_data);
            break;
        }
    }
    sendJSON(["response" => "Användaren existerar inte. Skapa ett konto först!"], 400);
}
?>