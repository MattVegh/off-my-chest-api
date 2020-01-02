const express = require('express')
const CommentsService = require('./comments-service')

const jsonParser = express.json()
const commentsRouter = express.Router()

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

commentsRouter
    .route('/:comment_id')
    .get((req, res, next) => {
        CommentsService.getById(
            req.app.get('db'),
            req.params.comment_id
        )
        .then(comment => {
            res.json(comment)
        })
        .catch(next)
    })


module.exports = commentsRouter