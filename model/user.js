const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../data/index')

const User = sequelize.define('utilisateurs', {
    // Model attributes are defined here
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Surname: {
        type: Sequelize.STRING,
        allowNull:false
    },
    Address: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    Admin: {
        type: Sequelize.BOOLEAN,
        allowNull:false
    }
}, {
    // Other model options go here
});

module.exports = User