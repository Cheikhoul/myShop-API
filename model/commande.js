const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../data/index')

const Commande = sequelize.define('commandes', {
    // Model attributes are defined here
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Status: {
        type: Sequelize.SMALLINT,
        defaultValue: 0
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});

module.exports = Commande