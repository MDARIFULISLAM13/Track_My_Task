
//Access User_name & Password from local
const pass = JSON.parse(localStorage.getItem("pass")) || "";
User_name = JSON.parse(localStorage.getItem("Name")) || "";

//
const Total_value = parseInt(localStorage.getItem("Total_value")) || 0;
const Running_value = parseInt(localStorage.getItem("Running_value")) || 0;
const Complete_value = parseInt(localStorage.getItem("Complete_value")) || 0;
const UnComplete_value = parseInt(localStorage.getItem("UnComplete_value")) || 0;




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
task_display();


// take user new task input and save in localStorage

document.getElementById("enter_input").addEventListener("click", function () {

    const Task_name = document.getElementById("input_text").value;
    const task_last_time = document.getElementById("task_last_time").value;

    // Check for empty inputs, invalid date/time, or timeLeft <= 0
    const endTime = new Date(task_last_time).getTime();



    if (!Task_name || !task_last_time || isNaN(endTime) || endTime <= new Date().getTime()) {
        alert("Wrong input. Please fill in both fields with valid information.");

        // Clear values from the display input option
        document.getElementById("input_text").value = "";
        document.getElementById("task_last_time").value = "";
        return;
    }

    // Clear values from the display input option
    document.getElementById("input_text").value = "";
    document.getElementById("task_last_time").value = "";


    // Start time when task added
    const Start_time = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Last time when task time endd
    const last_time = new Date(task_last_time).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });


    const task_status = "Running";
    let time_left_ck = 0;
    const new_Task = {
        id: Date.now(), // use for create a unique id
        date: task_last_time,
        last_time: last_time,
        Start_time: Start_time,
        Task_name: Task_name,
        task_status: task_status,
        time_left_ck: time_left_ck,
    };

    // Push the new task to the User_data array in localStorage
    User_data.push(new_Task);

    // Save the updated User_data array in localStorage
    localStorage.setItem("User_data", JSON.stringify(User_data));

    // use for count running ,complete,uncomplete task

    let total_value = parseInt(localStorage.getItem("Total_value")) || 0;
    localStorage.setItem("Total_value", total_value + 1);


    let runningValue = parseInt(localStorage.getItem("Running_value")) || 0;
    localStorage.setItem("Running_value", runningValue + 1);

    // Call displayTask to show the updated list of tasks
    task_display();
});






// Function to display all tasks sorted by time
function task_display() {
    const list = document.getElementById("Tasklist");
    list.innerHTML = ""; // Clear existing list

    const now = new Date().getTime(); // Get current timestamp

    // Separate upcoming and expired events
    let upcomingEvents = [];
    let expiredEvents = [];

    User_data.forEach(entry => {
        const targetTime = new Date(entry.date).getTime();
        if (targetTime > now && entry.task_status == "Running") {
            upcomingEvents.push(entry);
        } else {
            expiredEvents.push(entry);
        }
    });

    // Sort upcoming events by least time remaining
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // // Sort expired events by oldest first
    expiredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Combine upcoming and expired events
    const sorted_task = [...upcomingEvents, ...expiredEvents];

    sorted_task.forEach(entry => {

        const li = document.createElement("li");

        const targetTime = new Date(entry.date).getTime();

        // Create text span for event info

        // Task Name
        const Task_name = document.createElement("span");
        Task_name.textContent = `|---> Task :  ${entry.Task_name} `;
        Task_name.style.cssText = "color :rgb(253, 4, 4); font-size : larger ;   margin-right: 1%;";
        li.appendChild(Task_name);

        //Task start time
        const task_Start_time = document.createElement("span");
        task_Start_time.textContent = `Start : ${entry.Start_time}`;
        task_Start_time.style.cssText = "color : rgb(182, 245, 175); font-size : large ; margin-right: 1%;";
        li.appendChild(task_Start_time);


        //Task End Time
        const Task_end_time = document.createElement("span");
        Task_end_time.textContent = `End : ${entry.last_time}`;
        Task_end_time.style.cssText = "color : rgb(239, 16, 255); font-size : large ; margin-right: 1%;";
        li.appendChild(Task_end_time);


        // task status
        const task__status = document.createElement("span");
        task__status.textContent = `Status : ${entry.task_status}`;
        task__status.style.cssText = "color : rgb(13, 203, 188); font-size : large ; margin-right: 1%;";
        li.appendChild(task__status);



        //task countdown timer
        const Time_left = document.createElement("span");
        Time_left.style.cssText = "color : rgb(53, 193, 22); font-size : large ; margin-right: 1%;";
        li.appendChild(Time_left);



        if (entry.task_status == "Running") {

            const Complete_btn = document.createElement("button");
            Complete_btn.textContent = "Complete";
            Complete_btn.onclick = () => Complete__btn(entry.id);
            li.appendChild(Complete_btn);
        }


        li.style.margin = "20px";
        list.appendChild(li); // Add list item to countdown list


        function updateCountdown() {

            if (entry.task_status == "UnComplete") {
                Time_left.textContent = "Time's up";
                return;
            }
            else if (entry.task_status == "Complete") {

                Time_left.textContent = `Complete Time: ${entry.time_left_ck}`;
                return;
            }


            const now = new Date().getTime();
            const timeLeft = targetTime - now;

            if (timeLeft <= 0) {

                entry.task_status = "UnComplete";
                Time_left.textContent = "Time's up";
                localStorage.setItem("User_data", JSON.stringify(User_data));

                // use for count running ,complete,uncomplete task
                let runningValue = parseInt(localStorage.getItem("Running_value")) || 0;
                localStorage.setItem("Running_value", runningValue - 1);


                let unComplete_value = parseInt(localStorage.getItem("UnComplete_value")) || 0;
                localStorage.setItem("UnComplete_value", unComplete_value + 1);

                location.reload();
                return;

            }


            // Calculate remaining time in days, hours, minutes, and seconds
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            Time_left.textContent = `Time left : ${days}d ${hours}h ${minutes}m ${seconds}s`;

        }


        updateCountdown(); // Initial update
        setInterval(updateCountdown, 1000); // Update every second

    });
}

