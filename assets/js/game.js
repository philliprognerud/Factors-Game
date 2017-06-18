var GAME_SIZE = 30;
var NUM_COLUMNS = 5;
var SQUARE_DIMENSION = 100;
var MARGINS = 1.5;
var GAME_WIDTH = 515;

var DEFAULT_COLOR = "#1DB01D";
var USER_COLOR = "#168484";
var OPPONENT_COLOR = "#EB4E4E";

var myScore = 0;
var aiScore = 0;

init();

function init(){
  createBoard();
  addGameListeners();
}

function addGameListeners(){
  var arr = $(".number").on("mouseenter mouseleave click", function(event){
    if(!$(this).hasClass("clicked")){
      if(event.type === "mouseenter"){
          $(this).css({"background": USER_COLOR});
          highlightFactors(arr, $(this), false);

      } else if(event.type === "mouseleave"){
          $(this).css({"background": DEFAULT_COLOR});
          unhighlightFactors(arr, $(this));

      } else if(event.type === "click"){
          $(this).css({"background": USER_COLOR}).addClass("clicked").off('mouseenter mouseleave click');
          myScore += parseInt($(this).text())
          highlightFactors(arr, $(this), true);
          updateScores();
      }
    }
  });
}

function updateScores(){
  $("#mypt").text(myScore);
  $("#aipt").text(aiScore);
}

function unhighlightFactors(arr, number){
  var n = parseInt(number.text());
  for(var i = 0; i < arr.length-1; i++){
    if(n % parseInt($(arr[i]).text()) == 0) {
      if(!$(arr[i]).hasClass("clicked")){
        $(arr[i]).css({"background": DEFAULT_COLOR});
      }
    }
  }
}

function highlightFactors(arr, number, clicked){
  var n = parseInt(number.text());
  for(var i = 0; i < n-1; i++){
    if(n % parseInt($(arr[i]).text()) == 0){
      if(!$(arr[i]).hasClass("clicked") && clicked){
        $(arr[i]).css({"background": OPPONENT_COLOR}).addClass("clicked").off('mouseenter mouseleave click');
        aiScore += parseInt($(arr[i]).text());
      } else {
        $(arr[i]).css({"background": OPPONENT_COLOR});
      }
    }
  }
}

function createBoard(){
  for(var i = 0; i < GAME_SIZE; i++){
    $(".game").append("<div class='number fadein'>" + (i+1) + "</div>");
    $(".number").css({"background": DEFAULT_COLOR});
  }
  setHeight();
  setWidth();
}



function setWidth(){
  $(".game").width(GAME_WIDTH);
  $(".score").width(GAME_WIDTH);
  $(".number").css({
    "width": SQUARE_DIMENSION,
    "height": SQUARE_DIMENSION,
    "margin": MARGINS
  });
}

function setHeight(){
  $(".game").height(SQUARE_DIMENSION * (GAME_SIZE/NUM_COLUMNS) + (GAME_SIZE/NUM_COLUMNS) * (MARGINS*2));
}
