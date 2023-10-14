const title = document.querySelector("h1");
const taskList = document.querySelector("#task-list");
const addTaskInput = document.querySelector("#add-task-input");
const addTaskBtn = document.querySelector("#add-task-btn");

const editBtnCallback = (listItem) => {
    const oldListItem = listItem.cloneNode(true);
    listItem.innerHTML = "";
    const oldTextValue = oldListItem.querySelector("label").innerText;
    const editInput = document.createElement("input");
    editInput.value = oldTextValue;
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "💾";
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "🚩";
    listItem.appendChild(editInput);
    listItem.appendChild(saveBtn);
    listItem.appendChild(cancelBtn);
    // 🚩Cancel functionality
    cancelBtn.addEventListener("click", () => {
        taskList.insertBefore(buildListItem({ value: oldTextValue }), listItem);
        taskList.removeChild(listItem);
    });

    // 🚩Save functionality
    saveBtn.addEventListener("click", () => {
        taskList.insertBefore(buildListItem(editInput), listItem);
        taskList.removeChild(listItem);
    });
};

const buildListItem = (inputVal) => {
    // Create elements
    const listItem = document.createElement("li");
    const label = document.createElement("label");
    const textNode = document.createTextNode(inputVal.value);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-or-edit-btn");
    deleteBtn.innerText = "❌";

    const editBtn = document.createElement("button");
    editBtn.classList.add("delete-or-edit-btn");
    editBtn.innerText = "⚙️";

    // Remove functionality
    deleteBtn.addEventListener("click", () => taskList.removeChild(listItem));
    editBtn.addEventListener("click", () => editBtnCallback(listItem));

    // Combine elements
    label.appendChild(checkbox);
    label.appendChild(textNode);
    listItem.appendChild(label);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);

    return listItem;
};

const addTaskCallback = () => {
    const inputVal = addTaskInput;

    if (!inputVal.value.length > 0) {
        return console.log("Must add something in the input");
    }

    const listItem = buildListItem(inputVal);
    taskList.appendChild(listItem);

    inputVal.value = "";
};

addTaskBtn.addEventListener("click", addTaskCallback);
