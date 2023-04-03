
const element = ele => {
    return document.querySelector(`${ele}`)
}

const reInitialize = ele => ele.value = ''

const todo_list = element('ul')
const input = element('.bottom input')
const add_todos_btn = element('.bottom button')
const task = element('#task')
const done = element('#done')
const search = element('.search input')

let backup = ''

function addTodos (){

    if(input.value !== ''){

        const ele = `
        <input type="checkbox">
        <h5> ${input.value} </h5>
        <button class="edit">edit</button>
        <button class="delete">delete</button>
        `

        const list = document.createElement('li')
        list.innerHTML = ele

        todo_list.insertAdjacentElement('beforeend',list)
        totalTask()

    }else alert('Nothing to add!')

}

function totalTask(){
    task.children[1].textContent = todo_list.children.length
}

function editTodos(ele){

    input.value = ele.previousElementSibling.textContent;
    add_todos_btn.dataset.value = 'save'
    add_todos_btn.textContent= 'Save'
    backup = ele.previousElementSibling

}

function deleteTodos(ele){

    ele.parentElement.remove()
    totalTask()

}

search.addEventListener('keyup', searchTodos)
function searchTodos(ev){
    const char = ev.key

    Array.from(todo_list.children).forEach(ele => {
        if(ele.children[1].textContent.includes(char)){
            ele.style.display = 'flex'
        }else{
            ele.style.display = 'none'
        }
    });
}

function completedTodos(ele){
    if(ele.checked){
        ele.parentElement.classList.add('checked')
        done.children[1].textContent = +done.children[1].textContent + 1
    }else {
        done.children[1].textContent -= 1
        ele.parentElement.classList.remove('checked')
    }
}

const main = element('main')
main.addEventListener('click', ev => {
    const target = ev.target

    if(target.dataset.value === 'add'){
        addTodos()
        reInitialize(input)

    }
    if(target.dataset.value === 'save'){

        target.dataset.value = 'add'
        add_todos_btn.textContent= 'Add'
        backup.textContent = input.value
        reInitialize(input)

    }

    if(target.type === 'checkbox') completedTodos(target)

    if(target.className.includes('delete')) deleteTodos(target)

    if(target.className.includes('edit')) editTodos(target)
})