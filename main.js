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

