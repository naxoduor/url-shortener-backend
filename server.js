const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrls')
const app = express()
const cors = require('cors')
const db = require('./db/index.js')

db.connect().then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log("error connecting to the database")
    console.log(error)
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    let results = await ShortUrl.find()
    res.send(results)
})

app.post('/shortUrls', (req, res) => {
    let obj={}
        const shrtUrl= new ShortUrl({
            full: req.body.fullUrl
        })

        shrtUrl.save(shrtUrl).then((shrtUrl)=>{
            res.send(shrtUrl)
        })
        .catch((error)=>{
            console.log(error)
            res.status(400).send(error)
        })
    
})
const server=app.listen(process.env.PORT || 5000)
module.exports=server



