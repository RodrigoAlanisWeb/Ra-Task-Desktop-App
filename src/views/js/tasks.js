const storage = require('electron-localstorage');
const { stat } = require('fs');
let tasks = '';
const container = document.querySelector('#tasks');

async function getTasks() {
    tasks = await main.getAll();
}

async function done(id) {
    const res = confirm("Are You Sure You Want To Finish It?");
    if (res) {
        await main.doneTask(id);
    } else {
        return;
    }
}

async function deleteTask(id) {
    const res = confirm("Are You Sure You Want To Delete It?");
    if (res) {
        await main.deleteTask(id);
    } else {
        return;
    }
}

async function init() {
    await getTasks()
    if (tasks.length < 1) {
        container.innerHTML = `
        <div class="alert alert-primary mt-5 col">
            You Dont Have Tasks
        </div>
        `
        return;
    }
        tasks.forEach(async (task) => {
            console.log(task);
            let id = task._id;
            let status = false;
            if (task.done) {
                status = 'done'
            } else {
                status = 'not done'
            }

            container.innerHTML += `
            <div class="card mt-3">
                <div class="card-header">
                    Task
                </div>
                <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-text">${task.description}</p>
                <p class="card-text">status: ${status}</p>
                <button class="btn btn-primary" onclick="done('${id}')">Done</button>
                <button onclick="deleteTask('${id}')" class="btn btn-danger">Delete</button>
                 </div>
            </div>
            `
        });
}

if (storage.getItem('token')) {
    init();
} else {
    document.querySelector("#main").innerHTML = `
        <div class="alert alert-primary col m-5">
            Please Login Or Create An Acount
        </div>
    `
}