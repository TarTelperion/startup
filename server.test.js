const app = require('./server')
const request = require('supertest')

test('add story', (done) => {
    request(app)
    .post('/api/stories/add')
    .send({"author" : "gabe", "authors" : 1, "content" : "adsjdfklsdf", "id" : 4545})
    .expect(200)
    .expect('success')
    .end((err) => (err ? done(err) : done()))
})

test('GET story', (done) => {
    request(app)
    .get('/api/stories?id=4545')
    .expect(200)
    .expect({})
    .end((err) => (err ? done(err) : done()))
})

test('GET story invalid', (done) => {
    request(app)
    .get('/api/stories?id=5050')
    .expect(418)
    .end((err) => (err ? done(err) : done()))
})