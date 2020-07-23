
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

function connect() {
    return new Promise((resolve, reject) => {
            mongoose.connect('mongodb://mongo:27017/urlshortener', {
                useNewUrlParser: true, useUnifiedTopology: true
            }).then((res, err) => {
                if (err) return reject(err)
                console.log("connection to database established")
                resolve()
            })
    })
}

module.exports = { connect }