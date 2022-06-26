var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function () {
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);
    press(this);
    playSound(chosenColor);
    checkAnswer(userClickedPattern.length);
});

function nextSequence() {
    userClickedPattern = [];
    var random = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[random];
    gamePattern.push(randomColor);
    $("#" + randomColor)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomColor);
    level++;
    $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel){
     if(gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){
           console.log("success");
           if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence(),2000);
           }
     }
     else{
            console.log("fail");
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
               $("body").removeClass("game-over");
            },200);
            restart();
            $("h1").text("Game over, press any key to restart!");
     }

}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function press(button){
    $(button).addClass("pressed");
    setTimeout(function(){$(button).removeClass("pressed")},100);
}

function restart(){
    level = 0;
    started = false;
    gamePattern = [];
}