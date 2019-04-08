const category = require('../controllers/category');
module.exports = (app) => {
    //GET HTTP method to list All category
    app.route('/category').get(category.index);
    //POST HTTP method to create category
    app.route('/category').post(category.create);
    //DELETE HTTP method to detele category
    app.route('/category').delete(category.delete);
    //GET HTTP method to get category details. Here, we pass in a params which is the object id.
    app.route('/category/:id').get(category.getCategory);
    //POST HTTP method to update category title. Here, we pass in a params which is the object id.    
    app.route('/category/:id/update').post(category.updateCategory);
    //GET HTTP method to list top 3 category
    app.route('/top3categories').get(category.getTop3Category);
};