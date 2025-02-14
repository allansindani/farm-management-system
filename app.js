document.addEventListener("DOMContentLoaded", function () {
    let cows = JSON.parse(localStorage.getItem("cows")) || [];
    let milkRecords = JSON.parse(localStorage.getItem("milkRecords")) || [];
    let feedRecords = JSON.parse(localStorage.getItem("feedRecords")) || [];
    let costRecords = JSON.parse(localStorage.getItem("costRecords")) || [];

    const correctUsername = "admin";
    const correctPassword = "password123";

    if (localStorage.getItem("isLoggedIn") === "true") {
        showApp();
    }

    document.getElementById("login-btn").addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (username === correctUsername && password === correctPassword) {
            localStorage.setItem("isLoggedIn", "true");
            showApp();
        } else {
            alert("Incorrect login!");
        }
    });

    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        hideApp();
    });

    function showApp() {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
    }

    function hideApp() {
        document.getElementById("login-section").style.display = "block";
        document.getElementById("app-section").style.display = "none";
    }

    function saveData() {
        localStorage.setItem("cows", JSON.stringify(cows));
        localStorage.setItem("milkRecords", JSON.stringify(milkRecords));
        localStorage.setItem("feedRecords", JSON.stringify(feedRecords));
        localStorage.setItem("costRecords", JSON.stringify(costRecords));
    }

    document.getElementById("cow-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const cow = {
            id: cows.length + 1,
            name: document.getElementById("cow-name").value,
            breed: document.getElementById("breed").value,
            dob: document.getElementById("dob").value,
            weight: document.getElementById("weight").value
        };
        cows.push(cow);
        saveData();
        updateDropdowns();
        displayCows();
    });

    document.getElementById("milk-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const record = {
            cowId: document.getElementById("milk-cow-id").value,
            date: document.getElementById("milk-date").value,
            yield: document.getElementById("milk-yield").value
        };
        milkRecords.push(record);
        saveData();
        displayMilkRecords();
    });

    function updateDropdowns() {
        document.getElementById("milk-cow-id").innerHTML = cows.map(cow => 
            `<option value="${cow.id}">${cow.name}</option>`).join('');
    }

    function displayCows() {
        document.getElementById("cows-list").innerHTML = cows.map(cow => 
            `<div>${cow.name} - ${cow.breed} (${cow.dob})</div>`).join('');
    }

    function displayMilkRecords() {
        document.getElementById("milk-records-list").innerHTML = milkRecords.map(record => 
            `<div>Cow ${record.cowId} - ${record.date}: ${record.yield}L</div>`).join('');
    }

    updateDropdowns();
    displayCows();
    displayMilkRecords();
});
