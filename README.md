# Off-My-Chest-API

This is the API project used for the Off-My-Chest app.

# Endpoints

* GET /posts
Will receive all of the posts currently in the database.

* GET /comments
Will receive all of the comments currently in the database

* POST /posts
Will send the newly made post to the database.

* POST /comments
Will send the newly made comment to the database, tied to the post it's affiliated with. 

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`
