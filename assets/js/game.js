var GAME_SIZE = 30;
var GAME_WIDTH = 515;
var DEFAULT_COLOR = "green";
var USER_COLOR = "blue";

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
  $(".number").each(function(key, value){
    $(value).mouseenter(function(){
      $(this).css("background-color", USER_COLOR);
      focusFactors($(this));
    });

    $(value).mouseleave(function(){
      $(this).css("background-color", DEFAULT_COLOR);
    });
  });
}

function focusFactors(value){
  //calcualte the factors and hihglight opponent color
  var number = parseInt(value.text());

}

function setWidth(){
  $(".game").width(GAME_WIDTH);
  $(".score").width(GAME_WIDTH);
}

function setHeight(){
  $(".game").height(100 * (GAME_SIZE/5) + ((GAME_SIZE)/5)*3);
}
