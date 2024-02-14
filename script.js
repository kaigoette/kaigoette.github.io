//Get Repos with Pages
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.github.com/users/kaigoe/repos");
xhr.onload = function() {
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (Array.isArray(data)) {
            finishGettingData(data);
        } else {
            console.error("The JSON is no Array!");
        }
    } else {
        console.error("The Request failed");
    }
};

function finishGettingData(repos){
    let i;

    var reposWithPages = [];

    for (i = 0; i < repos.length; i++) {
        if (typeof repos[i].has_pages === "boolean" && repos[i].has_pages === true) {
            if(repos[i].name === "kaigoe.github.io") console.log("LOL")
            else reposWithPages.push(repos[i].name);
        }
    }
    console.log("ReposWithPages:")
    console.log(reposWithPages);

    var buttonsPages = document.getElementById("buttonsPages");

    for (i = 0; i < reposWithPages.length; i++) {
        const repoName = reposWithPages[i];

        // Erstelle einen Button
        const button = document.createElement("button");
        button.innerHTML = repoName; // Setze das Label des Buttons auf den Namen

        // Setze den Link des Buttons
        button.addEventListener("click", function() {
            window.location.href = "https://kaigoe.github.io/" + repoName;
        });

        // Füge den Button dem Container hinzu
        buttonsPages.appendChild(button);
    }

    var buttonsRepos = document.getElementById("buttonsRepos");

    for (i = 0; i < repos.length; i++) {
        const repoName = repos[i].name;

        // Erstelle einen Button
        const button = document.createElement("button");
        button.innerHTML = repoName; // Setze das Label des Buttons auf den Namen

        // Setze den Link des Buttons
        button.addEventListener("click", function() {
            window.location.href = "https://github.com/kaigoe/" + repoName;
        });

        // Füge den Button dem Container hinzu
        buttonsRepos.appendChild(button);
    }

}


xhr.send();