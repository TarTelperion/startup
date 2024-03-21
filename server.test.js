const app = require('./server')
const request = require('supertest')


const story = {
    id : 4545,
    title : 'test',
    authors : 1,
}
test('add story', (done) => {
    request(app)
    .post('/api/stories/add')
    .send(story)
    .expect(200)
    .expect('success')
    .end((err) => (err ? done(err) : done()))
})

test('GET story', (done) => {
    request(app)
    .get('/api/stories?id=4545')
    .expect(200)
    .expect({
        id : 4545,
        title : 'test',
        authors : 1,
    })
    .end((err) => (err ? done(err) : done()))
})

test('GET story invalid', (done) => {
    request(app)
    .get('/api/stories?id=5050')
    .expect(418)
    .end((err) => (err ? done(err) : done()))
})

test('change author amount', (done) => {
    request(app)
    .put('/api/stories/authors?id=4545&ct=1')
    .expect(200)
    .expect({
        id : 4545,
        title : 'test',
        authors : 2,
    })
    .end((err) => (err ? done(err) : done()))
})

test('get leaders', (done) => {
    request(app)
    .get('/api/stories/leaders')
    .expect(200)
    .expect([{
        id : 4545,
        title : 'test',
        authors : 2,
    }])
    .end((err) => (err ? done(err) : done()))
})