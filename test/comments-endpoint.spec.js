const knex = require('knex')
const app = require('../src/app')
const { makeCommentsArray } = require('./comments.fixtures')

describe('Comments Endpoints', function () {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    afterEach('clean the table', () => db.raw('TRUNCATE comments RESTART IDENTITY CASCADE'))

    describe('GET /comments', () => {
        context('given no comments', () => {
            it('responds with 200 empty list', () => {
                return supertest(app)
                    .get('/comments')
                    .expect(200, [])
            })
        })
    })

    describe('POST /comments', () => {
        it('created a comment, responds with 201 and new comment', function () {
            const newComment = {
                content: 'test comment content',
                post_id: 1
            }
            return supertest(app)
                .post('/comments')
                .send(newComment)
                .expect(201)
                .expect(res => {
                    const expected = { ...newComment, id: 1 }
                    const { date_created, ...actual } = res.body[0]
                    expect(actual).to.eql(expected)
                })

                .then(postRes => 
                    db('comments').where('id', postRes.body[0].id).first()
                        .then((comment) => {
                            expect(comment).to.eql({
                                ...postRes.body[0],
                                date_created: new Date(postRes.body[0].date_created)
                            })
                        
                        })
                )
        })
    })

})