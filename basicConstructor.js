//Node module that exports a constructor for creating basic flashcards
//for info on scope-safe constructors: http://rainyjune.net/node/348, http://mikepackdev.com/blog_posts/9-new-scope-safe-constructors-in-oo-javascript

var fs = require("fs");

//makes scope-safe constructor so user can call with or without the new keyword
var BasicCard = function(front, back) {
	//if 'this' is a BasicCard object....
	if (this instanceof BasicCard) {
	    this.front = front; 
	    this.back = back;
    //if not (ex. it's a window object), call constructor again but with new operator
	} else {
		return new BasicCard(front, back);
	}
};

module.exports = BasicCard;




	


