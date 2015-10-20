console.log("main js is linked");

$(document).ready(function(){
//start of game

//Variables
var secretWords = ["bread","dog","computer","mississipi","rabbit"];
var inputLetter; //stores input letter
var word;
var hiddenWord = [];
var usedLetters = [];
var counter = 7;
var hangCounter = 0;
var hangman = ["./hang/hang0.gif","./hang/hang1.gif",
"./hang/hang2.gif","./hang/hang3.gif", "./hang/hang4.gif",
"./hang/hang5.gif","./hang/hang6.gif"];



var setHiddenWord = function(){
	for(var i=0;i<word.length;i++){
		hiddenWord[i] = "_";
	}

}

var getInput = function(){
	return inputLetter; 
}

var setWord = function(){
	word = secretWords[generateWord(secretWords)];
}

var compareInput = function(word,letter){
	var check;
	for(var i=0;i<word.length;i++){
		if(letter === word[i]){
			hiddenWord[i] = letter;
			check = true;
			
		}
	}
	if(check === true){
		return true;
	}else{
		usedLetters.push(letter);
		counter--;
		$("img").attr("src",hangman[hangCounter]);
		hangCounter++;

	}

	
	
}

$("#submit-word").click(function(){	
	console.log("YOU GUESSESD WORD");
	var wordGuess = $('#guess-word').val();
	if( wordGuess === word){
		$('div.word').text(wordGuess);
		alert("your a winner!");
		window.location.replace("./index.html");
	} else {
		alert('nope.');
		counter--;
		$("img").attr("src",hangman[hangCounter]);
		$(".guesses").text(counter);
		
		hangCounter++;
		if(counter == 0){
			alert("You lost the game!");
			window.location.replace("./index.html");
		}
		
	}
})

var generateWord = function(secretWord){
	//returns index of the word from the list;
	return Math.floor((Math.random() * secretWord.length) + 0);
}

var restartGame = function(){

}
var startGame = function(){
//initialize game
//get input from submit button is clicked
	setWord();
	setHiddenWord();
	$(".word").text(hiddenWord.join(" "));
	$(".guesses").text(counter);

//When user inputs
$("#submit").click(function(){

	inputLetter = $("#letter").val();
	compareInput(word,inputLetter);
	$(".word").text(hiddenWord.join(" "));
	$(".guesses").text(counter);
	$(".used").text(usedLetters.join(" "));
	if(counter == 0){
		alert("You lost the game!");
	}
	if(counter == 1){
		alert("You have one guess remaining!")
		$(".guesses").css("background-color","red");
	}
	if(hiddenWord.join("") === word){
		alert("You won!")
		window.location.replace("./index.html");
	}
	$("#letter").val("")

})








}

startGame();


});
