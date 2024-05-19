"use strict"

// Clears the local storage in order to avoid any conflicts with keys from the other games.
window.localStorage.clear();


// Store the original HTML structure
const originalTitle = document.getElementById('title').innerHTML;
const originalDescription = document.getElementById('description').innerHTML;
const originalLoginForm = document.getElementById('login_form').outerHTML;

const pages = [
    {
        name: "problem",
        title: "Problem",
        innerHTML: 
            '<a href="./?pages=guide">Vet du inte hur man spelar? Tryck här för att komma till guiden.</a>' + 
            "<p>Om appen inte funkar, prova något av dessa tips:</p>" +
            "<ol>" +
            "    <li>Försäkra att du accepterat att dela platsinfo. Kolla i inställningarna för din webbläsare, för webbsidan och i din telefons inställningar. Om du inte tillåter att din plats används så kommer spelet inte fungera.</li>\n" +
            "    <li>Byta webbläsare. Om din default webbläsare inte fungerar så finns andra att ladda ner, t.ex. firefox, chrome, brave osv. Om en av dem har problem brukar det oftast fungera på en annan. All din spelinformation är sparad i din användare, så det är ingen fara om du byter webbläsare mitt i spelandet!</li>\n" +
            "    <li>Töm din cache. Ibland kan felaktig data sparats i din cache, prova att helt rensa ut den för webbsidan.</li>\n" +
            "    <li>Gå utomhus. Din live location har svårare att uppdateras inomhus, om du är utomhus är den mer precis. Hela spelet är ändå gjord för att spelas i utomhus miljö!</li>\n" +
            "    <li>Om inget annat funkar, prova med någon annans mobil. Ibland vill vissa mobiler inte sammarbeta. Om du spelar i grupp, prova att använda någon annans mobil. Eftersom din speldata är sparad i din användare behöver du bara logga in på sidan igen och så förlorar du ingen värdefull speltid!</li>\n" +
            "</ol>"
    },
    {
        name: "spelguide",
        title: "Spelguide",
        innerHTML: 
        '<a href="./?pages=help">Har något gått fel? Tryck här för problemhantering.</a>' + 
        '<p>Välkommen till spelguiden. Här hittar du all information du behöver för att komma igång med spelet och lösa mysterierna i Malmö.</p>' +
        '<p>I Malmö Mysteriet har du uppdraget att befria spöken från jorden. Det finns 6 stycken spöken som fortfarande är fast i de levandes värld på grund av ofullbordade önskningar; din uppgift är att uppfylla önskningarna och befria spökena! Varje spöke är bebodda i varsin staty som du måste hitta innan du kan prata med spöket. Hitta alla 6, lös deras gåtor och uppfyll deras utmaningar.</p>' +
        '<p>Varje spöke följer samma rutin, vänligen läs instruktionerna för att få en basic guide av hur spelet fungerar:</p>' +
        '<ol>' +
            '<li>Olika zoner finns markerade på kartan, inuti varje zon finns en staty, därmed också ett spöke. Gå in i en av zonerna för att påbörja ett spökes uppdrag.</li>' +
            '<li>När du stigit in i en zon kommer du få en gåta av spöket. Denna gåta fungerar som en ledtråd för att hitta statyn som spöket finns inuti. Du får åtkomst till gåtan genom att trycka på pratbubblan som aktiveras när du befinner dig inuti en zon.</li>' +
            '<li>När du tagit dig närmre statyn kommer dialogen ändras, tryck ännu en gång på pratbubblan för att ta del av den nya texten. Denna gång kommer du även presenteras ett relevant spel.</li>' +
            '<li>Du måste vinna spelet för att befria spöket och ge den frid. När du gjort det är zonen avklarad.</li>' +
            '<li>Upprepa processen för varje markerad zon, när du klarat av alla har du vunnit spelet!</li>' +
        '</ol>' +
        '<p>Kortare instruktioner, för den som har bråttom:</p>' +
        '<ol>' +
            '<li>Gå in i en av zonerna som finns på kartan.</li>' +
            '<li>Tryck på pratbubblan när du är inne i en zon för en ledtråd.</li>' +
            '<li>Tryck ännu en gång på pratbubblan när du hittat statyn.</li>' +
            '<li>Klara av minispelet.</li>' +
            '<li>Gå in i nästa zon för att upprepa processen.</li>' +
        '</ol>' +
        '<p>Om du får problem under spelets gång, vänligen läs sektionen om problemhantering. Medans du spelar finns det ett frågetecken symbol som du närsomhelst kan trycka på för att öppna upp instruktionerna i en ny flik.</p>' +
        '<p>Ha kul!</p>'
    }
];


