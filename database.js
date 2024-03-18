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

// find user stuff
function user(mail) {
    return userCollection.findOne({email: mail})
}

function user_token(tok) {
    return userCollection.findOne({token: tok})
}

// create user

async function createUser(mail, pass) {
    const passwordHash = await bcrypt.hash(pass, 10)
    const user = {
        email: mail,
        password: passwordHash,
        token: uuid.v4()
    }
    await userCollection.insertOne(user)
    return user
}

function add_story(story) {
    return storyCollection.insertOne(story)
}

function get_pop_stories() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const stories = storyCollection.find(query, options);
  return stories.to_Array()
}