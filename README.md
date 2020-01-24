# Off-My-Chest-API

This is the API project used for the Off-My-Chest app.

## Live Link
* [Off-My-Chest](https://off-my-chest-client.mdv240.now.sh/)
* [Database for posts](https://off-my-chest-api.herokuapp.com/posts)
* [Database for comments](https://off-my-chest-api.herokuapp.com/comments)

# Endpoints

* GET /posts
Will receive all of the posts currently in the database.

* GET /comments
Will receive all of the comments currently in the database

* POST /posts
Will send the newly made post to the database.

* POST /comments
Will send the newly made comment to the database, tied to the post it's affiliated with. 

## Screenshots
The home page listing all of the posts.
![omc-home](https://user-images.githubusercontent.com/49329279/72658163-bbeabe80-3972-11ea-8015-e681fbc7db83.png)

Individual post shown with comments
![omc-post-with-comments](https://user-images.githubusercontent.com/49329279/72658170-c60cbd00-3972-11ea-8a3c-b71aca5da920.png)

## Built With

* React - The framework used
* [Zeit](https://zeit.co) - Holds the live version
* [Heroku](https://www.heroku.com) - Holds the database server

## Author

* **Matthew Vegh** 
