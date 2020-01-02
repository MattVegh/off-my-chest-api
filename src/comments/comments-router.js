const express = require('express')
const CommentsService = require('./comments-service')

const jsonParser = express.json()
const commentsRouter = express.Router()

const serializedComment = comment => ({
    id: comment.id,
    content: comment.content,
    postId: comment.post_id,
    date: comment.date_created
})

commentsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        CommentsService.getAllComments(knexInstance)
            .then(comments => {
                res.json(comments)
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { content, post_id } = req.body
        const newComment = { content, post_id }

        CommentsService.insertComment(
            req.app.get('db'),
            newComment
        )
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(next)
    })


module.exports = commentsRouter