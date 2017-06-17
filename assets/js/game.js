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
      focusFactors($(this), numbers, false);
    });

    $(value).click(function(){
      if(!$(this).hasClass("clicked")){
        $(this).css("background", USER_COLOR);
        $(this).addClass("clicked");

        calculateFactors(parseInt($(this).text()), numbers, false);

        if(!$(this).hasClass("scoreAdded")){
          var currentScore = parseInt($("#mypt").text());
          var numberToAdd = parseInt($(this).text())
          $("#mypt").text(currentScore + numberToAdd);
          opponentTurn(numbers);
        }
      }
    });

    $(value).mouseleave(function(){
      unfocusFactors($(this), numbers);
    });
  });

}

function calculateFactors(number, arr, opponent){
  for(var i = 1; i <= arr.length; i++){
    if(number%i == 0 && !opponent){
      $(arr[i-1]).addClass("clicked");
    } else if (number%i == 0 && opponent && !$(arr[i-1]).hasClass("clicked")) {
      $(arr[i-1]).addClass("clicked");
      $(arr[i-1]).addClass("opponent");
    }
  }
}

function opponentTurn(arr){
  var newArr = arr.map(function(item){
    if(!$(item).hasClass("clicked")){
      return $(item).text();
    }
  }).reverse();


  var factorsAdded = 0;
  var bestChoice = 0;
  var bestIndex = 0;
  newArr.forEach(function(number, index){
    for(var x = 0; x < newArr.length; x++){
      var intNum1 = parseInt(number);
      var intNum2 = parseInt(newArr[x]);
      var netDifference = 0;

      if(intNum1 % intNum2 == 0 && intNum2 !== intNum1){
        factorsAdded += intNum2;
      }

      if(x === newArr.length-1){
        netDifference = intNum1 - factorsAdded;

        if(netDifference > bestChoice){
          bestChoice = netDifference;
          bestIndex = index;
        }
      }
    }

    factorsAdded = 0;
    netDifference = 0;
  });

  // console.log(newArr);
  // console.log(bestChoice);
  // console.log(bestIndex);
  opponentMove(arr, arr.length-bestIndex-1);
}

function opponentMove(arr, index){
    setTimeout(function(){
      focusFactors($(arr[index]), arr, true);
      calculateFactors(parseInt($(arr[index]).text()), arr, true);

      if(!$(arr[index]).hasClass("scoreAdded")){
        var currentScore = parseInt($("#aipt").text());
        var numberToAdd = parseInt($(arr[index]).text());
        $("#aipt").text(currentScore + numberToAdd);
      }
    }, 2000);
}

function focusFactors(value, arr, opponent){
  setTimeout(function(){
    //calcualte the factors and hihglight opponent color
    var number = parseInt(value.text());

    if(!opponent && !$(value).hasClass("opponent")){
      $(value).css("background", USER_COLOR);
    } else {
      $(value).css("background", OPPONENT_COLOR);
    }

    for(var i = 0; i < number-1; i++){
      var temp = parseInt($(arr[i]).text());
      if(number%temp == 0 && !$(arr[i]).hasClass("clicked") && !opponent){
        $(arr[i]).css("background", OPPONENT_COLOR);
      } else if (number%temp == 0 && $(arr[i]).hasClass("opponent") && opponent) {
        $(arr[i]).css("background", USER_COLOR);
      }
    }
  }, 150);

  return arr;
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

  return arr;
}

function setWidth(){
  $(".game").width(GAME_WIDTH);
  $(".score").width(GAME_WIDTH);
}

function setHeight(){
  $(".game").height(100 * (GAME_SIZE/5) + ((GAME_SIZE)/5)*3);
}
