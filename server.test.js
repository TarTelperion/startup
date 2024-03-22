const app = require('./server')
const request = require('supertest')

let storyId = 8031
const story = {
    title : 'test',
    authors : 1,
    owner : 'gabe',
    genre : 'testing',
    content: "asdf"
}

test('add story', (done) => {
    request(app)
    .post('/api/stories/add')
    .send(story)
    .expect(200)
    .end((err, res) => {
        storyId = res.body._id
        if (err) return done(err);
        done();
    });
})

test('GET story', (done) => {
    request(app)
    .get(`/api/stories?id=${storyId}`)
    .expect(200)
    .expect({
        _id: storyId,
        title: 'test',
        authors: 1,
        owner: 'gabe',
        genre: 'testing',
        joined: []
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

test('add nonexistent story', (done) => {
    request(app)
    .put('/api/stories/update?id=5050')
    .send({content : "if this happens, I'll be irritated"})
    .expect(404)
    .expect("Failure!")
    .end((err) => (err ? done(err) : done()))
})

test('delete story, clean up', (done) => {
    request(app)
    .delete(`/api/stories?id=${storyId}`)
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