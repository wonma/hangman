const puzzleEl = document.querySelector('#puzzle')
const guessNumEl = document.querySelector('#guess-num')
const firstQuiz = new Hangman('cat', 3)
const secondQuiz = new Hangman('cocacola', 3)


// Display puzzle and guessNum
const showResult = function (firstQuiz) {
    puzzleEl.textContent = firstQuiz.getPuzzle()
    guessNumEl.textContent = firstQuiz.showMessage()
}

// keypress event
window.addEventListener('keypress', function (e) {
    const letterInput = String.fromCharCode(e.charCode)
    firstQuiz.getLetter(letterInput) // push to array + decrement if needed
    showResult(firstQuiz)
})

// Default display
showResult(firstQuiz)