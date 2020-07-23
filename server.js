const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()
const cors = require('cors')
const shortId = require('shortid')
const db = require('./db/index.js')

app.use(function(req, res, next) {
    var allowedOrigins = ['http://104.248.73.139','http://127.0.0.1'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  })
  
  app.use(cors({
      origin: 'http://127.0.0.1',
      credentials: true,
    })
    )
db.connect().then(() => {
    console.log("database connected")
}).catch((error) => {
    console.log("error connecting to the database")
    console.log(error)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    let results = await ShortUrl.find()
    res.status(200).send(results)
})

app.post('/shortUrls', (req, res) => {
    let shortUrl = ""
    let possible = "abcdefghijklmnopqrstuvwxyz1234567890"
    for (let i = 0; i < 8; i++)
        shortUrl += possible.charAt(Math.floor(Math.random() * possible.length))
    const baseUrl = 'pbid.io/'
    let obj = {}
    const shrtUrl = new ShortUrl({
        full: req.body.fullUrl,
        short: `${baseUrl}${shortUrl}`
    })

    shrtUrl.save(shrtUrl).then((shrtUrl) => {
        res.status(200).send(shrtUrl)
    })
        .catch((error) => {
            console.log(error)
            res.status(400).send(error)
        })

})
const server = app.listen(process.env.PORT || 5000)
module.exports = server



