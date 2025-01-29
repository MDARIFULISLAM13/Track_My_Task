//Access User_name & Password from local

pass = JSON.parse(localStorage.getItem("pass")) || "";
User_name = JSON.parse(localStorage.getItem("Name")) || "";

// Typing effect function
function typeText(text, elementId, delay) {
    const element = document.getElementById(elementId);
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(typeCharacter, delay);
        }
    }

    typeCharacter(); // Start typing
}

// Call the typing effect on page load

window.onload = function () {
    let text = "Hi, welcome here " + User_name;
    typeText(text, "welcome-text", 150); // Adjust delay (150ms per character) as needed
};


// Function to add a new Task
document.getElementById("Add_new_task").addEventListener('click', function () {

    document.getElementById("input").style.visibility = "visible";
    document.getElementById("input").style.height = "12vh";
    document.getElementById("input").style.width = "100vh";


});


// Load saved data from local storage
let User_data = JSON.parse(localStorage.getItem("User_data")) || [];

// Hide Add new Task Part Again
document.getElementById("enter_input").addEventListener('click', function () {

    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("input").style.height = "00px";

});


