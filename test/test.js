process.env.NODE_ENV = 'test'
const expect = require('chai').expect;
const request = require('supertest');
const conn = require('../db/index.js')
const app = require('../server.js')
const mongoose = require('mongoose')
const mongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer

let mongoServer;
const opts = {}; // remove this option if you use mongoose 5 and above

beforeEach(async ()=>{
    mongoServer = new mongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri,opts, (err)=>{
        if(err) console.log(err)
    })
})

afterEach(async ()=>{
    await mongoose.disconnect()
    await mongoServer.stop()
})
describe("POST /shortUrls", (done)=>{

    it("create a new shortnnnnnnnnnn url", (done)=>{
        request(app).post('/shortUrls')
        .send({"fullUrl":"https://www.wkfhchools9155589788kll89780.com/"})
        .then((res)=>{
            const body = res.body
            expect(body).to.contain.property('_id')
            expect(body).to.contain.property('full')
            expect(body).to.contain.property('short')
            done()
            
        }).catch((error)=>done(error))
    })
    console.log("executed the function")
})