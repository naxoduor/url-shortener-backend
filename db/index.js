
const mongoose = require('mongoose')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            mockgoose.helper.setDbVersion("3.2.1");

            mockgoose.prepareStorage().then(() => {
                mongoose.connect('mongodb://foobar/baz');
                mongoose.connection.on('connected', () => {
                    console.log('db connection is now open');
                });
            });
        }
        else {
            mongoose.connect('mongodb://mongo:27017/urlshortener', {
                useNewUrlParser: true, useUnifiedTopology: true
            }).then((res, err) => {
                if (err) return reject(err)
                console.log("connection to database established")
                resolve()
            })

        }

    })
}

module.exports = { connect }