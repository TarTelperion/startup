const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080;
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname, './index.html')
})

app.listen(port, () => {
    console.log('listening on port 3000')
})