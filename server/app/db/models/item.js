'use strict';
const crypto = require('crypto');
const Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('item', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        stock: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
            }
        }
    }, {    
    });



};