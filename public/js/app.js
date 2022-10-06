// this is the client side javascript file that fetches data from backend
// we use fetch to get data from backend
// fetch is not the part of javascript ...it is the part of browser






const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error


            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast


            }
        })

    })







})