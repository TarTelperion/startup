const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.argv.length > 2 ? process.argv[2] : 3000
const db = require('./database')
const bcrypt = require('bcrypt')

let cookie_name = 'token'

app.use(cors())
app.use(express.static('public'))

apiRoute = express.Router()
app.use('/api', apiRoute)
apiRoute.use(bodyParser.json())

let stories = []

// Retrieve story by ID and send by JSON stringify
apiRoute.get('/stories', async (req, res) => {
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
apiRoute.post('/stories/add', async (req, res) => {
    let story = req.body
    const fin = await db.create_story(story.title, story.owner, story.genre, story._id)
    res.send(fin)
})

// Update content of a story. Send in the content of the story in the request body
apiRoute.put('/stories/update', async (req, res) => {
    let story = await db.update_story(req.body)
    if (story) {
    res.send(story)
    }
    else {
        res.status(404).send("Story not found")
    }
})
// Add author
apiRoute.put('/stories/authors', async (req, res) => {
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
apiRoute.get('/stories/leaders', async (req, res) => {
    let stories = await db.get_pop_stories()
    res.json(stories)
})
apiRoute.delete('/stories', async (req, res) => {
    let id = parseInt(req.query.id)
    await db.remove(id)
    res.send()
})

//auth
apiRoute.put('/auth/create', async (req, res) => {
    if (await db.user(req.body.mail)) {
        res.status(409).send("Preexisting user")
    }
    else {
        let usr = await db.createUser(req.body.mail, req.body.pass) 
        bake_cookie(res, usr.token)
        res.send({token : usr.token})
    }
})

function bake_cookie(res, token) {
    res.cookie(cookie_name, token, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    })
}

apiRoute.post('/auth/login', async (req, res) => {
    const usr = await db.user(req.body.mail)
    if (usr) {
        if (await bcrypt.compare(req.body.pass, usr.password)) {
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

module.exports = app