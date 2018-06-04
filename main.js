var colorButtons = document.getElementsByClassName("quarter");

var allColors = ["red", "blue", "yellow", "green"];
var currentGameSequence = []
var newColor;

$(window).on('load',function(){
        $('#modal').modal('show');
    });

document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		//Initialize buttons
		var startButton = document.getElementById("start-button");

		for (var i=0; i < colorButtons.length; i++) {
			colorButtons[i].addEventListener("click", buttonLogic);
		}	
		startButton.addEventListener("click", startGame);
		window.addEventListener('keydown', arrowKeysLogic);
	}

	function buttonLogic(){
		console.log(this.id);
	}

	function arrowKeysLogic(){
		if (event.keyCode == 37){
			console.log("yellowButton");
		}
        else if (event.keyCode == 38){
        	console.log("redButton");
        }
        else if (event.keyCode == 39) {
        	console.log("blueButton");
        }
        else if (event.keyCode == 40) {
        	console.log("greenButton");
        }
	}

	function selectButton(color){
		if (color == "red") {

		}

	}

	function startGame() {
		newColor = allColors[Math.floor(Math.random() * 4)];
		currentGameSequence.push(newColor);
		showSequence();
		console.log(currentGameSequence);
			
			// flash color
			// wait for input
			// end or flash more
	}

	function showSequence() {
		var i = 0;
	 	var moves = setInterval(function(){
	 	clearAllLights();
	    lightUp(currentGameSequence[i]);
	    i++;
	    if (i > currentGameSequence.length) {
	      clearAllLights();
	    }
	  }, 2000)
	}

	function lightUp(color) {
		if (color=="red"){
			console.log("Changing reds border");
			colorButtons[0].style.border="thick solid #FFFFFF";
		}
		else if (color=="blue"){
			console.log("Changing blues border");
			colorButtons[1].style.border="thick solid #FFFFFF";
		}
		else if (color=="yellow"){
			console.log("Changing yellows border");
			colorButtons[2].style.border="thick solid #FFFFFF";
		}
		else if (color=="green"){
			console.log("Changing greens border");
			colorButtons[3].style.border="thick solid #FFFFFF";
		}
	}

	function clearAllLights() {
		for (var i=0; i<4; i++) {
			colorButtons[i].style.border="0px solid transparent";
		}
	}
}