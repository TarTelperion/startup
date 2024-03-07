const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.argv.length > 2 ? process.argv[2] : 3000
app.use(express.static('public'))

apiRoute = express.Router()
app.use('/api', apiRoute)
apiRoute.use(bodyParser.json())

let stories = []

// Retrieve story by ID and send by JSON stringify
apiRoute.get('/stories', (req, res) => {
    let id = req.query.id
    console.log(id)
    console.log(stories)
    let helpful = false
    stories.forEach((story) => {
        console.log(story)
        console.log(story.id)
        if (story.id == id) {
            res.send(JSON.stringify(story))
            helpful = true
        }
    })
    if (!helpful) {
        res.send({error : "no story with that ID found"})
    }
})
// Add story
apiRoute.post('/stories/add', (req, res) => {
    stories.push(req.body)
    res.send("success")
})
// Update content of a story. Send in the content of the story in the request body
apiRoute.put('/stories/:id', (req, res) => {
    let helpful = false
    stories.forEach((story) => {
        if (story.id === id) {
            story.content += Object.values(req.body)[0]
            helpful = true
        }
    })
    if (!helpful) {
        res.send("Failure!")
    }
    else {
        res.send("Success!")
    }
})
apiRoute.get('/stories/leaders', (req, res) => {
    stories.sort((a, b) => {
        return a.authors - b.authors
    })
    res.send(JSON.stringify(stories))
})
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})