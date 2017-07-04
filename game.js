
//required npm packages
var fs = require("fs");
var inquirer = require("inquirer");
//displays terminal colors
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
			message: chalk.blue("What question would you like to put on your card?"),
			validate: function (response){
				if(!response)
					return chalk.red("You must enter a response!");
				else
					return true;
			}
		},
		{
			name: "back",
			message: chalk.blue("What is the answer?"),
			validate: function (response){
				if(!response)
					return chalk.red("You must enter a response!");
				else
					return true;
			}
		}
	]).then(function(response) {
		cardSet.push(new BasicCard(response.front, response.back));				
		inquirer.prompt([
			{
				name: "continue",
				message: chalk.magenta("Would you like to make another card?"),
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
			message: chalk.blue("What is your full text?"),
			validate: function (response){
				if(!response)
					return chalk.red("You must enter a response!");
				else
					return true;
			}
		},
		{
			name: "omitted",
			message: chalk.blue("Which part do you want to take out?"),
			validate: function (response){
				if(!response)
					return chalk.red("You must enter a response!");
				else
					return true;
			}
		}
	]).then(function(response) {
		if ((response.full).includes(response.omitted)) {
			cardSet.push(new ClozeCard(response.full, response.omitted));
		} 
		else {
			console.log(chalk.red("Error: That value does not exist in the sentence."));
      		makeClozeCard();
      		return false;
		}
		inquirer.prompt([
			{
				name: "continue",
				message: chalk.magenta("Would you like to make another card?"),
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
		console.log("\n" + chalk.yellow.bold("--------------------------------") + "\n");
		inquirer.prompt([
			{
				name: "front",
				message: chalk.blue(cardSet[indexCount].front)	
			}
		]).then(function(answer) {
			if ((answer.front).toUpperCase() === (cardSet[indexCount].back).toUpperCase()) {
				console.log(chalk.green.bold("You got it right!"));
			}
			else {
				console.log(chalk.red("That's not right. The correct answer is: " + cardSet[indexCount].back));
			}
			indexCount++;
			playBasicGame(cardSet);
		});		
	}// ends if (basicIndexCount < cardSet.length)
	else {
		nextAction();
	}	
};//ends playBasicGame()

function playClozeGame() {
	if (indexCount < cardSet.length) {
		console.log("\n" + chalk.yellow.bold("--------------------------------"));
		inquirer.prompt([
			{
			name: "partial",
			message: chalk.blue("Complete the sentence:\n" + cardSet[indexCount].partial)	
			}
		]).then(function(answer) {
			//checks if user selected correct answer regardless of case 
			if ((answer.partial).toUpperCase() === (cardSet[indexCount].omitted).toUpperCase()) {
				console.log(chalk.green.bold("You got it right!"));
			}
			else {
				console.log(chalk.red("That's not right. The correct answer is: " + cardSet[indexCount].full));
			}
			indexCount++;
			playClozeGame(cardSet);
		});		
	}// ends if (indexCount < cardSet.length)
	else {
		nextAction();
	}		
};//ends playClozeGame function

function delegateAction(response) {
	//resets cardSet and indexCount for nextAction
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
				message: chalk.magenta("Which type of cards do you want to make?"),
				type: "list",
				choices: ["Basic", "Cloze"]
			}
		]).then(function(response) {
			if (response.cardType === "Basic") {
				makeBasicCard();
			}
			//if user chooses Cloze
			else {
				makeClozeCard();
			}
		});
	}
	//if user chooses "Quit" as a next action 
	else {
		console.log(chalk.magenta.bold("Thanks for playing. Goodbye."));
	}
}//ends delegateAction()

function nextAction() {
	inquirer.prompt([
		{
			name: "action",
			message: "\n" + chalk.magenta("Game Over! What would you like to do next?"),
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
		message: chalk.magenta("What would you like to do?"),
		type: "list",
		choices: ["Play Basic Flashcards Game", "Play Cloze Flashcards Game", "Make My Own Flashcard Game"]
	}
]).then(function(response) {
	delegateAction(response);
});

	