// Function to delete a countdown event
function Complete__btn(id) {

    const user_pass = prompt("Enter Password");
    if (pass == user_pass) {

        const task = User_data.find(entry => entry.id === id);
        if (task) {
            task.task_status = "Complete";

            const aaStart_time = new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            task.time_left_ck = aaStart_time;

            // use for count running ,complete,uncomplete task
            localStorage.setItem("User_data", JSON.stringify(User_data));
            let runningValue = parseInt(localStorage.getItem("Running_value")) || 0;
            localStorage.setItem("Running_value", runningValue - 1);

            let complete_value = parseInt(localStorage.getItem("Complete_value")) || 0;
            localStorage.setItem("Complete_value", complete_value + 1);


            task_display();

        }
    } else {
        alert("Wrong Password");
    }

    task_display();
}


task_display();



// See Report
document.getElementById("আমলনামা").addEventListener("click", function () {

    const report_page = document.getElementById("report");
    report_page.style.display = "block";
    const report_page_close = document.getElementById("close_report");
    report_page_close.style.display = "block";

    const total_value = parseInt(localStorage.getItem("Total_value")) || 0;
    const running_value = parseInt(localStorage.getItem("Running_value")) || 0;
    const complete_value = parseInt(localStorage.getItem("Complete_value")) || 0;
    const unComplete_value = parseInt(localStorage.getItem("UnComplete_value")) || 0;

    const Total_task_report = document.getElementById("Total_task_report");
    Total_task_report.innerText = `Total Task : ${total_value}`

    const Running_task_report = document.getElementById("Running_task_report");
    Running_task_report.innerText = `Running Task : ${running_value}`

    const Complete_task_report = document.getElementById("Complete_task_report");
    Complete_task_report.innerText = `Complete Task : ${complete_value}`

    const Uncomplete_task_report = document.getElementById("Uncomplete_task_report");
    Uncomplete_task_report.innerText = `Uncomplete Task : ${unComplete_value}`

    const success_rate = (complete_value / (complete_value + unComplete_value)) * 100;

    if (complete_value + unComplete_value == 0) {
        success_rate = "0"
    }


    const Success_task_rate = document.getElementById("Success_task_rate");
    Success_task_rate.innerText = `Success_task : ${success_rate.toFixed(2)} %`

})

document.getElementById("close_report").addEventListener("click", function () {

    const report_page = document.getElementById("report");
    report_page.style.display = "none";

    const report_page_close = document.getElementById("close_report");
    report_page_close.style.display = "none";




})



