var simonPattern = []
var yourPattern = []
var roundNumber = 0


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkUserInput() {
	if (yourPattern[yourPattern.length-1] !== simonPattern[yourPattern.length-1]) {
		$("#gladosFun").get(0).play();
		simonPattern = []
		yourPattern = []
		roundNumber = 0
		$("#winStatus").html("You Lose!")
		$(startBtn).prop("disabled",false);
	}else if (simonPattern.length == yourPattern.length) {
		if((roundNumber % 3) == 0) {
			$("#gladosSuccess").get(0).play();
		}
		$(startBtn).prop("disabled",false);
		yourPattern = []
		$("#winStatus").html("Congratulations! " + roundNumber)
		$(".simonBtn").prop("disabled",true)
	}
}

function allowUserInput(){
	setTimeout(function(){
		$(".simonBtn").prop("disabled",false)
	}, (roundNumber*1000)+1)
}

function animateButtons() {
	simonPattern.forEach(function(color, index, simonPattern) {
		setTimeout(function() {
			$('#' + color).animate({
				opacity: 1
			}, 50).animate({
				opacity: 0.5
			}, 1000, function() {
				$(this).css('opacity', '');
			});
		}, (index * 1000)+1)
	})
}

$("#startBtn").click(function() {
	roundNumber++
	hideSecret();
	$("#winStatus").html("")
	if (roundNumber > 0) {
		$("#startBtn").html("Start new round?")
	} else {
		$("#startBtn").html("Start!")
	}
	$(".simonBtn").prop("disabled",true)
	$("#startBtn").prop("disabled",true);
	do {
		var randomNumber = getRandomInt(1, 5);
		if (randomNumber == 1) {
			simonPattern.push("redBtn")
			animateButtons();
		} else if (randomNumber == 2) {
			simonPattern.push("yellowBtn")
			animateButtons();
		} else if (randomNumber == 3) {
			simonPattern.push("greenBtn")
			animateButtons();
		} else if (randomNumber == 4) {
			simonPattern.push("blueBtn")
			animateButtons();
		}
		allowUserInput();
		revealSecret();
	} while (simonPattern.length < roundNumber);

})

$("#redBtn").click(function() {
	yourPattern.push("redBtn");
	checkUserInput();
	$("#portalSound").get(0).play();
})
$("#yellowBtn").click(function() {
	yourPattern.push("yellowBtn");
	checkUserInput();
	$("#portalSound2").get(0).play();
})
$("#greenBtn").click(function() {
	yourPattern.push("greenBtn");
	checkUserInput();
	$("#portalSound3").get(0).play();
})
$("#blueBtn").click(function() {
	yourPattern.push("blueBtn");
	checkUserInput();
	$("#portalSound4").get(0).play();
})










var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
var keysCorrect = [];
var secretNumber = 0

$("#restartBtn").click(function() {
	$("#restartBtn").prop("disabled",true)
	animateButtons();
	setTimeout(function() {
		$("#restartBtn").prop("disabled",false)
	}, (simonPattern.length * 1000)+2)
})

$(document).ready(function() {
	secretNumber = (getRandomInt(1, 5) + 2)
	console.log(secretNumber)
})

$(document).keyup(function(event){
	console.log(event.keyCode);
	keysCorrect.push(event.keyCode);

	if (keysCorrect[keysCorrect.length-1] != konamiCode[keysCorrect.length-1]) {
		keysCorrect = [];
	}

	if (keysCorrect.length == konamiCode.length) {
		$("#restartBtn").removeClass("hidden")
		$("#gladosCheat").get(0).play();
		setTimeout(function() {
		$("#stillAlive").get(0).play();
		}, 4000)
	}
});

function revealSecret() {
	if (roundNumber == secretNumber) {
		$("#secret").removeClass("hidden")
		$("#gladosWee").get(0).play();
		$("#winStatus").html("What was that?")
	}
}

function hideSecret() {
	$("#secret").addClass("hidden")
}