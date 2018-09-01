//scripts.js
// A boolean variable for storing whether the player is playing or not.
var playing = false;
// A variable for maintianing the score.
var score;
// A variable for calculating the time remaining
var timeremaining;
var action;
var correctAnswer;

//    @pararm $id The id of the component whose text needs to be set.
//    @param $text The text that needs to be set on the given component.
//    This method is used to set the given text on the respective component.
function setText(id, text){
    document.getElementById(id).innerHTML = text;
}

//  @param $id The id of the element that needs to be shown.
//  This method is used to show the component with the given id.
function show(id){
    document.getElementById(id).style.display = "block";
}
//  @param $id The id of the element that needs to be shown.
//  This method is used to hide the component with the given id.
function hide(id){
    document.getElementById(id).style.display = "none";
}

// Changing the state of the game on the basis of click (Start/ Stop)
document.getElementById("startreset").onclick = function(){
    // Means the player was playing and now he wants to stop the game.
    if(playing == true){
        playing=false;
        location.reload();
    }
    else{
        // Means the game was off and now the user wants to start playing.
        playing = true;
        
        score = 0;
        setText("scoreValue",score);
        
        show("timeremaining");
        timeremaining = 10;
        setText("timeremainingvalue",timeremaining);
        
        this.innerHTML = "Reset Game";
        hide("gameover");
        startCountdown();
        generateQA();
    }
}

//  This method is used to start the countdown of the game.
function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        setText("timeremainingvalue",timeremaining);
        if(timeremaining <= 0){
            stopCountdown();
            show("gameover");
            hide("correct");
            hide("wrong");
            playing = false;
            setText("startreset" , "Start Game");
            setText("gameover","<p>Game Over.</p><p>Your Score:"+score+"</p>");
        }
    },1000);
}

//  This method is used to stop the countdown of the game.
function stopCountdown(){
    clearInterval(action);
}

// This method is used to generate a random question and display it to the user
// The idea is pretty simple we generate a 2 random numbers then we generate 4 random answers and store the index of the correct answer.
function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    setText("question",x + "x" + y);
    
    var correctPosition = 1 + Math.round(3 * Math.random());
    setText("box"+correctPosition,correctAnswer);
    
    var answers = [correctAnswer];
    
//    fill other boxes with wrong answers
    
    for(i=1; i<5; i++){
        var wrongAnswer;
        if( i != correctPosition){

            do{
                wrongAnswer = (1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random())));
            }while(answers.indexOf(wrongAnswer)>-1);
            setText("box"+i , wrongAnswer);
            answers.push(wrongAnswer);

        }
    }

    for(i=1; i<5; i++){
        document.getElementById("box"+i).onclick = function(){
            if(playing == true){
                if(correctAnswer == this.innerHTML){
                    score++;
                    setText("scoreValue",score);
                    show("correct");
                    hide("wrong");
                    setTimeout(function(){
                        hide("correct");
                    },1000);

                    generateQA();
                }
            }
            else{
    //            wrong clicked
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}
