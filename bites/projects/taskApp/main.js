window.onload = function () {
    // I don't know how this works ._.
    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return (
            s4() +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            "-" +
            s4() +
            s4() +
            s4()
        );
    };

    let taskObject = [];
    // Assign from localStorage to the array so it doesn't overwrite
    if (window.localStorage.getItem("tasks")) {
        taskObject = JSON.parse(window.localStorage.getItem("tasks"));
    }

    function focusOnField() {
        let taskNameElement = document.querySelector(".input");
        taskNameElement.focus();
    }

    function enterKey() {
        let taskNameElement = document.querySelector(".input");
        taskNameElement.onkeypress = function (event) {
            if (event.key === "Enter") {
                let addTaskBtn = document.querySelector(".add");
                addTaskBtn.click();
            }
        };
    }
    function getTask() {
        let tasksContainer = document.querySelector(".tasks");
        taskObject.forEach(function (element) {
            let taskContainer = document.createElement("div");
            taskContainer.classList.add("task");
            // Add id based on array length
            let taskId = element.id;
            taskContainer.id = taskId;

            let taskH3 = document.createElement("h3");
            taskH3.textContent = element.title;

            let taskBtn = document.createElement("button");
            taskBtn.classList.add("delete");
            taskBtn.textContent = "Delete";

            taskContainer.append(taskH3, taskBtn);
            tasksContainer.appendChild(taskContainer);
        });
    }

    function deleteTask() {
        document.addEventListener("click", (element) => {
            // Find if the element have className of delete
            let deleteBtn = element.target.className.includes("delete");
            let clickedElement = element.target;
            if (!deleteBtn) return;

            let localArray = JSON.parse(window.localStorage.getItem("tasks"));
            localArray.map(function (arrayElement, index) {
                // Map and look if the id inside the array matches the id on the task element
                if (arrayElement.id == clickedElement.parentElement.id) {
                    delete localArray[index];
                    // Filter null from the array
                    let removeNull = localArray.filter(function (element) {
                        return element != null;
                    });
                    // Change localStorage
                    window.localStorage.setItem(
                        "tasks",
                        JSON.stringify(removeNull)
                    );
                    // Change taskObject array to suit the localStorage
                    taskObject.splice(0, taskObject.length);
                    taskObject = removeNull;
                }
            });
            clickedElement.parentElement.remove();
        });
    }

    function addTask() {
        let tasksContainer = document.querySelector(".tasks");
        let addTaskBtn = document.querySelector(".add");
        let taskNameElement = document.querySelector(".input");
        function createTask() {
            document.addEventListener("click", (element) => {
                let clickedElement = element.target;
                // If the element is not the add task button then return nothing
                if (clickedElement !== addTaskBtn) return;

                let taskName = taskNameElement.value;
                // Check field value, if there is nothing do nothing
                if (taskName === "" || taskName.length === 0) return;
                // Create task element
                let taskContainer = document.createElement("div");
                taskContainer.classList.add("task");
                // Add id based on array length
                let taskId = guid();
                taskContainer.id = taskId;

                let taskH3 = document.createElement("h3");
                taskH3.textContent = taskName;

                let taskBtn = document.createElement("button");
                taskBtn.classList.add("delete");
                taskBtn.textContent = "Delete";

                taskContainer.append(taskH3, taskBtn);
                tasksContainer.appendChild(taskContainer);

                taskNameElement.value = "";

                addTaskToLocal();
                focusOnField();

                function addTaskToLocal() {
                    taskObject.push({ id: taskId, title: taskName });
                    window.localStorage.setItem(
                        "tasks",
                        JSON.stringify(taskObject)
                    );
                }
            });
        }
        createTask();
    }

    getTask();
    deleteTask();
    addTask();
    focusOnField();
    enterKey();
};
