// exports a constructor for creating cloze flashcards

// global (g) replaces all instances of omitted text with .....
// ignore case (i) replaces matching text regardless if upper or lower case
function ClozeCard(full, omitted) {
	if (this instanceof ClozeCard) {
		this.full = full;
		this.omitted = omitted;
		this.partial = full.replace(omitted, " ..... ");
	} else {
		return new ClozeCard(full, omitted);
	}
};

module.exports = ClozeCard;


