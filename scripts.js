// mainContainer
const containerActivities = document.querySelector('.list-container');

let exp; 
let min;

// Persistencia de datos
let activities = [];
let count = 0;
const timeIntervals = [];

if (localStorage.getItem('tareas') != null) {
    const aux = [...JSON.parse(localStorage.getItem('tareas'))];
    for(let i =0; i<aux.length; i++) {
        if(aux[i]!=null) {
            renderActivity(aux[i]);
        }
    };
    activities = aux;
    count = +JSON.parse(localStorage.getItem('count'));
}

// Formularios Buttons
const rebootActivity = document.querySelector('.btn__1');
const addActivity = document.querySelector('.btn__2');

// Options
const buttonPlay = document.querySelector('.icon__play');
const buttonStop = document.querySelector('.icon__stop');
const buttonUpdate = document.querySelector('.icon__trash');
const buttonTrash = document.querySelector('.icon__trash');

// Lista de Actividades



// clase Actividad
class Activity {
    constructor(title, time, desc, index) {
        this.title = title;
        this.time = time;
        this.description = desc;
        this.index = index;
    }
}

// Convierte segundos a una hora en formato hh:mm:ss
function convertTime(time) {
    let segundos = time % 60;
    time = (time - segundos) / 60;
    let minutes = time % 60;
    time = (time - minutes) / 60;
    let hours = time % 60;

    return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${('' + segundos).padStart(2, 0)}`;
}

// Crear la actividad y mostrarla en la lista
function renderActivity(activity) {
    let { title, time, index } = activity;
    let html = `
    <div class="list__element" id="el__${index}">
    <div class="extension">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list icon__menu" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
    </div>
    <div class="list__part list__title">
        <div class="list_title">
            <h1>${title}</h1>
        </div>
    </div>

    <div class="list__part list__time">
        ${convertTime(time)}
    </div>

    <div class="list__part list__options">
        
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pencil-square icon boton__${index} icon__update" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-fill icon boton__${index} icon__play" viewBox="0 0 16 16">
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-stop-fill icon boton__${index} icon__stop" viewBox="0 0 16 16">
            <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-trash-fill icon boton__${index} icon__trash" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
    </div>

    </div>
    `;
    containerActivities.insertAdjacentHTML("beforeend", html);
    const btn = document.querySelectorAll(`.boton__${index}`);

    // Dando funcionalidad a los botones
    addFuncionalities(btn, activity);

}

// functions

function addFuncionalities(btn, activity) {
    let {index, time} = activity;
    let tiempo;

    btn[0].addEventListener('click', function () {
        console.log('update');
    });

    btn[1].addEventListener('click', function () {
        if (timeIntervals[index] == null) {
            for (let i = 0; i < timeIntervals.length; i++) {
                if (i !== index) {
                    clearInterval(timeIntervals[i]);
                    timeIntervals[i] = null;
                }
            }
            tiempo = setInterval(() => {
                time--;
                if (time < 0) {
                    clearInterval(tiempo);
                    deleteActivity(index, this.parentNode.parentNode);
                }else {
                    this.parentNode.parentNode.querySelector('.list__time').textContent = convertTime(time);
                    activities[index].time = time;
                    localStorage.setItem('tareas', JSON.stringify(activities));
                }
            }, 1000);
            timeIntervals[index] = tiempo;
        }

    });

    btn[2].addEventListener('click', function () {
        clearInterval(timeIntervals[index]);
        timeIntervals[index] = undefined;
    });

    btn[3].addEventListener('click', function () {
        clearInterval(tiempo);
        deleteActivity(index, this.parentNode.parentNode)
    });
    activities.push(activity);
    localStorage.setItem('tareas', JSON.stringify(activities));
}

function deleteActivity(index, element) {
    element.remove();
    timeIntervals.splice(index, 1);
    activities[index] = null;
    if(activities.every((act) => act == null)){
        activities = [];
        count = 0;
        localStorage.setItem('tareas', JSON.stringify(activities));
        localStorage.setItem('count', count);
    }
    localStorage.setItem('tareas', JSON.stringify(activities));
}


//Inputs
const inputTitle = document.querySelector('#title');
const inputTime = document.querySelector('#time');
const inputDescription = document.querySelector('#description');



//Clean form
function cleanForm() {
    inputTitle.value = inputTime.value = inputDescription.value = '';
}

// Funcionalidad al formulario
addActivity.addEventListener('click', function (e) {
    e.preventDefault();
    if (inputTitle.value === '' || inputTime.value === '') {
        return;
    }
    renderActivity(new Activity(inputTitle.value, +inputTime.value, inputDescription.value, count));
    count++;
    localStorage.setItem('count', count);
    cleanForm();
});

rebootActivity.addEventListener('click', function (e) {
    e.preventDefault();
    cleanForm();
});




