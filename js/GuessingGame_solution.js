function generateWinningNumber() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      return getRandomInt(100) + 1;
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
}

function Game() {
    this.playersGuess = null
    this.pastGuesses = []
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess - this.winningNumber)
}

Game.prototype.isLower = function() {
    if (this.playersGuess < this.winningNumber) {
        return true
    }
    return false
}

Game.prototype.checkGuess = function() {

    if (this.playersGuess === this.winningNumber) {
        return 'You Win!'
    }
    else if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
}
Game.prototype.playersGuessSubmission = function(num) {
    this.playersGuess = num
    var hasBeenCalled = 0;

    if (this.playersGuess <= 0 || this.playersGuess >= 100 || typeof this.playersGuess !== 'number') {
        throw 'That is an invalid guess.'
    }

    return Game.prototype.checkGuess.call(this, num)
}

function newGame() {
    return new Game;
}

Game.prototype.provideHint = function() {
    var newArr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
    return shuffle(newArr);
}
