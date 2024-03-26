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

let socket = undefined
async function luvSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`)
    socket.onopen = (event) => {
        console.log('connected to websocket')
    }
    socket.onclose = (event) => {
        console.log('websocket closed')
    }
    socket.onmessage = async (event) => {
        const data = JSON.parse(await event.data.text())
        send_alert(data.name, data.type, data.title)
    }
}

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
        content: " ",
        authors: 1,
        owner: author,
        genre: genre,
        most_recent: null,
        joined: []
    }
    await storyCollection.insertOne(story)
    await socket.send(JSON.stringify({user : story.owner, type : 'content', title : story.title}))
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
    sort: { authors: 1 },
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
    await socket.send(JSON.stringify({user : fin.most_recent, type : 'content', title : fin.title}))
    return fin
}

async function update_user(user) {
    console.log(user.joined)
    await userCollection.updateOne(
        { token: user.token },
        { $set: { joined: user.joined } } 
    )
    await userCollection.updateOne(
        { token: user.token },
        { $set: { stories: user.stories } } 
    )
    const usEr = await user_token(user.token)
    return usEr
}

async function remove(story_id) {
    try {
    await storyCollection.deleteOne({_id : story_id})
    await userCollection.updateMany({}, {$pull : {joined : story_id}})
    await userCollection.updateMany({}, {$pull : {stories : story_id}})
    await socket.send(JSON.stringify({user : fin.most_recent, type : 'delete', title : await get_story(story_id).title}))
    console.log('DELETE SUCCESSFUL')
    } catch(err) {
        console.log(`delete failed due to: ${err}`)
    }
}



await luvSocket()

module.exports = {
    user,
    user_token,
    createUser,
    create_story,
    get_story,
    get_pop_stories,
    update_story,
    remove,
    update_user
}

