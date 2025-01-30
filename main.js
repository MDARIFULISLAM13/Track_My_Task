{
    //Access User_name & Password from local
    pass = JSON.parse(localStorage.getItem("pass")) || "";
    User_name = JSON.parse(localStorage.getItem("Name")) || "";
}


{
    //Reset Storing Data from local
    document.getElementById("reset").addEventListener("click", function () {

        const delete_user_name = prompt("Your Every Data will delete Parmentantly.If you want to Delete Everything,Inter Your Name")
        if (User_name == delete_user_name) {
            const delete_pass = prompt("Enter Your password");
            if (pass == delete_pass) {
                localStorage.clear();
                alert("Reset data Successfully");
                location.reload();
            }
            else {

                alert("Wrong Password");

            }
        }
        else {
            alert("Wrong Input");

        }
    });
}


{
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
}



{
    // Function to add a new Task
    document.getElementById("Add_new_task").addEventListener('click', function () {

        document.getElementById("input").style.visibility = "visible";
        document.getElementById("input").style.height = "12vh";
        document.getElementById("input").style.width = "100vh";
    });
}



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

    // Start Time adding
    const Start_time = new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    //format endtime
    const Last_timn = new Date(dateTime).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    let submit_ck = 0;
    const new_Task = {
        id: Date.now(), // Unique identifier
        date: dateTime,
        last_time: Last_timn,
        Start_time: Start_time,
        Task_name: taskText,
        task_status: status_new,
        submit_ck: submit_ck,
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
        infoSpan.textContent = `Task: ${entry.Task_name}  --End Date: ${entry.last_time}  `;
        infoSpan.classList.add("task-info");
        infoSpan.style.color = "RED";
        li.appendChild(infoSpan);
        // show start time
        const task_Start_time = document.createElement("span"); // Create a span element
        task_Start_time.textContent = `Start Time : ${entry.Start_time}  ...`; // Set the status from new_Task object
        li.appendChild(task_Start_time);

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

                entry.task_status = "UnComplete";
                timeSpan.textContent = "Time's up"; // Show expired message
                localStorage.setItem("User_data", JSON.stringify(User_data));

                return;

            }
            else if (entry.task_status == "Complete") {


                timeSpan.textContent = "00 00";
                // timeSpan.textContent = "Time'00000000s up"; // Show expired message
                localStorage.setItem("User_data", JSON.stringify(User_data));

                return;
            }

            // Calculate remaining time in days, hours, minutes, and seconds
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            timeSpan.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
        }

        // Create a variable to hold the interval ID
        // Function to update countdown

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

            // Update User_data in localStorage
            localStorage.setItem("User_data", JSON.stringify(User_data));
            // updateCountdown()
            // Refresh the displayed task list
            displayTask();
        }
    } else {
        alert("Wrong Password");
    }

    displayTask(); // Refresh the displayed task list
}

// Initialize the countdown list on page load
displayTask();











