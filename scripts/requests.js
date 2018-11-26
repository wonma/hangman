// ------------------------- Using fetch API (new way) --------------------------

// Request 1 (using async function)

const getPuzzle = async (wordLength) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordLength}`, {})
    if (response.status === 200) {
        const data = await response.json()  // Error here! await해줘야 다음 라인이 차분히 기다림!
        return data.puzzle
    } else {
        throw new Error('Something went wrong!!')
    }
}


// Request 2 (using async function)

const getCountryName = async (countryCode) => {
    const response = await fetch('//restcountries.eu/rest/v2/all', {})
    if (response.status === 200) {
        const countries = await response.json()
        return countries.find((country) => country.alpha2Code === countryCode)    
    } else {
        throw new Error('Unable to fetch data')
    }
}


// Request 3   

const getLocation = async () => {
    const response = await fetch(`//ipinfo.io/json?token=b49a667be0d6c1`, {})
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error('Unable to fetch data')
    }
}


// Request 4 (Woops! I just combined... not like refactoring..)

// const getCurrentCountry = async() => {

//     const response1 = await fetch(`http://ipinfo.io/json?token=b49a667be0d6c1`, {})
//     let countryCode = ''
//     if (response1.status === 200) {
//         const currentLocation = await response1.json()
//         countryCode = currentLocation.country
//     } else {
//         throw new Error('Response 1 has failed')
//     }

//     const response2 = await fetch('https://restcountries.eu/rest/v2/all', {})
//     let countries = []
//     if (response2.status === 200) {
//         countries = await response2.json()
//     } else {
//         throw new Error('Response 2 has failed')     
//     }

//     return countries.find((country) => country.alpha2Code === countryCode)
// }



// Request 4 (What teacher meant)

const getCurrentCountry = async() => {
    const location = await getLocation()
    return getCountryName(location.country)
}


// ------------------------- Using fetch API (new way) --------------------------

// // Request 1 (using Promise)

// const getPuzzle = (wordLength) => {
//     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordLength}`, {}).then((response) => {  // fetch결과로(resolve후) 넘겨지는 데이터 response에는 
//         if (response.status === 200) {   // .json() 이라는 특별한 메소드 접근 가능함
//             return response.json()    // 문제는 .json()결과물이 object가 아니라 차후에 object로 변이될 promise라는것.
//         } else {                    // 여기서 바로 promise chaining이 쓰임! promise에 .then해야 data받아오거든.                 
//             throw new Error('Unable to fetch the puzzle') // 이게 있어야 아래 catch가 trigger됨
//         }
//     }).then((data) => {
//         return data.puzzle    // 최종으로는 string을 return하도록 셋팅
//     })
// }


// // Request 2 (using Promise)

// const getCountryName = (countryCode) => {
//     return fetch('https://restcountries.eu/rest/v2/all', {}).then((response) => {
//         if (response.status === 200) {
//             return response.json() 
//         } else {
//             throw new Error('Unable to fetch data')
//         } 
//     }).then((countries) => {
//         debugger
//         return countries.find((country) => {return country.alpha2Code === countryCode})
//     })
// }


// // Request 3   

// const getLocation = () => {
//     return fetch(`http://ipinfo.io/json?token=b49a667be0d6c1`, {}).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch data')
//         }
//     })
// }


// ------------------------- Using XMLHttpRequest (old way) --------------------------

// // Request 1 (using Promise)

// const getPuzzle = (wordLength) => new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest()

//     request.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const quizText = JSON.parse(e.target.responseText)
//             resolve(quizText)
//         } else if (e.target.readyState === 4) {
//             reject('An error occured')
//         }
//     })

//     request.open('GET', `http://puzzle.mead.io/puzzle?wordCount=${wordLength}`)
//     request.send()
// })




// // Request 2 (using Promise)
// const getCountryName = (countryCode) => new Promise((resolve, reject) => {
//     const request2 = new XMLHttpRequest()

//     request2.addEventListener('readystatechange', (e) => {
//         if (e.target.readyState === 4 && e.target.status === 200) {
//             const countries = JSON.parse(e.target.responseText)
//             const countryObj = countries.find((element) => element.alpha2Code === countryCode)
//             resolve(countryObj)   // this callback fn takes data and transfer it! 
//         } else if (e.target.readyState === 4) {
//             reject("Error has been detected.")
//         }
//     })

//     request2.open("GET", "https://restcountries.eu/rest/v2/all")
//     request2.send()
// })
