const weatherForecast = document.querySelector("form")
const searchTerm = document.querySelector("input")
const displayResults = document.querySelector("#search-result")

weatherForecast.addEventListener('submit', (e)=>{
    e.preventDefault()
    displayResults.textContent = 'loading...'
    fetch('http://localhost:3000/weather?address='+searchTerm.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                displayResults.textContent = data.error
            }else{
                displayResults.textContent = data.Forecast
            }        
        })
    })
})
