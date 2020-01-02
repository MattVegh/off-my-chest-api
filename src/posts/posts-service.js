const PostsService = {
    getAllPosts(knex) {
        return knex.select('*').from('posts')
    },

    insertPost(knex, newPost) {
        return knex
            .insert(newPost)
            .into('posts')
            .returning('*')
    },

    getById(knex, id) {
        return knex
            .from('posts')
            .select('*')
            .where('id', id)
            .first()
    }
}

module.exports = PostsService