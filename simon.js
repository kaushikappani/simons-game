var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$("#startButton").click(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btnMain").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
  userClickedPattern=[];
level++;
$("#level-title").text("level "+level);
var randomNumber=Math.random();
randomNumber=Math.floor(randomNumber*4);
var randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
};
function playSound(sound){
  var audio=new Audio("sounds/"+sound+".mp3");
  audio.play();
};
function animatePress(clickedButton){
  $("#"+clickedButton).addClass("pressed");
  setTimeout(function(){
    $("#"+clickedButton).removeClass("pressed");
  },100)
};

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  };
}else {
    playSound("wrong")
    $("body").addClass("game-over");
    $("#level-title").text("game over press a key to continue");
    startOver();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
  }
};
function startOver(){
  level=0;
  gamePattern=[];
  started =false;
};
