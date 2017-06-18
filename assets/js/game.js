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
var gameEnd = 0; //over once == arr.length

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
          highlightFactors(arr, $(this), false, false);

      } else if(event.type === "mouseleave"){
          $(this).css({"background": DEFAULT_COLOR});
          unhighlightFactors(arr, $(this));

      } else if(event.type === "click"){
          $(this).css({"background": USER_COLOR}).addClass("clicked").off('mouseenter mouseleave click');
          gameOver(arr);
          myScore += parseInt($(this).text())
          highlightFactors(arr, $(this), true, false);
          updateScores();
          $("#status").text("ai turn...");
          toggleUserclick(false);
          aiTurn(arr);
      }
    }
  });
}

function toggleUserclick(toggle){
  if(!toggle){
    $("body").append("<div class='overlay'></div>");
  } else {
    $("div").remove(".overlay");
  }
}

function gameOver(arr){
  if(gameEnd < arr.length){
    gameEnd += 1;
  } else if(gameEnd === arr.length){
    $("#status").text("GAME OVER!")
  }

}

function aiTurn(numbers){
  var highest = 0;
  var bestIndex = 0;

  $(numbers).each(function(index, number){
    if(!$(number).hasClass("clicked")){
      var n = parseInt($(number).text());
      var factorsAdded = 0;
      for(var i = 0; i < n-1; i++){
        if(n % parseInt($(numbers[i]).text()) == 0 && !$(numbers[i]).hasClass("clicked")){
          factorsAdded += parseInt($(numbers[i]).text());
        }

        if(i === n-2){
          var temp = n - factorsAdded;
          if(temp > highest){
            highest = temp;
            bestIndex = index;
          }
        }
      }
    }
  });

  gameOver(numbers);
  setTimeout(function(){
    $(numbers[bestIndex]).css({"background": OPPONENT_COLOR}).addClass("clicked");
    highlightFactors(numbers, $(numbers[bestIndex]), true, true);
    aiScore += parseInt($(numbers[bestIndex]).text());
    updateScores();
    $("#status").text("your turn!");
    toggleUserclick(true);
  }, 2500);
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

function highlightFactors(arr, number, clicked, ai){
  var n = parseInt(number.text());
  for(var i = 0; i < n-1; i++){
    if(n % parseInt($(arr[i]).text()) == 0){
      if(!$(arr[i]).hasClass("clicked") && clicked){
        if(!ai){
          $(arr[i]).css({"background": OPPONENT_COLOR}).addClass("clicked").off('mouseenter mouseleave click');
          aiScore += parseInt($(arr[i]).text());
          gameOver(arr);
        } else {
          $(arr[i]).css({"background": USER_COLOR}).addClass("clicked").off('mouseenter mouseleave click');
          myScore += parseInt($(arr[i]).text());
          gameOver(arr);
        }

      } else if(!$(arr[i]).hasClass("clicked")) {
        $(arr[i]).css({"background": OPPONENT_COLOR});
      }
    }
  }
}

function createBoard(){
  for(var i = 0; i < GAME_SIZE; i++){
    $(".game").append("<div class='number fadein'>" + (i+1) + "</div>");
    $(".number").css({"background": DEFAULT_COLOR, "cursor": "pointer"});
  }
  setHeight();
  setWidth();
  $("#status").text("your turn!");
}



function setWidth(){
  $(".game").width(GAME_WIDTH);
  $(".score").width(GAME_WIDTH);
  $("h1, .stripe").width(GAME_WIDTH);
  $(".number").css({
    "width": SQUARE_DIMENSION,
    "height": SQUARE_DIMENSION,
    "margin": MARGINS
  });
}

function setHeight(){
  $(".game").height(SQUARE_DIMENSION * (GAME_SIZE/NUM_COLUMNS) + (GAME_SIZE/NUM_COLUMNS) * (MARGINS*2));
}
