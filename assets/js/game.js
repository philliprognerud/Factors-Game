var GAME_SIZE = 30;
var GAME_WIDTH = 515;
var DEFAULT_COLOR = "#1DB01D";
var USER_COLOR = "#168484";
var OPPONENT_COLOR = "#EB4E4E";

init();

function init(){
  setWidth();
  setHeight();
  createBoard();
  setupNumbers();
}

function createBoard(){
  for(var i = 0; i < GAME_SIZE; i++){
    $(".game").append("<div class='number'>" + (i+1) + "</div>");
  }
}

function setupNumbers(){
  var numbers = [];

  $(".number").each(function(key, value){
    numbers.push(value);
    $(value).mouseenter(function(){
      focusFactors($(this), numbers);
    });

    $(value).click(function(){
      $(this).css("background", USER_COLOR);
      $(this).addClass("clicked");
    });

    $(value).mouseleave(function(){
      unfocusFactors($(this), numbers);
    });
  });
}

function focusFactors(value, arr){
  //calcualte the factors and hihglight opponent color
  var number = parseInt(value.text());
  $(value).css("background", USER_COLOR);
  for(var i = 1; i < number; i++){
    if(number%i == 0 && !$(arr[i-1]).hasClass("clicked")){
      $(arr[i-1]).css("background", OPPONENT_COLOR);
    }
  }
}

function unfocusFactors(value, arr, clicked){
  //calcualte the factors and hihglight opponent color
  var number = parseInt(value.text());

  if(!$(value).hasClass("clicked")){
    $(value).css("background", DEFAULT_COLOR);
  }

  for(var i = 1; i < number; i++){
    if(number%i == 0 && !$(arr[i-1]).hasClass("clicked")){
      $(arr[i-1]).css("background", DEFAULT_COLOR);
    }
  }
}

function setWidth(){
  $(".game").width(GAME_WIDTH);
  $(".score").width(GAME_WIDTH);
}

function setHeight(){
  $(".game").height(100 * (GAME_SIZE/5) + ((GAME_SIZE)/5)*3);
}
