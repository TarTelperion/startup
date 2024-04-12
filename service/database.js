const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const config = require('./dbConfig.json')
const { getNow } = require('./getNow')

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`
const client = new MongoClient(url)
const db = client.db('writersblock')

const userCollection = db.collection('user')
const storyCollection = db.collection('stories')

const testConnection = async () => {
  await client.connect()
  await db.command({ ping: 1 })
}

try {
  testConnection()
} catch (err) {
  console.log(
    `Unable to connect to database with ${url} because ${err.message}`
  )
  process.exit(1)
}

// (async function testConnection() {
//   await client.connect()
//   await db.command({ ping: 1 })
// })().catch((ex) => {
//   console.log(`Unable to connect to database with ${url} because ${ex.message}`)
//   process.exit(1)
// })

// find user stuff
async function user(name) {
  let user_from_mail = await userCollection.findOne({ mail: name })
  let user_from_name = await userCollection.findOne({ name: name })

  if (user_from_mail) {
    return user_from_mail
  } else {
    return user_from_name
  }
}

function user_token(tok) {
  return userCollection.findOne({ token: tok })
}

// create user

async function createUser(mail, pass, name) {
  if (!mail || !pass) {
    console.log(`mail: ${mail}`)
    console.log(`pass: ${pass}`)
  }

  const passwordHash = await bcrypt.hash(pass, 10)
  const timestamp = getNow()

  const user = {
    mail: mail,
    pass: passwordHash,
    name: name,
    joined: [],
    stories: [],
    notifications: [],
    token: uuid.v4(),
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  await userCollection.insertOne(user)

  return user
}

async function create_story(title, author, genre, id = null, joined, prompt) {
  const timestamp = getNow()

  const story = {
    _id: id ?? Math.floor(Math.random() * 9000) + 1000,
    title: title,
    additions: [],
    authors: 1,
    owner: author,
    genre: genre,
    most_recent: null,
    writer: author,
    joined: [...joined],
    prompt: prompt,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  await storyCollection.insertOne(story)

  return story
}

async function addUser(user_id, story_id) {
  const story_obj = await storyCollection.findOne({ _id: story_id })
  const user = await storyCollection.findOne({ token: user_id })

  story_obj.authors += 1
  story_obj.joined.push(user._id)

  await storyCollection.updateOne({ _id: story_id }, { ...story_obj })
  return story_obj
}

async function get_pop_stories() {
  const query = {}
  const options = {
    sort: { updatedAt: -1 },
  }

  const stories = storyCollection.find({}, options)
  const array = await stories.toArray()

  return array
}

async function getJoinedStories(userId) {
  return await storyCollection.find({ joined: userId }).toArray()
}

async function get_story(story_id) {
  const story = await storyCollection.findOne({ _id: Number(story_id) })
  return story
}

async function update_story(content = '', idOrStory, user) {
  let story = undefined
  let id = undefined

  const maybeNumber = Number(idOrStory)

  if (typeof maybeNumber === 'number' && !isNaN(maybeNumber)) {
    story = await get_story(maybeNumber)
    id = story._id
  } else {
    story = idOrStory
    id = story._id
  }
  const timestamp = getNow()
  const randomIndex = Math.floor(Math.random() * story.joined.length)

  if (content !== '') {
    const recentChange = {
      content: content,
      updatedAt: timestamp,
      authorId: user._id,
      authorName: user.name,
    }

    story.additions.push(recentChange)
    story.updatedAt = timestamp
  }

  story.writer = story.joined[randomIndex]
  await storyCollection.replaceOne({ _id: id }, story)

  const updated = await get_story(story._id)

  return updated
}

async function update_user(user) {
  await userCollection.updateOne(
    { token: user.token },
    { $set: { joined: user.joined } }
  )
  await userCollection.updateOne(
    { token: user.token },
    { $set: { stories: user.stories } }
  )
  await userCollection.updateOne(
    { token: user.token },
    { $set: { notifications: user.notifications } }
  )

  const usEr = await user_token(user.token)

  return usEr
}

async function shuffle(storyId, user) {
  const story = await get_story(storyId)

  if (story.joined.length === 1) {
    return
  }
  if (story.joined.length === 2) {
    const index = story.joined.indexOf(user._id)
    const otherIndex = index === 0 ? 1 : 0

    await storyCollection.updateOne(
      { _id: storyId },
      { $set: { writer: story.joined[otherIndex] } }
    )
    return
  }

  const possibleIndices = story.joined.filter((id) => id !== user._id)
  const randomIndex = Math.floor(Math.random() * possibleIndices.length)
  const newWriter = possibleIndices[randomIndex]

  await storyCollection.updateOne(
    { _id: storyId },
    { $set: { writer: newWriter } }
  )
}

async function remove(story_id) {
  try {
    // let story = await get_story(story_id)
    await storyCollection.deleteOne({ _id: story_id })
    await userCollection.updateMany({}, { $pull: { joined: story_id } })
    await userCollection.updateMany({}, { $pull: { stories: story_id } })
  } catch (err) {
    console.log(`delete failed due to: ${err}`)
    throw err
  }
}

module.exports = {
  testConnection,
  user,
  user_token,
  addUser,
  createUser,
  create_story,
  get_story,
  get_pop_stories,
  update_story,
  remove,
  update_user,
  getJoinedStories,
  shuffle,
}
