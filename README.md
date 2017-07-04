
# Flashcard-Generator

A Node.js command line application that lets users create and use basic and cloze flashcards

 
## Table of Contents

[:computer:  Technologies Used](#technologies-used)

[:dvd:  Installation](#installation)

[:crystal_ball:  Usage](#usage)

[:bust_in_silhouette:  Developer](#developer)

[:email:  Questions or Comments](#questions-or-comments)


## <a name="technologies-used"></a> :computer: Technologies Used 

* Node.js
* Terminal/Gitbash
* Node Modules
	* [fs](https://www.npmjs.com/package/file-system) 
	* [inquirer](https://www.npmjs.com/package/inquirer) 
	* [chalk](https://www.npmjs.com/package/chalk)
	

## <a name="installation"></a> :dvd: Installation 

* Install [Node.js](https://nodejs.org/en/download/), if you don't have it.
* Clone the Flashcard-Generator repository to your local computer.
* On your terminal, navigate to the folder where the repository is located.
* Run the command `npm install` to download all required dependencies.


## <a name="usage"></a> :crystal_ball: Usage 

* On your terminal, navigate to the folder where the repository is located.
* Run the command `node game.js` to use the app.


**When Flashcard Generator is first run...**
the user is given options to play the basic or cloze flashcard game, or to make flashcards.

![screenshot of app](/screenshots/start.png)


**If the user chooses to play the basic flashcard game...**
the user is asked a basic flashcard question.

![screenshot of app](/screenshots/basic.png)


**If the user answers the question correctly, using lower or upper case...**
a congratulatory response is displayed with the next question.

![screenshot of app](/screenshots/basic_congratulations.png)**


**If the user answers the question incorrectly...**
the user is given the correct answer with the next question.

![screenshot of app](/screenshots/basic_next_question.png)**


**When all of the basic questions have been answered...**
the user is given options to play the basic or cloze flashcard game, to make flashcards, or to quit.

![screenshot of app](/screenshots/basic_options.png)


**If the user chooses to play the cloze flashcard game...**
the user is asked a cloze flashcard question (a sentence that has had some of its text removed).

![screenshot of app](/screenshots/cloze.png)


**If the user completes the sentence correctly, using lower or upper case...**
a congratulatory response is displayed with the next question.

![screenshot of app](/screenshots/cloze_congratulations.png)**


**If the user answers the question incorrectly...**
the user is given the correct answer with the next question.

![screenshot of app](/screenshots/cloze_next_question.png)**


**When all of the basic questions have been answered...**
the user is given options to play the basic or cloze flashcard game, to make flashcards, or to quit.

![screenshot of app](/screenshots/cloze_options.png)


**If the user chooses to make his or her own flashcards...**
the user is asked to choose between basic or cloze flashcards.

![screenshot of app](/screenshots/card_choices.png)


**If the user chooses to make basic flashcards...**
the user is prompted to enter the question and answer for the card.

![screenshot of app](/screenshots/make_basic.png)


**After the user enters the answer...**
the user is asked if he or she would like to make another flashcard.

![screenshot of app](/screenshots/yes_no.png)


**If the user answers yes...**
the user is prompted to enter the question and answer for the card.

![screenshot of app](/screenshots/yes.png)


**If the user answers no...**
a flashcard game begins using the user created basic flashcards.

![screenshot of app](/screenshots/no.png)


**If the user chooses to make cloze flashcards...**
the user is prompted to enter an entire sentence and the part of the sentence he or she would like removed.

![screenshot of app](/screenshots/make_cloze.png)


**After the user completes the first flashcard question...**
the user is asked if he or she would like to make another flashcard.

![screenshot of app](/screenshots/yes_no_cloze.png)


**If the user answers yes...**
the user is prompted to enter an entire sentence and the part of the sentence he or she would like removed.

![screenshot of app](/screenshots/yes_cloze.png)


**If the user answers no...**
a flashcard game begins using the user created cloze flashcards.

![screenshot of app](/screenshots/no_cloze.png)


**When all of the questions have been answered...**
the user is given options to play the basic or cloze flashcard game, to make flashcards, or to quit.

![screenshot of app](/screenshots/end_questions.png)


**If the user chooses to quit...**
the user is thanked for playing and told goodbye.

![screenshot of app](/screenshots/quit.png)


## <a name="developer"></a> :bust_in_silhouette: Developer

* Maria Wong 


## <a name="questions-or-comments"></a> :email: Questions or Comments 

If you have any questions or comments, feel free to message me on [LinkedIn](https://www.linkedin.com/in/maria-wong/).

Thanks for checking out Flashcard Generator!
