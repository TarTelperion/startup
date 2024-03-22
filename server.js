const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.argv.length > 2 ? process.argv[2] : 3000
const db = require('./database')

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
apiRoute.put('/stories/update', (req, res) => {
    const id = req.query.id
    db.update(id, JSON.parse(req.body))
    res.send()
})
// Add author
apiRoute.put('/stories/authors', async (req, res) => {
    const id = parseInt(req.query.id); // Convert id to number
    const ct = parseInt(req.query.ct); 
    let story = await db.get_story(id)
    if (story) {
        story.authors += ct
        await db.update_story(story)
        res.send()
    }
    else {
        res.status(404).send('story not found...')
    }
})
// returns all of the stories currently in the globe
apiRoute.get('/stories/leaders', (req, res) => {
    res.json(db.get_pop_stories())
})
apiRoute.delete('/stories', (req, res) => {
    let id = req.query.id
    let i = 0
    stories.forEach((story) => {
        if(story.id == id) {
            stories.splice(i, 1)
        }
        i++
    })
    res.send()
})

module.exports = app