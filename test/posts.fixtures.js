function makePostsArray() {

    return [
        {
            id: 1,
            title: 'test post title',
            content: 'test post content',
            date_created: new Date()
        }
    ]
}

module.exports = { makePostsArray }