const {MongoClient} = require('mongodb')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`
const client = new MongoClient(url)
const db = client.db('writersblock')
const userCollection = db.collection('user')
const storyCollection = db.collection('stories')

// ping and test connection
(async function connect() {
    await client.connect()
    await db.command({ping: 1})
})().catch((err) => {
    console.log(`connection failed. error occured: ${err.message}`)
    process.exit(1)
})

