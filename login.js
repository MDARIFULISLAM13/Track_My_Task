let pass = JSON.parse(localStorage.getItem("pass")) || "";
// take password form user first time
while (!pass || pass.length < 4) {
    pass = prompt("Create a password for your next login. Please note, if you forget this password, you will not be able to recover it and will lose all your data. The password must be at least 4 digits.");
    if (pass && pass.length >= 4) {
        localStorage.setItem("pass", JSON.stringify(pass));
    }
}


pass = JSON.parse(localStorage.getItem("pass")) || "";


// Check password for log in
document.getElementById("inter_pass").addEventListener("click", function () {
    const password = document.getElementById("password").value;
    if (password == pass) {
        window.location.href = "main.html";
    }
    else {
        alert("Wrong Password");
        document.getElementById("password").value = "";
    }

});

