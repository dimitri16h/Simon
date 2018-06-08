var colorButtons = document.getElementsByClassName("quarter");
var startButton = document.getElementById("start-button");
var cutouts = document.getElementsByClassName("cutout");
var currentScoreElement = document.getElementById("current-score-text");
var highScoreElement = document.getElementById("high-score-text");

var currentScore = 0;
var highScore = localStorage.getItem('highScore');
console.log(highScore);
if (highScore == null) {
	highScore = 0;
}
highScoreElement.innerHTML = "High Score: " + highScore;



var allColors = ["red", "blue", "yellow", "green"];
var currentGameSequence = [];
var currentPlayerSequence = [];
var newColor;

var playerTurn = false;
var arrowFired = false;

$(window).on('load',function(){
        $('#modal').modal('show');
    });

startButton.addEventListener("click", startButtonLogic);

document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		//Initialize buttons
		

		for (var i=0; i < colorButtons.length; i++) {
			colorButtons[i].addEventListener("mousedown", colorButtonLogic);
			colorButtons[i].addEventListener("mouseup", buttonReleaseLogic);
		}	
		window.addEventListener('keydown', arrowKeysLogic);
		window.addEventListener('keyup', buttonReleaseLogic);
	}
}

function startButtonLogic() {
	//disable start button once game has started
	startButton.removeEventListener("click", startButtonLogic);
	//startButton: hover off
	currentGameSequence=[];
	currentPlayerSequence=[];
	// checkLevelUp();
	currentScore = 0;
	currentScore.innerHTML = "Current Score: " + currentScore;

	var firstColor = allColors[Math.floor(Math.random() * 4)];
	currentGameSequence.push(firstColor);
	setTimeout(showSequence, 500, 0);
}

function colorButtonLogic(){
	if (this.id == "redButton") {selectButton("red")}
	else if (this.id == "yellowButton") {selectButton("yellow")}
	else if (this.id == "blueButton") {selectButton("blue")}
	else if (this.id == "greenButton") {selectButton("green")}
}

function arrowKeysLogic(){
	if (!arrowFired){
		if (event.keyCode == 37) {selectButton("yellow")}
		else if (event.keyCode == 38) {selectButton("red")}
		else if (event.keyCode == 39) {selectButton("blue")}
		else if (event.keyCode == 40) {selectButton("green")}
		arrowFired = true;
	}
}

function buttonReleaseLogic(){
	if (playerTurn) {
		clearAllLights();
	}
}

function selectButton(color){
	if (currentPlayerSequence.length < currentGameSequence.length && playerTurn) {
		currentPlayerSequence.push(color);
		lightUp(color);
		console.log(color, "selected.")
		console.log(currentPlayerSequence);
	}
}



function checkLevelUp(){

	playerTurn = false;

	if (currentPlayerSequence.toString() == currentGameSequence.toString()) {
		//if they got it right, add a new color to the end
		newColor = allColors[Math.floor(Math.random() * 4)];
		currentGameSequence.push(newColor);

		currentScore++;
		currentScoreElement.innerHTML = "Current Score: " + currentScore;

		console.log(currentGameSequence);
		//show the new sequence
		setTimeout(showSequence, 500, 0);
	}

	else {
		//if the sequences do not match:

		//enable start button for new game
		startButton.addEventListener("click", startButtonLogic);


		if (currentScore > highScore) {
			highScore = currentScore;
			highScoreElement.innerHTML = "High Score: " + highScore;
			localStorage.setItem('highScore', highScore);
		}


	}

}


function showSequence(i) {
	//Passed 0 to start for i, if i < current length, light up 
	//current color, then set time out to wait 1 second.
	//after the 1 second, it clears all lights, increments i by 1,
	//and calls showsequence passing in the new i.
	if (i<currentGameSequence.length) {
		lightUp(currentGameSequence[i]);
		setTimeout(incrementSequence, 1000, i);
 	}
 	else {
 		takePlayerSequence();
 	}
}

function incrementSequence(i) {
	clearAllLights();
	i++;
	setTimeout(showSequence, 200, i);
}

function takePlayerSequence() {
	playerTurn = true;
	currentPlayerSequence = [];
}






function lightUp(color) {
	if (color=="red"){
		colorButtons[0].style.border="thick solid #FFFFFF";
	}
	else if (color=="blue"){
		colorButtons[1].style.border="thick solid #FFFFFF";
	}
	else if (color=="yellow"){
		colorButtons[2].style.border="thick solid #FFFFFF";
	}
	else if (color=="green"){
		colorButtons[3].style.border="thick solid #FFFFFF";
	}
}

function clearAllLights() {
	arrowFired = false;
	for (var i=0; i<4; i++) {
		colorButtons[i].style.border="0px solid transparent";
	}
	if (currentPlayerSequence.length == currentGameSequence.length && currentGameSequence.length != 0) {
		checkLevelUp();
	}
}