var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const FormData = require('form-data');
require('dotenv').config()
console.log(`${process.env.KEY}`)


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
app.listen(7012, function () {
    console.log('Example app listening on port 7012!')
})


app.post('/api_call', async (req, res, next) => {
    console.log(req.body);
    const formdata = new FormData();
	formdata.append("key", `${process.env.KEY}`);
	formdata.append("txt", "YOUR TEXT HERE");
	formdata.append("lang", "en");  // 2-letter code, like en es fr ...

	const requestOptions = {
	method: 'POST',
	body: formdata,
	redirect: 'follow'
	};

	const response = await fetch("https://api.meaningcloud.com/sentiment-2.1",requestOptions)
	try {
				const allData = await response.json();
				if (allData.message) {
					alert(allData.message);
				} else {
                    console.log(allData)
					return allData.subjectivity;
				}
			} catch (error) {
				console.log("error", error);
				alert(error)
			}
    })


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
