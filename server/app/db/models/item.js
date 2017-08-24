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
        imageUrls: {
            type: Sequelize.TEXT,
            defaultValue: '',
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
        },
        description: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
        productDetails: {
            type: Sequelize.TEXT,
            defaultValue: ''
        },
    }, {    
    });



};