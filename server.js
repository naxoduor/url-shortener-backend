const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()
const cors = require('cors')
const shortId = require('shortid')
const db = require('./db/index.js')

db.connect().then(() => {
    console.log("database connected")
}).catch((error) => {
    console.log("error connecting to the database")
    console.log(error)
})
app.use(cors())
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



