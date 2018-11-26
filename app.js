const puzzleEl = document.querySelector('#puzzle')
const guessNumEl = document.querySelector('#guess-num')
const newWordBtn = document.querySelector('#new-word')
// let firstQuiz = new Hangman("cat toy", 3)
let firstQuiz

const displayQuiz = () => {
    puzzleEl.textContent = firstQuiz.puzzle
    guessNumEl.textContent = firstQuiz.message
}

const startQuiz = async() => {
    const theWord = await getPuzzle(1)
    firstQuiz = new Hangman(theWord, 3)

    // Display puzzle and guessNum
    displayQuiz()
}

startQuiz()

// 이건 너무 중복적이야
// newWordBtn.addEventListener('click', async ()=>{
//     firstQuiz = await getNewWord()
//     puzzleEl.textContent = firstQuiz.puzzle
//     guessNumEl.textContent = firstQuiz.message
// })

newWordBtn.addEventListener('click', startQuiz)



// keypress event
window.addEventListener('keypress', (e) => {
    const letterInput = String.fromCharCode(e.charCode)
    firstQuiz.getLetter(letterInput) // push to array + decrement if needed
    // 이녀석을 firstQuiz.letter = letterInput 으로해서 setter 설정할 수 있긴하지만, 
    // firstQuiz.letter값에 접근할 일이 없으면 굳이 setter로 코딩할 이유가 없음
    // method는 지금처럼 method스럽게 남겨둘 필요도 있음. (value를 fetch할 게 아니라면)

    displayQuiz()
})


//-------------------------------------- before making it a callback ----------
// const request = new XMLHttpRequest()

// // 어떤 상황이 감지되었을 때 해당 response(string)을 JSON parse하여 object로 변환하고싶어
// request.addEventListener('readystatechange', (e) => {
//     // 두 조건이 성립 할 때
//     if (e.target.readyState === 4 && e.target.status === 200) {
//         const quizText = JSON.parse(e.target.responseText)
//         console.log(quizText)
//     } else if (e.target.readyState === 4) {
//         console.log('An error has taken place.')
//     }
//     // 주소에 오류가 있으면 400 status 로 뜸
// })

// request.open("GET", "http://puzzle.mead.io/puzzle") // initialize a request
// request.send() // sends the request to the server. 
// // If the request is asynchronous (which is the default), 
// // this method returns as soon as the request is sent and 
// // the result is delivered using events.
// // 이까지하면 바로 response에 데이터 들어옴.
//--------------------------------------------------------------------------------

// Callback version.
// getPuzzle(2, (err, theData)=>{
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(theData.puzzle)
//     }
// })


// Promise version.
// getPuzzle('1').then((puzzle)=>{
//     console.log(puzzle)
// }, (error)=>{
//     console.log(`Error: ${error}`)
// }) 


// fetch API  Promise version.


// Original structure of fetch API
getPuzzle(2).then((thePuzzle) => {
    console.log(thePuzzle)
}).catch((error)=>{
    console.log(error)
})



// Mission A ---> Done & revised for Mission B
// 1. Make a request for all countries!     "http://restcountries.eu/"
// 2. Parse 'responseText' to get back array of objects.
// 3. Find your country object by its country code (prop name : alpha2Code)
// 4. Print the full country name (prop name : name)


// Mission B - Create a function for getting country details
// getCountryName("US", (error, countryObj)=>{
//     if(error) {
//         console.log(`Error: ${error}`)
//     } else {
//         console.log(countryObj.name)
//     }
// })
    // used the callback kept data as an argument 
    // and used it to access & print the country name

    // 이 higher-order function은 데이터 fetch해오는 코드 내에 들어갈 아무것 다 custom가능함!
    // 예를 들어, getCountryName레시피 안에 API 주소 있는데, 그 주소의 일부분을 parameter화
    // 하여, dynamic하게 접근 할 수도 있음!!! 


// Mission B - with Promise

//getCountryName('US') // 여기까지는 new object 탄생!

getCountryName('US').then((country)=>{
    console.log(country.name)
}).catch((error) => {
    console.log(error)
})



// Mission C - with Promise

// getLocation           // API info from  https://ipinfo.io

// My version
getLocation().then((infoObj)=>{
    getCountryName(infoObj.country).then((country) => {
        console.log(`Your country is ${country.name} and you live in ${infoObj.region}`)
    })
}).catch((error) => {
    console.log(error)
})

// getLocation().then((infoObj) => {
//     getCountryName(infoObj.country).then((country) => {
//         return country.name
//     }).then((countryName)=>{
//         console.log(`Your country is ${countryName} and you live in ${infoObj.region}`)
//     })
// }).catch((error) => {
//     console.log(error)
// })

// getLocation().then((infoObj) => {
//     const countryName = getCountryName(infoObj.country).then((country) => {
//         return country.name
//     })
//     console.log(`Your country is ${countryName} and you live in ${infoObj.region}`)
// }).catch((error) => {
//     console.log(error)
// })

// Teacher's version
// getLocation().then((infoObj) => {
//     return getCountryName(infoObj.country)   // country code를 받아서 full로 변환해줌
// }).then((country) => { 
//     console.log(`You are currently in ${country.name}`)
// }).catch((error) => {
//     console.log(error)
// })




// Mission D

getCurrentCountry().then((country) => {
    console.log('Answer: ' + country.name)
}).catch((error) => {
    console.log(error)
})