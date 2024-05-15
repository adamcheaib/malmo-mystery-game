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

if (!file_exists($file_name)) {
    sendJSON(["response" => "Något gick fel. Försök igen!"], 409);
}

set_db_busy($file_name, $temp_name);

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method != 'POST') {
    unset_db_busy($file_name, $temp_name);
    sendJSON(["response" => "Invalid request method!"], 405);
}

$data_recieved = json_decode(file_get_contents("php://input"), true);
$username = $data_recieved['username'];
$password = $data_recieved['password'];
$passwordRepeat = "";
$register = false;

if (isset($data_recieved['passwordRepeat'])) {
    $passwordRepeat = $data_recieved['passwordRepeat'];
    $register = true;
    if ($password != $passwordRepeat) {
        unset_db_busy($file_name, $temp_name);
        sendJSON(["response" => "Lösenorden måste matcha varandra!"], 400);
    }}

    if (strlen($username) <= 3 or strlen($password) <= 3) {
        unset_db_busy($file_name, $temp_name);
        sendJSON(["response" => "Användarnamnet och lösenordet kan inte vara kortare än 3 karaktärer!"], 400);
    }

    $full_db = json_decode(file_get_contents($temp_name), true);
    $user_state = "";

// Register section
    if ($register == true) {
        $new_user_id = 0;

        if (count($full_db) != 0) {
            foreach ($full_db as $user) {
                if ($user["username"] == $username) {
                    unset_db_busy($file_name, $temp_name);
                    sendJSON(["response" => "Användarnamnet finns redan!"], 400);
                }

                if ($new_user_id < $user['user_id']) {
                    $new_user_id = $user['user_id'];
                }
            }
        }

        $new_user_id = $new_user_id + 1;

        $new_user = [
            "username" => $username,
            "password" => $password,
            "user_id" => $new_user_id,
            "game_progress" => [
                "cleared_statues" => [],
                "current_statue" => 0,
                "current_phase" => 0,
                "dialogue_index" => 0
            ]
        ];

        $full_db[] = $new_user;
        file_put_contents($temp_name, json_encode($full_db, JSON_PRETTY_PRINT));
        unset_db_busy($file_name, $temp_name);
        sendJSON(["response" => "Användaren $username har skapats!"]);
    }

// Login section
    if ($register == false) {
        foreach ($full_db as $user) {
            if ($user["username"] == $username and $password == $user["password"]) {
                $user_data = [
                    "username" => $username,
                    "game_progress" => $user["game_progress"],
                    "user_id" => $user["user_id"],
                    "redirect" => "../"
                ];

                unset_db_busy($file_name, $temp_name);
                sendJSON(["user_info" => $user_data, "response" => "Du har loggat in som $username!"]);
                break;
            } else if ($user["username"] == $username and $password != $user["password"]) {
                unset_db_busy($file_name, $temp_name);
                sendJSON(["response" => "Fel lösenord!"], 400);
            }
        }
        unset_db_busy($file_name, $temp_name);
        sendJSON(["response" => "Användaren existerar inte. Skapa ett konto först!"], 404);
    }
?>