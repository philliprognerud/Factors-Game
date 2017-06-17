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
    $(".game").append("<div class='number fadein'>" + (i+1) + "</div>");
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
      if(!$(this).hasClass("clicked")){
        $(this).css("background", USER_COLOR);
        $(this).addClass("clicked");

        if(!$(this).hasClass("scoreAdded")){
          var currentScore = parseInt($("#mypt").text());
          var numberToAdd = parseInt($(this).text())
          $("#mypt").text(currentScore + numberToAdd);
        }

        console.log(numbers);
        opponentTurn(numbers);
        console.log(numbers);
      }
    });

    $(value).mouseleave(function(){
      unfocusFactors($(this), numbers);
    });
  });
}

function opponentTurn(arr){
  var newArr = arr.map(function(item){
    if(!$(item).hasClass("clicked")){
      return $(item).text();
    }
  });

  console.log(newArr);

  newArr = newArr.filter(function(element) {
    return element !== undefined;
  }).reverse();

  // console.log(newArr);

  var bestChoice = 0;
  var bestIndex;
  newArr.forEach(function(number, index){
    for(var i = 0; i < index; i++){
      if(number%newArr[i] == 0){
        var temp = number - newArr[i];
        if(temp > bestChoice){
          bestChoice = temp;
          bestIndex = i;
        }
      }
    }
  });

  // console.log(bestChoice);
  // console.log(bestIndex);
  // console.log(newArr[bestIndex]);
}

function focusFactors(value, arr){
  setTimeout(function(){
    //calcualte the factors and hihglight opponent color
    var number = parseInt(value.text());
    var clicked = $(value).hasClass("clicked");

    if(!clicked){
      $(value).css("background", USER_COLOR);
    }

    for(var i = 1; i < number; i++){
      if(number%i == 0 && !$(arr[i-1]).hasClass("clicked")){
        $(arr[i-1]).css("background", OPPONENT_COLOR);
      }
    }
  }, 150);
}

function unfocusFactors(value, arr){
  //calcualte the factors and hihglight opponent color
  setTimeout(function(){
    var number = parseInt(value.text());
    var clicked = $(value).hasClass("clicked");

    if(!clicked){
      $(value).css("background", DEFAULT_COLOR);
    }

    for(var i = 1; i < number; i++){
      if(number%i == 0 && !clicked && !$(arr[i-1]).hasClass("clicked")){
        $(arr[i-1]).css("background", DEFAULT_COLOR);
      } else if (number%i == 0 && clicked){
        $(arr[i-1]).addClass("clicked");
      }
    }
  }, 150);
}

function setWidth(){
  $(".game").width(GAME_WIDTH);
  $(".score").width(GAME_WIDTH);
}

function setHeight(){
  $(".game").height(100 * (GAME_SIZE/5) + ((GAME_SIZE)/5)*3);
}
