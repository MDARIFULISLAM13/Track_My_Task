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




// Hide Add new Task Part Again
document.getElementById("enter_input").addEventListener('click', function () {

    document.getElementById("input").style.visibility = "hidden";
    document.getElementById("input").style.height = "00px";

});














// Load saved data from local storage
let User_data = JSON.parse(localStorage.getItem("User_data")) || [];

// Display tasks on page load
displayTask();

document.getElementById("enter_input").addEventListener("click", function () {

    const taskText = document.getElementById("input_text").value;
    const dateTime = document.getElementById("datetime").value;

    // Check for empty inputs, invalid date/time, or timeLeft <= 0
    const endTime = new Date(dateTime).getTime();
    if (!taskText || !dateTime || isNaN(endTime) || endTime <= new Date().getTime()) {
        alert("Wrong input. Please fill in both fields with valid information and ensure the time is in the future.");

        // Hide the inputs if there is an error
        document.getElementById("input_text").style.display = "block";  // Show input field
        document.getElementById("datetime").style.display = "block";    // Show datetime field

        // Remove values from the input fields
        document.getElementById("input_text").value = "";
        document.getElementById("datetime").value = "";
        return;
    }

    // Clear input fields after successful validation
    document.getElementById("input_text").value = "";
    document.getElementById("datetime").value = "";
    const status_new = "Running";
    // Create a new task object
    const new_Task = {
        id: Date.now(), // Unique identifier
        date: dateTime,
        Task_name: taskText,
        task_status: status_new,
    };

    // Push the new task to the User_data array
    User_data.push(new_Task);

    // Save the updated User_data array in localStorage
    localStorage.setItem("User_data", JSON.stringify(User_data));

    // Call displayTask to show the updated list of tasks
    displayTask();
});

// Function to display all tasks sorted by time
function displayTask() {
    const list = document.getElementById("Tasklist");
    list.innerHTML = ""; // Clear existing list

    const now = new Date().getTime(); // Get current timestamp

    // Separate upcoming and expired events
    let upcomingEvents = [];
    let expiredEvents = [];

    User_data.forEach(entry => {
        const targetTime = new Date(entry.date).getTime();
        if (targetTime > now) {
            upcomingEvents.push(entry);
        } else {
            expiredEvents.push(entry);
        }
    });

    // Sort upcoming events by least time remaining
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Sort expired events by oldest first
    expiredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Combine upcoming and expired events
    const sortedCountdowns = [...upcomingEvents, ...expiredEvents];

    sortedCountdowns.forEach(entry => {
        const li = document.createElement("li");
        const targetTime = new Date(entry.date).getTime();

        // Create text span for event info
        const infoSpan = document.createElement("span");
        infoSpan.textContent = `Task: ${entry.Task_name}  -- Date: ${entry.date}  `;
        infoSpan.classList.add("task-info");
        infoSpan.style.color = "RED";
        li.appendChild(infoSpan);
        // Create a span element for task status
        const taskstatus = document.createElement("span"); // Create a span element
        taskstatus.textContent = `Status : ${entry.task_status}      ...`; // Set the status from new_Task object
        li.appendChild(taskstatus); // Append the status span to the list item

        // Create span for countdown timer
        const timeSpan = document.createElement("span");
        li.appendChild(timeSpan);



        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteCountdown(entry.id);
        li.appendChild(deleteBtn);


        list.appendChild(li); // Add list item to countdown list

        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = targetTime - now;

            if (timeLeft <= 0) {
                timeSpan.textContent = "Time's up!"; // Show expired message
                return;
            }

            // Calculate remaining time in days, hours, minutes, and seconds
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            timeSpan.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
        }

        updateCountdown(); // Initial update
        setInterval(updateCountdown, 1000); // Update every second
    });
}
// Function to delete a countdown event
// Function to delete a countdown event
function deleteCountdown(id) {

    let PassWord = 1234;
    const user_pass = prompt("Enter Password");

    if (PassWord == user_pass) {
        // Find the task in User_data and mark it as complete
        const task = User_data.find(entry => entry.id === id);
        if (task) {
            task.task_status = "Complete"; // Update the task status to "Complete"
            ;
            // Update User_data in localStorage
            localStorage.setItem("User_data", JSON.stringify(User_data));

            // Refresh the displayed task list
            displayTask();
        }
    } else {
        alert("Wrong Password");
    }







    // User_data = User_data.filter(entry => entry.id !== id); // Filter from User_data
    // localStorage.setItem("User_data", JSON.stringify(User_data)); // Update the localStorage
    displayTask(); // Refresh the displayed task list
}


// Initialize the countdown list on page load
displayTask();




