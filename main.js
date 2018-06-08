var colorButtons = document.getElementsByClassName("quarter");
var startButton = document.getElementById("start-button");

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
			colorButtons[i].addEventListener("mouseup", clearAllLights);
		}	
		window.addEventListener('keydown', arrowKeysLogic);
		window.addEventListener('keyup', clearAllLights);
	}
}

function startButtonLogic() {
	//disable start button once game has started
	startButton.removeEventListener("click", startButtonLogic);

	checkLevelUp();
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

function selectButton(color){
	if (currentPlayerSequence.length < currentGameSequence.length && playerTurn) {
		currentPlayerSequence.push(color);
		lightUp(color);
		console.log(color, "selected.")
		console.log(currentPlayerSequence);
	}
}



function checkLevelUp(){

	if (currentPlayerSequence.toString() == currentGameSequence.toString()) {
		newColor = allColors[Math.floor(Math.random() * 4)];
		currentGameSequence.push(newColor);
		console.log(currentGameSequence);
		setTimeout(showSequence, 500, 0);
	}

	else {
		console.log("YOU LOSE");
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