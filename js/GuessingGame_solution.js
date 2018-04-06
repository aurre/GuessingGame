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
        $('#submit, #hint').prop('disabled', true);
        $('h1').text('You Win!');
        $('h2').text('Reset the game to play again');
        return 'You Win!'
    }
    else if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
            $('h1').text('You have already guessed that number. Try again!')
            return 'You have already guessed that number';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guesses li:nth-child(' + this.pastGuesses.length + ')').text(this.playersGuess)
            if (this.pastGuesses.length === 5) {
                $('#submit, #hint').prop('disabled', true);
                $('h1').text('Sorry, You Lose!')
                $('h2').text('Reset the game to play again');
                return 'You Lose!';
            }
            else {
                var diff = this.difference();
                if (this.isLower()) {
                    $('h2').text('Guess higher!');
                } else {
                    $('h2').text('Guess lower!')
                }
                if (diff < 10) return 'You\'re burning up!';
                else if (diff < 25) return 'You\'re lukewarm.';
                else if (diff < 50) return 'You\'re a bit chilly.';
                else return 'You\'re ice cold!';
            }
        }
}
Game.prototype.playersGuessSubmission = function(num) {
    this.playersGuess = num

    if (this.playersGuess <= 0 || this.playersGuess >= 100 ) {
        alert('Invalid input, try again');
        throw new Error('That is an invalid guess.');
    }
    if (isNaN(this.playersGuess)) {
        alert('Please enter a number');
        throw new Error('That is an invalid guess.');
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

function makeAGuess(game) {
    var inputNumber = +$('#player-input').val();
    $('#player-input').val('');
    var value = game.playersGuessSubmission(inputNumber);

    console.log(value);
    return value;
}


$(document).ready(function() {
    var game = newGame();

    $('#submit').on('click', function() {
        makeAGuess(game);


    });

    $('#player-input').on('keydown', function(event) {
        if (event.which === 13) {
            makeAGuess(game);

        }
    });


    $('#reset').on('click', function() {
        game = newGame();
        $('#guesses li').text('?');
        $('h1').text('Play the Guessing Game!');
        $('h2').text('Guess a number between 1-100!');
        $('#submit, #hint').prop('disabled', false);
    });

    $('#hint').on('click', function(){
       var hints =  game.provideHint();
       $('h1').text('The winning number is: ' + hints[0] + ' , ' + hints[1] + ' or ' + hints[2]);
    });
});
