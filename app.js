/**
 * Searches for an html element based on specified attribute value [class or id]
 * @param {*} ele
 * @returns {object} - an element
 */
const find_element = (ele) => {
  return document.querySelector(`${ele}`);
};

const reInitialize = (ele) => (ele.value = "");

const todo_list = find_element("ul");
const input = find_element(".bottom input");
const add_todos_btn = find_element(".bottom button");
const task = find_element("#task");
const done = find_element("#done");
const search = find_element(".search input");
const main = find_element("main");

let backup_todo = "";

/**
 * Adds a new item to the todo list and calculate the total number of items in the todo list
 * @returns {void} - an element
 */
function addTodos() {
  if (input.value !== "") {
    todo_list.insertAdjacentHTML(
      "beforeend",
      `<li>
            <input type="checkbox">
            <h5> ${input.value} </h5>
            <button class="edit">edit</button>
            <button class="delete">delete</button>
            </li>
        `
    );

    totalTask();
  } else alert("Nothing to add!");

  reInitialize(input);
}

/**
 * calculate the total number of items in the todo list
 * @returns {void}
 */
function totalTask() {
  task.children[1].textContent = todo_list.children.length;
}

/**
 * Edit an item in the todo list and changes the add button value to save
 * @param {*} ele
 * @returns {void}
 */
function editTodos(ele) {
  input.value = ele.previousElementSibling.textContent;
  add_todos_btn.dataset.value = "save";
  add_todos_btn.textContent = "Save";
  backup_todo = ele.previousElementSibling;
}

/**
 * Delete an item in the todo list
 * @param {*} ele
 * @returns {void}
 */
function deleteTodos(ele) {
  ele.closest("li").remove();
  totalTask();
}

/**
 * Searches for an item in the todo list. if item is available display it else hide it
 * @param {*} ev - Keyboard keys
 * @returns {void}
 */
function searchTodos(ev) {
  const char = ev.target.value.toLocaleLowerCase();

  Array.from(todo_list.children).forEach((ele) => {
    const term = ele.children[1].textContent.toLocaleLowerCase();
    if (term.includes(char)) {
      ele.style.display = "flex";
    } else {
      ele.style.display = "none";
    }
  });
}
search.addEventListener("keyup", searchTodos);

/**
 * Checks an item if it is completed
 * @param {*} ele - html element
 * @returns {void}
 */
function completedTodos(ele) {
  if (ele.checked) {
    ele.parentElement.classList.toggle("completed");
    done.children[1].textContent = +done.children[1].textContent + 1;
  } else {
    done.children[1].textContent -= 1;
    ele.parentElement.classList.toggle("completed");
  }
}

/**
 * Gets the value of the targeted item in the todo list and insert the value in the input field for editing
 * and changes the add button value to add
 * @param {object} target - html element
 * @returns {void}
 */
function prepareUpdate(target) {
  target.dataset.value = "add";
  add_todos_btn.textContent = "Add";
  backup_todo.textContent = input.value;
  reInitialize(input);
}

main.addEventListener("click", (ev) => {
  const target = ev.target;

  if (target.dataset.value === "add") addTodos();

  if (target.dataset.value === "save") prepareUpdate(target);

  if (target.type === "checkbox") completedTodos(target);

  if (target.className.includes("delete")) deleteTodos(target);

  if (target.className.includes("edit")) editTodos(target);
});

/**
 * Adds item to the todo list when the "Enter" key is clicked and the input field is not empty
 * @param {object} target - html element
 * @returns {void}
 */
input.addEventListener("keyup", (ev) => {
  const ele = find_element(".add");
  if (ev.key === "Enter") {
    ele.dataset.value === "add" ? addTodos() : prepareUpdate(ele);
  }
  //   ev.key === "Enter" ? addTodos() : "";
});
