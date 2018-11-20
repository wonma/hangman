const Hangman = function (word, guessNum) {  // Constructor
    this.word = word.toLowerCase().split('')
    this.guessNum = guessNum,
    this.guessedLetters = [],
    this.status = 'playing'
}

Hangman.prototype.checkStatus = function (){
    const remainingGuesses = this.guessNum > 0
    const allMatched = this.getPuzzle() === this.word.join('')

    if(remainingGuesses && allMatched) {
        this.status = 'success'
    } else if(remainingGuesses && !allMatched) { // 숫자 0이하되고 매치안되었을경우
        this.status = 'playing'
    } else {  
        this.status = 'fail'  // 숫자안남을 경우들
    }

    console.log(this.status)
}

Hangman.prototype.getLetter = function (letterInput) {

    if (this.status !== 'playing') {
        return
    }

    const isNewLetter = !this.guessedLetters.includes(letterInput)
    const isNoMatch = !this.word.includes(letterInput)

    if (isNewLetter) {
        this.guessedLetters.push(letterInput)
    } else {
        alert('You already typed ' + letterInput)
    }

    if (isNewLetter && isNoMatch) {
        this.guessNum--
    }
    this.checkStatus()
}


Hangman.prototype.getPuzzle = function () {
    let output = ''

    this.word.forEach((letter) => {
        if (this.guessedLetters.includes(letter) || letter === ' ') {
            return output = output + letter
        } else {
            return output = output + '*'
        }
    })

    return output
}

Hangman.prototype.showMessage = function () {
    if (this.status === 'playing') {
        return `Guesses left : ${firstQuiz.guessNum}`
    } else if (this.status === 'success') {
        return 'Greate work! You guessed the word.'
    } else {
        return `Nice try! The word was ${this.word.join('')}`
    }
}