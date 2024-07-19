
import { Timer } from "./timer.js";

/* to-do list */



const taskInput = document.getElementById('input-task');
const addTaskBtn = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

addTaskBtn.addEventListener("click", ()=> {
    console.log('adding task');
    
    const taskToAdd = taskInput.value || null;
    
    //creating elements
    const task = document.createElement('div');
    task.classList.add('task');

    const taskText = document.createElement('div');
    taskText.classList.add('task-text');
    taskText.innerText = `${taskToAdd}`;

    const controls = document.createElement('div');
    controls.classList.add('controls');

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    //event listeners
    checkBtn.addEventListener("click", (e) => {
        taskText.classList.toggle('completed')
        
    });
    trashBtn.addEventListener("click", () => {
        trashBtn.parentElement.parentElement.remove();
    });

    //construct task!
    task.appendChild(taskText);
    task.appendChild(controls);
    controls.appendChild(checkBtn);
    controls.appendChild(trashBtn);

    //add task to todo-list
    todoList.appendChild(task);

    taskInput.value = "";

});








                    




















/* timer stuff */ 


const titleInput = document.getElementById('optional-title');
const secInput = document.getElementById('seconds')
const minInput = document.getElementById('minutes');
const hourInput = document.getElementById('hours');
const addBtn = document.getElementById('add-timer');
const inputTimer = document.getElementById('input-timer');
const clockImg = document.getElementById('alarm-clock');
const timerSection = document.getElementById('timer-section');


let numTimers = 0;
let numActiveTimers = 0;
let numExpiredTimers = 0;
clockImg.style.display = 'none';

const timerEvent = new Event("timer-event");


document.addEventListener("timer-event", ()=> {
   
    
    if(numTimers > 0){
        clockImg.style.display = 'block';
        if(numActiveTimers > 0)clockImg.style.animation = 'moveInCircle 3s linear infinite';
        if(numExpiredTimers > 0) clockImg.style.animation = 'vibrate 0.3s ease-in-out infinite';
        if(numActiveTimers == 0 && numExpiredTimers == 0){
            clockImg.style.animation = 'none';
        }

    }
    else{
        requestAnimationFrame(() => {
            clockImg.style.animation = 'clockOut 0.3s ease-out';
        });
        setTimeout(()=>{
            clockImg.style.display = 'none';
        },300);
        
    }
   
    
    


 
   
});



const addTimer = () => {
    

    const title = titleInput.value || null;
    const secs = secInput.value || 0;
    const mins = minInput.value || 0;
    const hrs = hourInput.value || 0;

    //create all elements of the timer and add attributes
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');

    if(title != null){
        const timerTitle = document.createElement('div');
        timerTitle.classList.add('timer-title');
        timerTitle.innerText = title;
        timerElement.appendChild(timerTitle);
    }
    
    

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer-display');

    const controls = document.createElement('div');
    controls.classList.add('controls');
    
    const playBtn = document.createElement('button');
    playBtn.classList.add('play-btn');
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';

    const pauseBtn = document.createElement('button');
    pauseBtn.classList.add('pause-btn');
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    
    const resetBtn = document.createElement('button');
    resetBtn.classList.add('reset-btn');
    resetBtn.innerText = "reset";

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';


    //create timer object

    const timerObject = new Timer(hrs, mins, secs, timerDisplay, function(){
        timerElement.classList.add('flash-red');  
        numExpiredTimers++;
        numActiveTimers--;
        timerElement.classList.remove('active');
        document.dispatchEvent(timerEvent);
    });

    //add event listeners
    playBtn.addEventListener("click", () => {
        timerObject.startTimer();
        timerElement.classList.add('active');
        numActiveTimers++;
        document.dispatchEvent(timerEvent);
    });

    pauseBtn.addEventListener("click", () => {
        timerObject.pause();
        if(timerElement.classList.contains('active')){
            timerElement.classList.remove('active');
            numActiveTimers--;
        }
        
        document.dispatchEvent(timerEvent);
    });
    resetBtn.addEventListener("click", () => {
        timerObject.reset();
        if(timerElement.classList.contains('flash-red')){
            timerElement.classList.remove('flash-red');
            numExpiredTimers--;

        }
       
        else if(timerElement.classList.contains('active')){
            numActiveTimers--;
            timerElement.classList.remove('active')
        }
        document.dispatchEvent(timerEvent);
        
    });
    trashBtn.addEventListener("click", () => {
        timerObject.reset();
        if(timerElement.classList.contains('flash-red')){
            numExpiredTimers--;
        }
        else if(timerElement.classList.contains('active')){
            numActiveTimers--;
        }
        timerElement.remove();
        numTimers--;

        document.dispatchEvent(timerEvent);
        
    });
    
    timerElement.appendChild(timerDisplay);
    timerElement.appendChild(controls);
    
    controls.appendChild(playBtn);
    controls.appendChild(pauseBtn);
    controls.appendChild(resetBtn);
    controls.appendChild(trashBtn);

    timerSection.appendChild(timerElement);



    titleInput.value = "";
    secInput.value = "";
    minInput.value = "";
    hourInput.value = "";
    
    numTimers++;
    if(numTimers == 1){
        clockImg.style.display = 'block';
        requestAnimationFrame(() => {
            clockImg.style.animation = 'clockIn 0.3s ease-out';
        });
        
    }
    
     document.dispatchEvent(timerEvent);
    
  
}


addBtn.addEventListener("click", addTimer);












