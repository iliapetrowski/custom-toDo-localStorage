
const inputTitle = document.querySelector('#inputTitle')
const inputText = document.querySelector('#inputText')
const formChecked = document.querySelectorAll('.form-check-input')
const addTaskButton = document.querySelector('#add_task_submit')
const taskList = document.querySelector('#currentTasks')
const completedTasks = document.querySelector('#completedTasks')
document.querySelector('#openModalBtn').addEventListener('click', addNewTask)
const sortUpButton = document.querySelector('#sortUp')
const sortDownButton = document.querySelector('#sortDown')
const keysList = []


function sortTask() {

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        keysList.push(+key)


    }
    console.log(keysList)
}


function submitForm() {

    let key = new Date().getTime().toString()
    let date = new Date()

    let newTask = {
        priority: null,
        title: inputTitle.value,
        text: inputText.value,
        hour: date.getHours(),
        minutes: date.getMinutes(),
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        complete: false,


    }

    formChecked.forEach((item, index) => {
        if (item.checked) {
            newTask.priority = index
        }

    })
    localStorage.setItem(key, JSON.stringify(newTask))

}


function addNewTask() {
    addTaskButton.addEventListener('click', submitForm)

}


function taskLoop() {
    completedTasks.innerHTML = ''
    taskList.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let taskObj = JSON.parse(localStorage.getItem(key))
        taskGenerator(taskObj, key)
    }

}

function taskGenerator(taskObj, key) {

    let hour = taskObj.hour
    let minutes = taskObj.minutes
    let day = taskObj.day - 1
    let month = taskObj.month
    let year = taskObj.year
    if (hour < 10) {
        hour = "0" + hour
    }
    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }
    if (minutes < 10) {
        minutes = "0" + minutes
    }


    let taskCard = `<li class="list-group-item d-flex w-100 mb-2" id=${key} >
					<div class="w-100 mr-2">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">${taskObj.title}</h5>
							<div>
								<small class="mr-2">${formChecked[taskObj.priority].value} priority</small>
								<small>${hour}:${minutes}  ${day}.${month}.${year} </small>
							</div>

						</div>
						<p class="mb-1 w-100">${taskObj.text}</p>
					</div>
					<div class="dropdown m-2 dropleft">
						<button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-ellipsis-v"></i>
						</button>
						<div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
							<button type="button" class="btn btn-success w-100">Complete</button>
							<button type="button" class="btn btn-info w-100 my-2" data-toggle="modal" data-target="#exampleModal">Edit</button>
							<button type="submit" class="btn btn-danger w-100">Delete</button>
						</div>
					</div>
				</li>`
    if (taskObj.complete) {
        completedTasks.innerHTML += taskCard

    } else {
        taskList.innerHTML += taskCard
    }

    taskOptions(taskCard, key, taskObj)

}


function taskOptions(item, key, taskObj) {
    let successBtn = document.querySelectorAll('.dropdown > .dropdown-menu > .btn-success')
    let deleteBtn = document.querySelectorAll('.dropdown > .dropdown-menu > .btn-danger')
    let editBtn = document.querySelectorAll('.dropdown > .dropdown-menu > .btn-info')
    successBtn.forEach((item) => item.addEventListener('click', completeTask))
    deleteBtn.forEach((item) => item.addEventListener('click', () => {
        deleteTask.call(item)
    }))
    editBtn.forEach((item) => item.addEventListener('click', () => {
        editTask.call(item)
    }))


}

function deleteTask() {
    let key = this.closest('.list-group-item').id
    localStorage.removeItem(key)
    console.log('ya tut')
    location = location

}


function completeTask() {
    let task = JSON.parse(localStorage.getItem(this.closest('.list-group-item').id))
    let idTask = this.closest('.list-group-item').id
    task.complete = !task.complete
    localStorage.setItem(idTask, JSON.stringify(task))
    taskLoop()
    //console.log(JSON.parse(localStorage.getItem(this.closest('.list-group-item').id)).complete)


}


function editTask() {
    let key = this.closest('.list-group-item').id
    let taskItem = JSON.parse(localStorage.getItem(key))
    inputTitle.value = taskItem.title
    inputText.value = taskItem.text

    let newTaskObj = {
        priority: taskItem.priority,
        title: inputTitle.value,
        text: inputText.value,
        hour: taskItem.hour,
        minutes: taskItem.minutes,
        day: taskItem.day,
        month: taskItem.month,
        year: taskItem.year,
        complete: taskItem.complete,
    }
// inputTitle.addEventListener('input', ()=>{
//     newTaskObj.title = inputTitle.value})


    formChecked[newTaskObj.priority].checked = true


    addTaskButton.addEventListener('click', () => {
        editForm(key, newTaskObj)
        document.location.reload()
        taskLoop()
    })


}

function editForm(key, newTaskObj) {
    let inputTitle = document.querySelector('#inputTitle')
    let inputText = document.querySelector('#inputText')
    newTaskObj.title = inputTitle.value
    newTaskObj.text = inputText.value

    formChecked.forEach((item, index) => {
        if (item.checked) {
            newTaskObj.priority = index
        }

    })
    localStorage.setItem(key, JSON.stringify(newTaskObj))

}

taskLoop()

sortTask()