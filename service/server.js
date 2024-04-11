const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookie_parser = require('cookie-parser')

const app = express()

const bcrypt = require('bcrypt')
const { generatePrompt } = require('./api/generate')
const db = require('./database')

let cookie_name = 'token'

app.use(cors())
app.use(express.static('public'))
app.use(cookie_parser())

let apiRoute = express.Router()

app.use('/api', apiRoute)
apiRoute.use(bodyParser.json())

console.log('loggy')

// Retrieve story by ID and send by JSON stringify
apiRoute.post('/auth/create', async (req, res) => {
  if (await db.user(req.body.mail)) {
    res.status(409).send('Preexisting user')
  } else {
    let usr = await db.createUser(req.body.mail, req.body.pass, req.body.name)
    bake_cookie(res, usr.token)
    res.send({ token: usr.token })
  }
})

function bake_cookie(res, token) {
  res.cookie(cookie_name, token, {
    secure: false, // switch to true AS SOON AS YOU DEPLOY
    httpOnly: true,
    sameSite: 'strict',
  })
}

apiRoute.get('/auth', async (req, res) => {
  const user = await db.user_token(req.cookies.token)
  if (user) {
    res.send(JSON.stringify(user))
  } else {
    res.status(401).send('unknown')
  }
})

apiRoute.post('/auth/login', async (req, res) => {
  const usr = await db.user(req.body.name)

  if (usr) {
    if (await bcrypt.compare(req.body.pass, usr.pass)) {
      bake_cookie(res, usr.token)
      res.send(JSON.stringify(usr))
      return
    }
  }

  res.status(401).send('unauthorized')
})

apiRoute.delete('/auth/logout', (req, res) => {
  res.clearCookie(cookie_name)
  res.status(204).send('cookie eaten')
})

let secureRoute = express.Router()
apiRoute.use(secureRoute)

secureRoute.use(async (req, res, next) => {
  let token = req.cookies[cookie_name]
  const user = await db.user_token(token)

  if (user) {
    next()
  } else {
    res.status(401).send('unauthorized')
  }
})

secureRoute.get('/stories', async (req, res) => {
  let id = parseInt(req.query.id)
  let story = await db.get_story(id)

  if (story) {
    res.json(story)
  } else {
    res.status(418).json('failed')
  }
})

// Add story
secureRoute.post('/stories/add', async (req, res) => {
  // let socket_id = req.params.ws
  const story = req.body
  const token = req.cookies[cookie_name]
  const user = await db.user_token(token)
  user.joined.push(story._id)
  user.stories.push(story._id)
  await db.update_user(user)
  const fin = await db.create_story(
    story.title,
    story.owner,
    story.genre,
    story._id,
    story.joined,
    story.prompt
  )

  res.status(200).send(fin)
})

// Update content of a story. Send in the content of the story in the request body
secureRoute.put('/stories/update', async (req, res) => {
  let storyId = req.params.id
  const token = req.cookies[cookie_name]
  const user = await db.user_token(token)
  let story = await db.update_story(req.body, storyId, user)

  if (story) {
    res.send(story)
  } else {
    res.status(404).send('Story not found')
  }
})

// Add author
secureRoute.put('/stories/authors', async (req, res) => {
  const id = parseInt(req.query.id)
  const usr = req.query.usr
  const ct = parseInt(req.query.ct)

  let story = await db.get_story(id)
  if (story) {
    story.authors += ct
    if (!story.joined.includes(usr)) {
      story.joined.push(usr)
    }
    let new_story = await db.update_story(story)
    res.send(new_story)
  } else {
    res.status(404).send('story not found...')
  }
})

// returns all of the stories currently in the globe
secureRoute.get('/stories/global', async (req, res) => {
  let stories = await db.get_pop_stories()
  res.json(stories)
})

secureRoute.delete('/stories', async (req, res) => {
  let socket_id = req.params.ws
  let id = parseInt(req.query.id)

  await db.remove(id, socket_id)

  res.send()
})

secureRoute.put('/stories/leave/:storyId', async (req, res) => {
  const id = req.params.storyId
  const token = req.cookies[cookie_name]
  const user = await db.user_token(token)
  const story = await db.get_story(id)

  let index = user.joined.indexOf(id)
  user.joined.splice(index, 1)
  index = story.joined.indexOf(user._id)
  story.joined.splice(index, 1)

  story.authors -= 1

  await db.update_user(user)
  await db.update_story('', story, user)

  res.status(200).send('Story left')
})

secureRoute.put('/users/update', async (req, res) => {
  let neuUser = await db.update_user(req.body)

  res.send(neuUser)
})

secureRoute.get('/user/stories', async (req, res) => {
  let token = req.cookies[cookie_name]
  let user = await db.user_token(token)

  const payload = await db.getJoinedStories(user._id.toString())

  res.status(200).send(JSON.stringify(payload))
})

secureRoute.put('/stories/join', async (req, res) => {
  try {
    const token = req.cookies[cookie_name]
    const user = await db.user_token(token)
    const story_id = req.body.id
    console.log('id', story_id)
    const story = await db.get_story(story_id)
    console.log('user', user)
    console.log('story', story)
    if (story.joined.includes(user._id) || user.joined.includes(story._id)) {
      throw new Error('User Loser. You already joined that story.')
    }

    story.joined.push(user._id.toString())
    story.authors += 1
    user.joined.push(story._id)

    await db.update_user(user)
    await db.update_story('', story, user)

    res.status(200).send(JSON.stringify(story))
  } catch (err) {
    console.log(err)
    res.status(500).send(JSON.stringify(err))
  }
})

secureRoute.post('/generate-prompt', generatePrompt)

module.exports = app
