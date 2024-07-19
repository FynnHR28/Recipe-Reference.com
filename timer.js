




export class Timer{

    constructor(hrs, mins, secs, displayElement,timerEndCallback){
        this.paused = true;
        this.initialTime = parseInt(hrs) * 3600 + parseInt(mins) * 60 + parseInt(secs);
        this.countdown = this.initialTime;
        this.timeRemaining = null;
        this.interval = null;
        this.displayElement = displayElement;
        this.displayElement.innerText =  Timer.computeDisplayString(Timer.breakDownTime(this.countdown));
        this.timerRing = new Audio('./Resources/Audio/calm-ringtone.mp3');
        this.timerRing.loop = true;
        this.timerEndCallback = timerEndCallback;

        
        
    }

    startTimer(){
        //if it was paused 
        if(this.paused && this.timeRemaining){
            this.countdown = this.timeRemaining;
        }
        
        
        this.paused = false;
        clearInterval(this.interval);
        this.interval = setInterval(() => this.update(), 1000);

    }

    update(){
        if(this.countdown <= 0){
            clearInterval(this.interval);
            this.timerRing.play();
            this.timerEndCallback();
            
            return;
        }
        
        this.countdown--;
        this.timeRemaining = this.countdown;
        
        //returns an array -> [hrs, mins, secs] broken down so we can display it
        let hrsMinsSecs = Timer.breakDownTime(this.countdown);

        //update display string
        this.displayElement.innerText = Timer.computeDisplayString(hrsMinsSecs);

    }

    pause(){
        clearInterval(this.interval);
        this.paused = true;
    }

    reset(){
        clearInterval(this.interval);
        this.timerRing.pause();
        this.timerRing.currentTime = 0;
        this.countdown = this.initialTime;
        this.displayElement.innerText = Timer.computeDisplayString(Timer.breakDownTime(this.countdown));
    }
    

    

    static computeDisplayString(hrsMinsSecs){
        
        let hrs = hrsMinsSecs[0];
        let mins = hrsMinsSecs[1];
        let secs = hrsMinsSecs[2];
       
        let hoursLeadingZeros = "";
        let minLeadingZeros = "";
        let secsLeadingZeros = "";

        hrs < 10 ? hoursLeadingZeros = "0" : hoursLeadingZeros = "";
        mins < 10 ? minLeadingZeros = "0" : minLeadingZeros = "";
        secs < 10 ? secsLeadingZeros = "0" : secsLeadingZeros = "";

        return `${hoursLeadingZeros}${hrs}:${minLeadingZeros}${mins}:${secsLeadingZeros}${secs}`;

    }

    static breakDownTime(countdown){
        const hrs = Math.floor(countdown / 3600);
        //gives you the remainder in seconds less than a full hour, and 
        //converts to minutes by dividing by 60
        const mins = Math.floor((countdown % 3600) / 60);
        //gives you the remainder in seconds after dividing by 60,
        //representing the total seconds that don't add to a full min
        const secs = Math.floor(countdown % 60);

        return [hrs, mins, secs];
    }

    






}