import {worked} from './func';

worked();


const inputTitle = document.querySelector('#inputTitle')
const inputText = document.querySelector('#inputText')
const formChecked = document.querySelectorAll('.form-check-input')
const addTaskButton = document.querySelector('#add_task_submit')
const taskList = document.querySelector('#currentTasks')


addTaskButton.addEventListener('click', submitForm)


function submitForm(e) {

    let date = new Date()
    let key = new Date().getTime().toString()

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
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let taskObj = JSON.parse(localStorage.getItem(key))
        taskGenerator(taskObj)
    }

}


function taskGenerator(taskObj) {

    let hour = taskObj.hour
    let minutes = taskObj.minutes
    let day = taskObj.day -1
    let month = taskObj.month
    let year = taskObj.year
    console.log(taskObj)

    taskList.innerHTML += `<li class="list-group-item d-flex w-100 mb-2">
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
							<button type="button" class="btn btn-info w-100 my-2">Edit</button>
							<button type="button" class="btn btn-danger w-100">Delete</button>
						</div>
					</div>
				</li>`
}

taskLoop()

