const Category = require('../models').categories;
const Post = require('../models').posts;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = {
    index(req, res) {
        Category.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: Post
                }
            ]
        }).then((category) => {
            res.status(200).json(category);
        }).catch((err) => {
            throw new Error(err);
        });
    },
    create(req, res) {
        let data = req.body;
        Category
            .create(req.body)
            .then(function (category) {
                res.status(200).json(category);
            }).catch(err => {
                throw new Error(err);
            });
    },
    updateCategory(req, res) {
        Category
            .update(req.body, { where: { id: req.params.id } })
            .then(() => {
                res.status(200).json({ success: true });
            })
            .catch((err) => {
                throw new Error(err);
            });
    },
    delete(req, res) {
        Category.destroy({ where: { id: req.body.id } }).then((result) => {
            if (result) {
                res.status(200).json({ success: true });
            } else {
                res.status(200).json({ success: false });
            }
        })
            .catch((err) => {
                throw new Error(err);
            });
    },
    getCategory(req, res) {
        var data = req.params;
        Category
            .findOne({
                where: { id: data.id },
                attributes: ['id', 'title'],
                include: [{ model: Post }]
            })
            .then((category) => {
                res.status(200).json(category);
            }).catch((err) => {
                throw new Error(err);
            });
    },
    getTop3Category(req, res) {
        Category
            .findAll({
                attributes: ['id', 'title', [sequelize.literal('COUNT(`posts`.id)'), 'countOfPost']],
                include: [{ model: Post, attributes: [] }],
                group: 'title',
                order: [[sequelize.literal('COUNT(`posts`.id)'), 'DESC']]
            })
            .then((category) => {
                res.status(200).json(category);
            }).catch((err) => {
                throw new Error(err);
            });
    }
}

