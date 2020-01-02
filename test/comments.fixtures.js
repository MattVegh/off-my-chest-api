function makeCommentsArray() {

    return [
        {
            id: 1,
            content: 'test comment content',
            post_id: 2,
            date_created: new Date()
        }
    ]
}

module.exports = { makeCommentsArray }