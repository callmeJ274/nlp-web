const fetch = require('node-fetch')

// Take in Click event
export async function handleSubmit(event) {
    event.preventDefault()

    // Clears the evaluation output from hítory
    document.getElementById('agreement').innerHTML = ""
    document.getElementById('subjectivity').innerHTML = ""
    document.getElementById('irony').innerHTML = ""
    document.getElementById('score_tag').innerHTML = ""
    document.getElementById('confidence').innerHTML = ""

    // Validate the user input 
    let url_input = document.getElementById('url_input').value
    const errorElement = document.getElementById('errorMessage')
    if (!Client.checkURL(url_input)) {
        console.log('Invalid URL')
        errorElement.innerHTML = 'Invalid URL'
        return
    } else {
        errorElement.innerHTML = ""
    }
    // Start the API call in server
    await get_result('http://localhost:7012/call', url_input)
        .then(apiData => apiData.json())
        .then(function (res) {
            document.getElementById('agreement').innerHTML = `Agreement - ${res.agreement}`
            document.getElementById('subjectivity').innerHTML = `Subjectivity - ${res.subjectivity}`
            document.getElementById('irony').innerHTML = `Irony - ${res.irony}`
            document.getElementById('score_tag').innerHTML = `Positivity - ${score_transform(res.score_tag)}`
            document.getElementById('confidence').innerHTML = `Confidence - ${res.confidence}`

        })
}

// Post route to server doing API call
export async function get_result(url, url_input) {

    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/plain',
        },     
        body: url_input,
    })
    return response
}

// Transform score to human name
export function score_transform(score) {
    switch (score) {
        case "P+":
            return "Strongly Positive"
        case "P":
            return "Positive"
        case "NEU":
            return "Neutral"
        case "N":
            return "Negative"
        case "N+":
            return "Strongly Negative"
        case "NONE":
            return "No sentiment"
        default:
            return "Invalid data"
    }
}