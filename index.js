const app = require('./server.js')
const cors = require('cors')
const socket = require('./websocket.js')

const port = process.argv.length > 2 ? process.argv[2] : 3000
app.use(cors())
app.listen(port, () => {
    console.log('listening on port 3000')
})

socket(port)