if (window.location.href.includes("help")) {
    document.getElementById("title").textContent = pages[0].title;
    document.getElementById("description").innerHTML = pages[0].innerHTML;
    document.getElementById("login_form").style.display = "none";
} else if (window.location.href.includes("guide")) {
    document.getElementById("title").textContent = pages[1].title;
    document.getElementById("description").innerHTML = pages[1].innerHTML;
    document.getElementById("login_form").style.display = "none";
}

const hamburger_btn = document.getElementById("hamburger_menu");
const form = document.querySelector("form");
const log_to_reg = document.getElementById("switch_log_reg");

hamburger_btn.onclick = load_phone_menu;
log_to_reg.onclick = toggle_log_reg;
form.onsubmit = submit_func;


function load_phone_menu(event) {
    event.target.style.pointerEvents = "none";
    const container = document.createElement("div");
    const menu_btns_container = document.createElement("div");
    const close_space = document.createElement("div");

    container.id = "hamburger_menu_shown";
    menu_btns_container.id = "menu_btns_container";
    close_space.id = "hamburger_menu_close";

    menu_btns_container.innerHTML = `
        <h3 style="color: white; border-bottom: solid 1px white">Meny</h3>
        <div class="menu_btn" id="home_btn">Hem</div>
        <div class="menu_btn" id="guide_btn">Spelguide</div>
        <div class="menu_btn" id="problem_btn">Problem?</div>`;

    container.appendChild(menu_btns_container);
    container.appendChild(close_space);

    document.body.prepend(container);
    close_space.onclick = () => container.remove();

    setTimeout(() => {
        container.style.left = "50%"
    }, 30);
    setTimeout(() => {
        close_space.style.opacity = "1";
    }, 230);

    setTimeout(() => {
        event.target.style.pointerEvents = "all"
    }, 400);

    document.getElementById('home_btn').addEventListener('click', () => {
        document.getElementById('title').innerHTML = originalTitle;
        document.getElementById('description').innerHTML = originalDescription;
        document.getElementById('login_form').outerHTML = originalLoginForm;
        container.remove();
    });

    document.getElementById('guide_btn').addEventListener('click', () => {
        document.getElementById('title').innerHTML = 'SPELGUIDE';
        document.getElementById('description').innerHTML = pages[1].innerHTML;
        document.getElementById('login_form').style.display = 'none';
        container.remove();
    });

    document.getElementById('problem_btn').addEventListener('click', () => {
        document.getElementById('title').innerHTML = 'PROBLEM';
        document.getElementById('description').innerHTML = pages[0].innerHTML;
        document.getElementById('login_form').style.display = 'none';
        container.remove();
    });
}

// Toggle fetch here when attempting to register or login.
function toggle_log_reg(event) {
    event.preventDefault();
    event.target.classList.toggle("login");
    event.target.classList.toggle("register");

    const btn_submit = document.getElementById("submit");
    const inpt_passwordRepeat = document.getElementById("passwordRepeat");
    const form_title = document.getElementById("form_title");
    const switch_log_reg = document.getElementById("switch_log_reg");
    const form = document.querySelector("form");
    const notification = document.getElementById("notification");

    inpt_passwordRepeat.classList.toggle("hidden");
    notification.textContent = "";

    if (event.target.classList.contains("login")) {
        btn_submit.textContent = "Logga in";
        form_title.textContent = "INLOGGNING";
        switch_log_reg.textContent = "Skapa konto!";
        form.id = "login_form";
    } else {
        btn_submit.textContent = "Registrera"
        form_title.textContent = "REGISTRERING";
        switch_log_reg.textContent = "Klicka för att logga in!";
        form.id = "register_form";
    }
}

// Toggle fetch here when attempting to register or login.
async function submit_func(event) {
    event.preventDefault();
    const notification = document.getElementById("notification");
    const request_body = {};

    // Selects all the input elements that do not have the class "hidden".
    const all_inputs = document.querySelectorAll("input:not(.hidden)");
    all_inputs.forEach(inputField => request_body[inputField.getAttribute("name")] = inputField.value);

    request_body.username = request_body.username.toLowerCase();

    const options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(request_body)
    }

    const response = await fetch("./login_handler.php", options);
    const resource = await response.json();
    notification.textContent = resource.response;
    console.log(response);

    if (response.ok) {
        notification.className = "success";
        const user_info = resource.user_info;
        user_info.game_progress.current_statue = null;

        // Controls whether the user is attempting to login.
        if (user_info !== undefined) {
            for (let key in user_info) {
                if (key !== "redirect") {
                    if (typeof user_info[key] === "object") {
                        window.localStorage.setItem(key, JSON.stringify(user_info[key]));
                    } else {
                        window.localStorage.setItem(key, user_info[key]);
                    }
                }
            }
            window.localStorage.setItem("game_code", "1405");
            window.location.href = user_info.redirect;
            // console.log(user_info.redirect);
        }
    } else {
        notification.className = "error";

        if (response.status === 409) {
            setTimeout(() => {
                submit_func(event);
            }, 1500)
        }
    }
}