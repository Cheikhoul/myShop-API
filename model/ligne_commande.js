const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../data/index')

const ligne_commande = sequelize.define('ligne_commandes', {
    // Model attributes are defined here
    ArticleId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CommandeId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // Other model options go here
});

module.exports = ligne_commande