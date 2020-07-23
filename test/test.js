process.env.NODE_ENV = 'test'
const expect = require('chai').expect;
const request = require('supertest');
const conn = require('../db/index.js')
const app = require('../server.js')
const mongoose = require('mongoose')
const mongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer

let mongoServer;
const opts = {}; 
before(async ()=>{
    mongoServer = new mongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri,opts, (err)=>{
        if(err) console.log(err)
    })
})

after(async ()=>{
    await mongoose.disconnect()
    await mongoServer.stop()
})


describe("POST /shortUrls", (done)=>{

    it("create a new shortnnnnnnnnnn url", (done)=>{
        request(app).post('/shortUrls')
        .send({"fullUrl":"https://www.wkfhchools9155589788kll89780.com/"})
        .then((res)=>{
            const body = res.body
            const statusCode=res.status
            expect(body).to.contain.property('_id')
            expect(body).to.contain.property('full')
            expect(body).to.contain.property('short')
            expect(statusCode).to.equal(200)
            done()
            
        }).catch((error)=>done(error))
    })
    console.log("executed the function")
})

describe("GET /", (done)=>{
 
    console.log("get all request")
    it("get all entries in database", (done)=>{
        request(app).get('/')
        .then((res)=>{
            console.log("test the status code")
            const statusCode = res.status
            expect(statusCode).to.equal(200)
            done()
        }).catch((error)=>done(error))
    })
})
