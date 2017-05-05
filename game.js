
//required npm packages
var fs = require("fs");
var inquirer = require("inquirer");
var fs = require("fs");
//Node package that displays terminal colors
var chalk = require("chalk");

//required files containing pre-made constructors
var BasicCard = require("./basicConstructor.js");
var ClozeCard = require("./clozeConstructor.js");

//holds quest/answ set user selects or creates
var cardSet = [];
//starting index to loop through cardSet
var indexCount = 0;

function makeBasicCard() {
	inquirer.prompt([
		{
			name: "front",
			message: "What question would you like to put on your card?"
		},
		{
			name: "back",
			message: "What is the answer?"
		}
	]).then(function(response) {
		cardSet.push(new BasicCard(response.front, response.back));				
		inquirer.prompt([
			{
				name: "continue",
				message: "Would you like to make another card?",
				type: "confirm"
			}
		]).then(function(response){
			if (response.continue) {
				makeBasicCard();
			}
			else {
				playBasicGame(cardSet);
			}
		});
	});
}//ends makeBasicCard()

function makeClozeCard() {
	inquirer.prompt([
		{
			name: "full",
			message: "What is your full text?"
		},
		{
			name: "omitted",
			message: "Which part do you want to take out?"
		}
	]).then(function(response) {
		if ((response.full).includes(response.omitted)) {
			cardSet.push(new ClozeCard(response.full, response.omitted));
		} 
		else {
			console.log("Error: That value does not exist in the sentence.");
      		makeClozeCard();
      		return false;
		}
		inquirer.prompt([
			{
				name: "continue",
				message: "Would you like to make another card?",
				type: "confirm"
			}
		]).then(function(response){
			if (response.continue) {
				makeClozeCard();
			}
			else {
				playClozeGame(cardSet);
			}
		});
	});
}//ends makeClozeCard()

function playBasicGame() {
	if (indexCount < cardSet.length) {
		console.log("\n--------------------------------\n");
		inquirer.prompt([
			{
				name: "front",
				message: cardSet[indexCount].front	
			}
		]).then(function(answer) {
			if (answer.front === cardSet[indexCount].back) {
				console.log("You got it right!");
			}
			else {
				console.log("That's not right. The correct answer is: " + cardSet[indexCount].back);
			}
			indexCount++;
			playBasicGame(cardSet);
		});		
	}// end of if (basicIndexCount < cardSet.length)
	else {
		//empties array so can insert a new set of cards
		nextAction();
	}	
};//end of playBasicGame()

function playClozeGame() {
	if (indexCount < cardSet.length) {
		console.log("\n--------------------------------");
		inquirer.prompt([
			{
			name: "partial",
			message: "Complete the sentence:" + cardSet[indexCount].partial	
			}
		]).then(function(answer) {
			if (answer.partial === cardSet[indexCount].omitted) {
				console.log("You got it right!");
			}
			else {
				console.log("That's not right. The correct answer is: " + cardSet[indexCount].full);
			}
			indexCount++;
			playClozeGame(cardSet);
		});		
	}// end of if going through card set array
	else {
		nextAction();
	}		
};//end of playClozeGame function

function delegateAction(response) {
	//reset cardSet and indexCount for nextAction
	cardSet = [];
	indexCount = 0;
	//NOTE TO SELF: Could have been done without constructor using just var cardSet = require("./basicQuestions.json"); askBasicFlashcards(); but constructors required here for assignment
	if (response.action === "Play Basic Flashcards Game") {
		//gets basic questions and answers from JSON file			
		var basicDeck = require("./basicQuestions.json");
		//uses basicDeck to create cards with constructor and pushes them into cardSet array			
		for (var i = 0; i < basicDeck.length; i++) {
			cardSet.push(new BasicCard(basicDeck[i].front, basicDeck[i].back))
		}
		playBasicGame();
	}
	//NOTE TO SELF: here constructor needed because JSON file doesn't contain partial text
	else if (response.action === "Play Cloze Flashcards Game") {
		var clozeDeck = require("./clozeQuestions.json");
		for (var i = 0; i < clozeDeck.length; i++) {
			cardSet.push(new ClozeCard(clozeDeck[i].full, clozeDeck[i].omitted))
		}
		playClozeGame();
	}
	else if (response.action === "Make My Own Flashcard Game") {
		inquirer.prompt([
			{
				name: "cardType",
				message: "Which type of cards do you want to make?",
				type: "list",
				choices: ["BASIC", "CLOZE"]
			}
		]).then(function(response) {
			if (response.cardType === "BASIC") {
				makeBasicCard();
			}
			//if user chooses CLOZE
			else {
				makeClozeCard();
			}
		});
	}
	//if user chooses "Quit" as a next action 
	else {
		console.log("Thanks for playing. Goodbye.")
	}
}//ends delegateAction()

function nextAction() {
	inquirer.prompt([
		{
			name: "action",
			message: "\nGame Over! What would you like to do next?",
			type: "list",
			choices: ["Play Basic Flashcards Game", "Play Cloze Flashcards Game", "Make My Own Flashcard Game", "Quit"]
		}
	]).then(function(response) {
		delegateAction(response);
	});
}

//begins app
inquirer.prompt([
	{
		name: "action",
		message: "What would you like to do?",
		type: "list",
		choices: ["Play Basic Flashcards Game", "Play Cloze Flashcards Game", "Make My Own Flashcard Game"]
	}
]).then(function(response) {
	delegateAction(response);
});

	