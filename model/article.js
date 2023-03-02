const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../data/index')

const Article = sequelize.define('articles', {
    // Model attributes are defined here
    ArticleName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Price: {
        type: Sequelize.DECIMAL(6,2)
        // allowNull defaults to true
    },
    photo: {
        type: Sequelize.STRING
    }
}, {
    // Other model options go here
});

module.exports = Article