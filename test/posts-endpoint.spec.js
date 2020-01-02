const knex = require('knex')
const app = require('../src/app')
const { makePostsArray } = require('./posts.fixtures')

describe('Posts Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    afterEach('clean the table', () => db.raw('TRUNCATE posts RESTART IDENTITY CASCADE'))

    describe('GET /posts', () => {
        context('given no posts', () => {
            it('responds with 200 empty list', () => {
                return supertest(app)
                    .get('/posts')
                    .expect(200, [])
            })
        })
    })

    describe('POST /posts', () => {
        it('created a post, responds with 201 and new post', function () {
            const newPost = {
                title: 'test post title',
                content: 'test post content'
            }
            return supertest(app)
                .post('/posts')
                .send(newPost)
                .expect(201)
                .expect(res => {
                    const expected = { ...newPost, id: 1 }
                    const { date_created, ...actual } = res.body[0]
                    expect(actual).to.eql(expected)
                })

                .then(postRes => 
                    db('posts').where('id', postRes.body[0].id).first()
                        .then((post) => {
                            expect(post).to.eql({
                                ...postRes.body[0],
                                date_created: new Date(postRes.body[0].date_created)
                            })
                        
                        })
                )
        })
    })

})