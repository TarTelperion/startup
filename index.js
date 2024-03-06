const express = require('express')
const app = express()
const port = process.argv.length > 2 ? process.argv[2] : 3000
app.use(express.static('public'))

apiRoute = express.Router()
app.use('/api', apiRoute)

let stories = []

// Retrieve story by ID and send by JSON stringify
apiRoute.get('/stories/:id', (req, res) => {
    let helpful = false
    stories.forEach((story) => {
        if (story.id === id) {
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
    stories.push(JSON.parse(req.body))
})


app.listen(port, () => {
    console.log(`listening on port ${port}`)
})