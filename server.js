const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.argv.length > 2 ? process.argv[2] : 3000
app.use(cors())
app.use(express.static('public'))

apiRoute = express.Router()
app.use('/api', apiRoute)
apiRoute.use(bodyParser.json())

let stories = []

// Retrieve story by ID and send by JSON stringify
apiRoute.get('/stories', (req, res) => {
    let id = parseInt(req.query.id)
    console.log(id)
    console.log(stories)
    let helpful = false
    stories.forEach((story) => {
        console.log(story)
        console.log(story.id)
        if (story.id == id) {
            res.json(story)
            helpful = true
        }
    })
    if (!helpful) {
        try {
        const error = new Error('No story found')
        error.statusCode = 418
        throw error
        } catch(error) {
            res.status(error.statusCode || 400).json({error : "This ain't for coffee (Herbal teas only (word of wisdom, my friends))"})
        }
    }
})
// Add story
apiRoute.post('/stories/add', (req, res) => {
    stories.push(req.body)
    res.send("success")
})
// Update content of a story. Send in the content of the story in the request body
apiRoute.put('/stories/update', (req, res) => {
    const id = req.query.id
    let helpful = false
    let found = null;
    stories.forEach((story) => {
        if (story.id == id) {
            story.content = Object.values(req.body)[0]
            console.log(Object.values(req.body))
            helpful = true
            found = story;
        }
    })
    if (!helpful) {
        res.status(404).send("Failure!")
    }
    else {
        res.json(found)
    }
})
// Add author
apiRoute.put('/stories/authors', (req, res) => {
    const id = parseInt(req.query.id); // Convert id to number
    const ct = parseInt(req.query.ct); 
    let changed = false
    let found = null
    stories.forEach((story) => {
        if (story.id == id) {
            if (ct > 0) {
                story.authors++
            }
            else {story.authors--}
            changed = true
            found = story
        }
    })
    if (changed) {
        res.json(found)
    }
    else {
        res.status(404).json('story not found')
    }
    
})
// returns all of the stories currently in the globe
apiRoute.get('/stories/leaders', (req, res) => {
    res.json(stories)
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