var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
require('dotenv').config()
//console.log(`${process.env.API_ID}`)


const formdata = new FormData();
const bodyParser = require('body-parser');
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


app.post('/testing', async (req, res, next) => {
    console.log(req.body);
        formdata.append("key", `${process.env.KEY}`);
        formdata.append("txt", req.body.theText);
        formdata.append("lang", "en"); 
        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
          };
        const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(response => ({
            status: response.status, 
            body: response.json()
        }))
        .then(({ status, body }) => {console.log(status, body);res.send(response);})
        .catch(error => {console.log('error', error) ;return next(error)})
    })


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
