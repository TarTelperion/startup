const app = require('./server.js')
const cors = require('cors')

app.use(cors())
app.listen(3000, () => {
    console.log('listening on port 3000')
})