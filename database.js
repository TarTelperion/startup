const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const config = require('./dbConfig.json')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('writersblock');
const userCollection = db.collection('user');
const storyCollection = db.collection('stories');

// ping and test connection
(async function connect() {
    await client.connect()
    await db.command({ping: 1})
})().catch((err) => {
    console.log(`connection failed. error occured: ${err.message}`)
    process.exit(1)
})

// find user stuff
async function user(mail) {
    let user = await userCollection.findOne({mail: mail})
    return user
}

function user_token(tok) {
    return userCollection.findOne({token: tok})
}

// create user

async function createUser(mail, pass, name) {
    if (!mail || !pass) {
        console.log(`mail: ${mail}`)
        console.log(`pass: ${pass}`)
    }
    const passwordHash = await bcrypt.hash(pass, 10)
    const user = {
        mail: mail,
        pass: passwordHash,
        name : name,
        joined : [],
        stories : [],
        token: uuid.v4()
    }
    await userCollection.insertOne(user)
    return user
}

async function create_story(title, author, genre, id=null) {
    const story = {
        _id: id ?? Math.floor(Math.random() * 9000) + 1000,
        title: title,
        authors: 1,
        owner: author,
        genre: genre,
        joined: []
    }
    await storyCollection.insertOne(story)
    console.log(story)
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

async function get_pop_stories() {
    const query = { authors: { $gt: 0, $lt: 900 } };
    const options = {
    sort: { authors: -1 },
    limit: 10,
  };
  const stories = storyCollection.find(query, options);
  const array = await stories.toArray()
  return array
}

async function get_story(story_id) {
    const story = await storyCollection.findOne({_id: story_id})
    return story
}


async function update_story(story) {
    await storyCollection.replaceOne({_id : story._id}, story)
    let fin = await get_story(story._id)
    return fin
}

async function update_user(user) {
    await userCollection.replaceOne({token : user.token}, user)
    const usEr = await user_token(user.token)
    return usEr
}

async function remove(story_id) {
    return await storyCollection.deleteOne({_id : story_id})
}

module.exports = {
    user,
    user_token,
    createUser,
    create_story,
    get_story,
    get_pop_stories,
    update_story,
    remove
}

