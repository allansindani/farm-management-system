document.addEventListener("DOMContentLoaded", function () {
    let cows = JSON.parse(localStorage.getItem("cows")) || [];
    let milkRecords = JSON.parse(localStorage.getItem("milkRecords")) || [];
    
    const cowForm = document.getElementById("cow-form");
    const milkForm = document.getElementById("milk-form");
    const cowsList = document.getElementById("cows-list");
    const milkRecordsList = document.getElementById("milk-records-list");

    // Preset username and password
    const correctUsername = "admin";
    const correctPassword = "password123";

    // Check if user is already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        showApp();
    }

    // Login Functionality
    document.getElementById("login-btn").addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Debugging log
        console.log("Login Attempt:", username, password); 
        
        if (username === correctUsername && password === correctPassword) {
            localStorage.setItem("isLoggedIn", "true");
            showApp();
        } else {
            alert("Incorrect username or password!");
            console.log("Login failed!"); // Debug log
        }
    });

    // Logout Functionality
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        hideApp();
    });

    function showApp() {
        console.log("Login successful! Showing app...");
        document.getElementById("login-section").style.display = "none";
        document.getElementById("app-section").style.display = "block";
    }

    function hideApp() {
        console.log("Logged out! Hiding app...");
        document.getElementById("login-section").style.display = "block";
        document.getElementById("app-section").style.display = "none";
    }

    // Save data to LocalStorage
    function saveData() {
        localStorage.setItem("cows", JSON.stringify(cows));
        localStorage.setItem("milkRecords", JSON.stringify(milkRecords));
    }

    // Add Cow Form
    cowForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const cowName = document.getElementById("cow-name").value;
        const breed = document.getElementById("breed").value;
        const dob = document.getElementById("dob").value;
        const weight = document.getElementById("weight").value;

        const cow = { id: cows.length + 1, name: cowName, breed, dob, weight };
        cows.push(cow);
        saveData();
        displayCows();
        updateDropdowns();
        cowForm.reset();
    });

    // Display Cow List
    function displayCows() {
        cowsList.innerHTML = "";
        cows.forEach((cow, index) => {
            const cowDiv = document.createElement("div");
            cowDiv.classList.add("record");
            cowDiv.innerHTML = `${cow.name} - ${cow.breed} (${cow.dob})
                <button onclick="deleteCow(${index})">Delete</button>`;
            cowsList.appendChild(cowDiv);
        });
    }

    // Delete Cow
    function deleteCow(index) {
        cows.splice(index, 1);
        saveData();
        displayCows();
        updateDropdowns();
    }

    // Add Milk Production Record
    milkForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const cowId = document.getElementById("milk-cow-id").value;
        const milkDate = document.getElementById("milk-date").value;
        const milkYield = document.getElementById("milk-yield-record").value;

        const record = { cowId, milkDate, milkYield };
        milkRecords.push(record);
        saveData();
        displayMilkRecords();
    });

    // Display Milk Records
    function displayMilkRecords() {
        milkRecordsList.innerHTML = "";
        milkRecords.forEach(record => {
            const milkDiv = document.createElement("div");
            milkDiv.classList.add("record");
            milkDiv.innerHTML = `Cow ${record.cowId} - ${record.milkDate}: ${record.milkYield}L`;
            milkRecordsList.appendChild(milkDiv);
        });
    }

    // Update Milk Dropdown
    function updateDropdowns() {
        document.getElementById("milk-cow-id").innerHTML = cows.map(cow => 
            `<option value="${cow.id}">${cow.name}</option>`
        ).join('');
    }

    // Display Initial Data
    displayCows();
    displayMilkRecords();
    updateDropdowns();
});
