import {worked} from './func';

worked();


const inputTitle = document.querySelector('#inputTitle')
const inputText = document.querySelector('#inputText')
const formChecked = document.querySelectorAll('.form-check-input')
const addTaskButton = document.querySelector('#add_task_submit')
const taskList = document.querySelector('#currentTasks')
addTaskButton.addEventListener('click', submitForm)
const completedTasks = document.querySelector('#completedTasks')


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
            newTask.priority = formChecked[index].value
        }

    })
    localStorage.setItem(key, JSON.stringify(newTask))
    //taskLoop()
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
								<small class="mr-2">${taskObj.priority} priority</small>
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
							<button type="button" class="btn btn-danger w-100">Delete</button>
						</div>
					</div>
				</li>`
    if (taskObj.complete) {
        completedTasks.innerHTML += taskCard

    } else {
        taskList.innerHTML += taskCard
    }

    taskOptions(taskCard, key)

}


function taskOptions(item, key) {
    let successBtn = document.querySelectorAll('.dropdown > .dropdown-menu > .btn-success')
    let deleteBtn = document.querySelector('.dropdown > .dropdown-menu > .btn-info')
    let editBtn = document.querySelector('.dropdown > .dropdown-menu > .btn-danger')
    successBtn.forEach((item) => item.addEventListener('click', completeTask))


}

function completeTask() {
    let task = JSON.parse(localStorage.getItem(this.closest('.list-group-item').id))
    let idTask = this.closest('.list-group-item').id
    task.complete = !task.complete
    localStorage.setItem(idTask, JSON.stringify(task))
    taskLoop()
    //console.log(JSON.parse(localStorage.getItem(this.closest('.list-group-item').id)).complete)


}

taskLoop()

