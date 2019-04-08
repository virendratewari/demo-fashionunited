const Category = require('../models').categories;
const Post = require('../models').posts;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}
module.exports = {
    index(req, res) {
        Post.findAll({
            include: [
                {
                    model: Category
                }
            ]
        }).then((posts) => {
            res.status(200).json(posts);
        }).catch((err) => {
            throw new Error(err);
        });
    },
    create(req, res) {
        let data = req.body;
        let slug = data.title.replace(/[^A-Za-z0-9-]+/gi, '-').toLowerCase();
        Post.findAndCountAll({
            where: {
                slug: { $like: slug + "%" }
            }
        }).then((result) => {
            let slugArr = [];
            new Promise((resolve) => {
                if (result.count > 0) {
                    result.rows.forEach(element => {
                        slugArr.push(element.slug);
                    });
                    if (slugArr.includes(slug)) {
                        for (let index = 1; index <= slugArr.length; index++) {
                            if (!slugArr.includes(slug + "-" + index)) {
                                slug = slug + "-" + index;
                            }
                        }
                    }
                    resolve(slug);
                } else {
                    resolve(slug);
                }
            }).then((result) => {
                data.slug = result;
                Post
                    .create(data)
                    .then(function (post) {
                        res.status(200).json(post);
                    }).catch(err => {
                        throw new Error(err);
                    });
            })
        })
    },
    getPost(req, res) {
        var data = req.params;
        Post
            .findOne({
                where: { id: data.id },
                include: [{ model: Category }]
            })
            .then((post) => {
                Post.update({ hits: sequelize.literal('hits + 1') }, { where: { id: data.id } }).then(() => {
                    res.status(200).json(post);
                });
            }).catch((err) => {
                throw new Error(err);
            });
    },
    updatePost(req, res) {
        let pid = req.params;
        let pdata = req.body;
        pdata.slug = pdata.title.replace(/[^A-Za-z0-9-]+/gi, '-').toLowerCase();
        Post.update(
            pdata,
            { where: { id: pid.id } }
        )
            .then((result) => {
                res.status(200).json({ success: true });
            })
            .catch((err) => {
                throw new Error(err);
            });
    },
    searchInPost(req, res) {
        var query = req.query;
        const whereStatement = {};
        if (query.searchText) {
            whereStatement.$or = [{
                title: {
                    '$like': '%' + query.searchText + '%',
                },
            },
            {
                text: {
                    '$like': '%' + query.searchText + '%',
                },
            },
            {
                '$category.title$': {
                    $like: '%' + query.searchText + '%',
                },
            },
            ];
        }
        Post.findAndCountAll({
            where: whereStatement,
            include: [{
                model: Category
            }]
        }).then((posts) => {
            res.status(200).json(posts);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}