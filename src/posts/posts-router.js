const express = require('express')
const PostsService = require('./posts-service')

const jsonParser = express.json()
const postsRouter = express.Router()

postsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PostsService.getAllPosts(knexInstance)
            .then(posts => {
                res.json(posts)
            })
            .catch(next)
    })

    .post(jsonParser, (req, res, next) => {
        const { title, content } = req.body
        const newPost = {
            title,
            content
        }

        PostsService.insertPost(
            req.app.get('db'),
            newPost
        )
            .then(post => {
                res.status(201).json(post)
            })
            .catch(next)
    })

postsRouter
    .route('/:post_id')
    .get((req, res, next) => {
        PostsService.getById(
            req.app.get('db'),
            req.params.post_id
        )
        .then(post => {
            res.json(post)
        })
        .catch(next)
    })

module.exports = postsRouter