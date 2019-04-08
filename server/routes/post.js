const post = require('../controllers/post');
module.exports = (app) => {
    //GET HTTP method to list All posts
    app.route('/post').get(post.index);
    //POST HTTP method to create post
    app.route('/post').post(post.create);
    //GET HTTP method to get post details. Here, we pass in a params which is the object id.
    app.route('/post/:id').get(post.getPost);
    //POST HTTP method to update post informations. Here, we pass in a params which is the object id.
    app.route('/post/:id/update').post(post.updatePost);
    //GET HTTP method to list All posts. here, we pass in a query parameter which is the object searchText
    app.route('/search').get(post.searchInPost);
}