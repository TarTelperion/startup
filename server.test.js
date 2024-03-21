const app = require('./server')
const request = require('supertest')


const story = {
    id : 4545,
    title : 'test',
    authors : 1,
    content: "asdf"
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
        content: "asdf"
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
        content: "asdf"
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
        content: "asdf"
    }])
    .end((err) => (err ? done(err) : done()))
})

test('add content', (done) => {
    request(app)
    .put('/api/stories/update?id=4545')
    .send({content : "asdfjkl;"})
    .expect(200)
    .expect({
        id : 4545,
        title : 'test',
        authors : 2,
        content: "asdfjkl;"
    })
    .end((err) => (err ? done(err) : done()))
})

test('delete story, clean up', (done) => {
    request(app)
    .delete('/api/stories?id=4545')
    .expect(200)
    .end((err) => (err ? done(err) : done()))
})

test('get leaders after deletion', (done) => {
    request(app)
    .get('/api/stories/leaders')
    .expect(200)
    .expect([])
    .end((err) => (err ? done(err) : done()))
})