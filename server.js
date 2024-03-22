const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookie_parser = require('cookie-parser')
const app = express()
const port = process.argv.length > 2 ? process.argv[2] : 3000
const db = require('./database')
const bcrypt = require('bcrypt')

let cookie_name = 'token'

app.use(cors())
app.use(express.static('public'))
app.use(cookie_parser())
apiRoute = express.Router()
app.use('/api', apiRoute)
apiRoute.use(bodyParser.json())

let stories = []

// Retrieve story by ID and send by JSON stringify
//auth
apiRoute.put('/auth/create', async (req, res) => {
    if (await db.user(req.body.mail)) {
        res.status(409).send("Preexisting user")
    }
    else {
        console.log(`serverside mail: ${req.body.mail}`)
        console.log(`serverside pass: ${req.body.pass}`)
        let usr = await db.createUser(req.body.mail, req.body.pass, req.body.name) 
        bake_cookie(res, usr.token)
        res.send({token : usr.token})
    }
})

function bake_cookie(res, token) {
    console.log('cookies in the oven')
    res.cookie(cookie_name, token, {
        secure: false, // switch to true AS SOON AS YOU DEPLOY
        httpOnly: true,
        sameSite: 'strict'
    })
    console.log('cookies baked!')
}

apiRoute.get('/auth', async (req, res) => {
    const user = await db.user_token(req.cookies.token)
    if (user) {
        res.send(JSON.stringify(user))
    }
    else {
        res.status(404).send('unknown')
    }
})

apiRoute.post('/auth/login', async (req, res) => {
    console.log(req.body.mail)
    const usr = await db.user(req.body.mail)
    console.log(usr)
    console.log(usr.mail)
    console.log(usr.pass)
    if (usr) {
        if (await bcrypt.compare(req.body.pass, usr.pass)) {
            bake_cookie(res, usr.token)
            res.send({token : usr.token})
            return
        }
        }
    res.status(401).send("unauthorized")
})

apiRoute.delete('/auth/logout', (req, res) => {
    res.clearCookie(cookie_name)
    res.status(204).send('cookie eaten')
})

let secureRoute = express.Router()
apiRoute.use(secureRoute)

secureRoute.use(async (req, res, next) => {
    let token = req.cookies[cookie_name]
    console.log(`cookie right here: ${token}`)
    const user = await db.user_token(token)
    if (user) {
        next()
    }
    else {
        res.status(401).send("unauthorized")
    }
})
secureRoute.get('/stories', async (req, res) => {
    let id = parseInt(req.query.id)
    let story = await db.get_story(id)
    if (story) {
        res.json(story)
    }
    else {
        res.status(418).json('failed')
    }
})

// Add story
secureRoute.post('/stories/add', async (req, res) => {
    let story = req.body
    console.log(req.body)
    const fin = await db.create_story(story.title, story.owner, story.genre, story._id)
    res.send(fin)
})

// Update content of a story. Send in the content of the story in the request body
secureRoute.put('/stories/update', async (req, res) => {
    let story = await db.update_story(req.body)
    if (story) {
    res.send(story)
    }
    else {
        res.status(404).send("Story not found")
    }
})
// Add author
secureRoute.put('/stories/authors', async (req, res) => {
    const id = parseInt(req.query.id); // Convert id to number
    const ct = parseInt(req.query.ct); 
    let story = await db.get_story(id)
    if (story) {
        story.authors += ct
        let new_story = await db.update_story(story)
        res.send(new_story)
    }
    else {
        res.status(404).send('story not found...')
    }
})
// returns all of the stories currently in the globe
secureRoute.get('/stories/leaders', async (req, res) => {
    let stories = await db.get_pop_stories()
    res.json(stories)
})
secureRoute.delete('/stories', async (req, res) => {
    let id = parseInt(req.query.id)
    await db.remove(id)
    res.send()
})

secureRoute.put('/users/update', async (req, res) => {
    console.log(req.body)
    console.log('this is the body^^^^')
    let neuUser = await db.update_user(req.body)
    res.send(neuUser)
})

module.exports = app