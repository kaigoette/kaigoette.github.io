//Request Repos with Pages
var personalRepoRequest = new XMLHttpRequest();
personalRepoRequest.open("GET", "https://api.github.com/users/kaigoe/repos");
personalRepoRequest.onload = function() {
    if (personalRepoRequest.status === 200) {
        var data = JSON.parse(personalRepoRequest.responseText);
        if (Array.isArray(data)) {
            processingRepoData(data);
        } else {
            console.error("The JSON is no Array!");
        }
    } else {
        console.error("The Request failed");
    }
};

//Request Organisations
var organisationRequest = new XMLHttpRequest();
organisationRequest.open("GET", "https://api.github.com/users/kaigoe/orgs");
organisationRequest.onload = function() {
    if (organisationRequest.status === 200) {
        var data = JSON.parse(organisationRequest.responseText);
        if (Array.isArray(data)) {
            processingOrganisationData(data);
        } else {
            console.error("The JSON is no Array!");
        }
    } else {
        console.error("The Request failed");
    }
};

//Send Requests
personalRepoRequest.send();
organisationRequest.send();

function processingRepoData(repos){
    let i;

    const buttonsPages = document.getElementById("buttonsPages");
    const buttonsRepos = document.getElementById("buttonsRepos");
    var reposWithPages = [];

    //fill reposWithPages with the names of the repos with pages
    for (i = 0; i < repos.length; i++) {
        if (typeof repos[i].has_pages === "boolean" && repos[i].has_pages === true) {
            if(repos[i].name === "kaigoe.github.io") null;
            else reposWithPages.push(repos[i].name);
        }
    }

    //display a button for all reposWithPages which links to its page
    for (i = 0; i < reposWithPages.length; i++) {
        const repoName = reposWithPages[i];

        // Erstelle einen Button
        const button = document.createElement("button");
        button.innerHTML = repoName; // Setze das Label des Buttons auf den Namen
        button.classList.add("buttons");
        // Setze den Link des Buttons
        button.addEventListener("click", function() {
            window.location.href = "https://kaigoe.github.io/" + repoName;
        });

        // Füge den Button dem Container hinzu
        buttonsPages.appendChild(button);
    }


    for (i = 0; i < repos.length; i++) {
        const repoName = repos[i].name;

        // Erstelle einen Button
        const button = document.createElement("button");
        button.innerHTML = repoName; // Setze das Label des Buttons auf den Namen
        button.classList.add("buttons");
        // Setze den Link des Buttons
        button.addEventListener("click", function() {
            window.location.href = "https://github.com/kaigoe/" + repoName;
        });

        // Füge den Button dem Container hinzu
        buttonsRepos.appendChild(button);
    }

}

function processingOrganisationData(orgas){
    const buttonsOrgas = document.getElementById("buttonsOrgas");

    for (let i = 0; i < orgas.length; i++) {
        const orgaName = orgas[i].login;
        const iconUrl = orgas[i].avatar_url;

        // Erstelle einen Button
        const orgaBox = document.createElement("a");
        const button = document.createElement("button");
        const icon = document.createElement("img");
        orgaBox.classList.add("orgaBox");
        orgaBox.href = "https://github.com/" + orgaName;
        icon.src = iconUrl;
        icon.classList.add("orgIcon")
        button.innerHTML = orgaName; // Setze das Label des Buttons auf den Namen
        button.classList.add("buttons");

        orgaBox.appendChild(icon);
        orgaBox.appendChild(button);

        // Füge den Button dem Container hinzu
        buttonsOrgas.appendChild(orgaBox);
    }

}