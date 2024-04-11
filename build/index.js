const app = require('./server.js')
const cors = require('cors')
const { websocket } = require('./websocket.js')

const port = process.argv.length > 2 ? process.argv[2] : 3000
app.use(cors())
const service = app.listen(port, () => {
  console.log('listening on port 3000')
})

websocket(service)
