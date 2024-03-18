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

async function create_story(title, author, genre) {
    const story = {
        _id: uuid.v4(),
        title: title,
        authors: 1,
        owner: author,
        genre: genre,
    }
    await storyCollection.insertOne(story)
    return story
}

async function addUser(user_id, story_id) {
    const story_obj = await storyCollection.findOne({_id: story_id})
    const user = await storyCollection.findOne({token: user_id})

    story_obj.authors += 1
    story_obj.joined.push(user._id)

    await storyCollection.updateOne({_id: story_id}, {...story_obj})
    return story_obj
}

function get_pop_stories() {
    const query = { authors: { $gt: 0, $lt: 900 } };
    const options = {
    sort: { authors: -1 },
    limit: 10,
  };
  const stories = storyCollection.find(query, options);
  return stories.to_Array()
}

module.exports = {
    user,
    user_token,
    createUser,
    add_story,
    get_pop_stories
}