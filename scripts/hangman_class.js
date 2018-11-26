class Hangman {

    constructor(word, guessNum) {
        this.word = word.toLowerCase().split('')
        this.guessNum = guessNum,
        this.guessedLetters = [],
        this.status = 'playing'
    }

    checkStatus () {
        const remainingGuesses = this.guessNum > 0
        const allMatched = this.puzzle === this.word.join('')

        if (remainingGuesses && allMatched) {
            this.status = 'success'
        } else if (remainingGuesses && !allMatched) { // 숫자 0이하되고 매치안되었을경우
            this.status = 'playing'
        } else {
            this.status = 'fail'  // 숫자안남을 경우들
        }

        console.log(this.status)
    }

    getLetter (letterInput) {   //getLetter = "값" 이렇게 받아들이고 처리하는 상황인가?
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

    get puzzle () {   // 보이진 않지만 this.puzzle 을 만들게 됨 
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
    
    get message () {
        if (this.status === 'playing') {
            return `Guesses left : ${firstQuiz.guessNum}`
        } else if (this.status === 'success') {
            return 'Greate work! You guessed the word.'
        } else {
            return `Nice try! The word was "${this.word.join('')}"`
        }
    }

}
