const puzzleEl = document.querySelector('#puzzle')
const guessNumEl = document.querySelector('#guess-num')
const firstQuiz = new Hangman('cat toy', 3)
const secondQuiz = new Hangman('cocacola', 3)


// Display puzzle and guessNum

puzzleEl.textContent = firstQuiz.puzzle
guessNumEl.textContent = firstQuiz.message

// keypress event
window.addEventListener('keypress', (e) => {
    const letterInput = String.fromCharCode(e.charCode)
    firstQuiz.getLetter(letterInput) // push to array + decrement if needed
    // 이녀석을 firstQuiz.letter = letterInput 으로해서 setter 설정할 수 있긴하지만, 
    // firstQuiz.letter값에 접근할 일이 없으면 굳이 setter로 코딩할 이유가 없음
    // method는 지금처럼 method스럽게 남겨둘 필요도 있음. (value를 fetch할 게 아니라면)

    puzzleEl.textContent = firstQuiz.puzzle
    guessNumEl.textContent = firstQuiz.message
})

const request = new XMLHttpRequest()

// 어떤 상황이 감지되었을 때 해당 response(string)을 JSON parse하여 object로 변환하고싶어
request.addEventListener('readystatechange', (e) => {
    // 두 조건이 성립 할 때
    if (e.target.readyState === 4 && e.target.status === 200) {
        const quizText = JSON.parse(e.target.responseText)
        console.log(quizText)
    } else if (e.target.readyState === 4) {
        console.log('An error has taken place.')
    }
    // 주소에 오류가 있으면 400 status 로 뜸
})

request.open("GET", "http://puzzle.mead.io/puzzle") // initialize a request
request.send() // sends the request to the server. 
// If the request is asynchronous (which is the default), 
// this method returns as soon as the request is sent and 
// the result is delivered using events.
// 이까지하면 바로 response에 데이터 들어옴.



// Mission
// 1. Make a request for all countries!     "http://restcountries.eu/"
// 2. Parse 'responseText' to get back array of objects.
// 3. Find your country object by its country code (prop name : alpha2Code)
// 4. Print the full country name (prop name : name)


const request2 = new XMLHttpRequest()

request2.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
        const countries = JSON.parse(e.target.responseText)
        const country = countries.find((element) => element.alpha2Code === "US")
        console.log(country.name)

    } else if (e.target.readyState === 4) {
        console.log('Error has been detected.')
    }
})

request2.open("GET", "https://restcountries.eu/rest/v2/all")
request2.send()




// const countryCode = "KR"






