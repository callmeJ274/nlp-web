const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mockAPIResponse = require('./mockAPI.js')
const FormData = require('form-data')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.static('dist'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.text())

const port = 7012

// Listening port
app.listen(port, function () {
    console.log(`Evaluate news app listening on port ${port}!`)
})

// Serves the main page to browser
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// Tests the path between client and server, returns mock API response
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/call', callAPI)

async function callAPI(req, res) {
    const formdata = new FormData();
	formdata.append("key", `${process.env.KEY}`);
	formdata.append("url", `${req.body}`);
	formdata.append("lang", "auto");  // 2-letter code, like en es fr ...

	const requestOptions = {
	method: 'POST',
	body: formdata,
	redirect: 'follow'
	};

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1",requestOptions)
    try {
        const nlpData = await response.json()
        if (nlpData.status.code == 0) {
            nlpData.message = "Calling API successfully"
            res.send(nlpData)
        } else {
            res.send({ message: "Calling API failed" })
        }
    } catch (error) {
        console.error(error)
    }
}
