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

const usr = {
    mail : "funkychickens@crazies.com",
    name : "dude",
    pass : "secretcombinations"
}

test('add story', (done) => {
    request(app)
    .post('/api/stories/add')
    .send(story)
    .expect(200)
    .end((err, res) => {
        storyId = res.body._id
        story._id = storyId
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
    .put(`/api/stories/authors?id=${storyId}&ct=1`)
    .expect(200)
    .expect({
        _id : storyId,
        title: 'test',
        authors: 2,
        owner: 'gabe',
        genre: 'testing',
        joined: []
    })
    .end((err) => (err ? done(err) : done()))
})

test('reduce author amount', (done) => {
    request(app)
    .put(`/api/stories/authors?id=${storyId}&ct=-1`)
    .expect(200)
    .expect({
        _id : storyId,
        title: 'test',
        authors: 1,
        owner: 'gabe',
        genre: 'testing',
        joined: []
    })
    .end((err) => (err ? done(err) : done()))
})

test('get leaders', (done) => {
    request(app)
    .get('/api/stories/leaders')
    .expect(200)
    .expect([{
        _id : storyId,
        title: 'test',
        authors: 1,
        owner: 'gabe',
        genre: 'testing',
        joined: []
    }])
    .end((err) => (err ? done(err) : done()))
})

test('add content', (done) => {
    story.content += "jkl;"
    request(app)
    .put(`/api/stories/update`)
    .send(story)
    .expect(200)
    .expect({
        title : 'test',
        authors : 1,
        owner : 'gabe',
        genre : 'testing',
        content: "asdfjkl;",
        _id : storyId
    })
    .end((err) => (err ? done(err) : done()))
})

test('add nonexistent story', (done) => {
    request(app)
    .put('/api/stories/update?id=5050')
    .send({content : "if this happens, I'll be irritated"})
    .expect(404)
    .expect("Story not found")
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

test('create user', (done) => {
    request(app)
    .put('/api/auth/create')
    .send(usr)
    .expect(409)
    .end((err) => (err ? done(err) : done()))
})


test('login user', (done) => {
    request(app)
    .post('/api/auth/login')
    .send(usr)
    .expect(200)
    .end((err) => (err ? done(err) : done()))
})

test('login user unauthorized', (done) => {
    usr.pass = 'funkymonkeys'
    request(app)
    .post('/api/auth/login')
    .send(usr)
    .expect(401)
    .expect('unauthorized')
    .end((err) => (err ? done(err) : done()))
})

test('log out', (done) => {
    request(app)
    .delete('/api/auth/logout')
    .expect(204)
    .end((err) => (err ? done(err) : done()))
})
