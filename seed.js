/*
This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.
It uses the same file the server uses to establish
the database connection:
--- server/db/index.js
The name of the database used is set in your environment files:
--- server/env/*
This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.
*/

const chalk = require('chalk');
const db = require('./server/app/db');
const Item = db.model('item');
const Promise = require('sequelize').Promise;

const seedItems = function () {
    const items = [
        {
          name: 'Orange Haru white shirt',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0505/1057/products/science.jpg?v=1447789931',
          price: 20.00,
          stock: '{sm: 0, md: 5, lg: 10}'
        },
        {
          name: 'Black Haru white shirt',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0601/4169/products/Home-Is-Where-The-Dog-Is-Unisex-Tee-Red.jpg?v=1461351140',
          price: 0.50,
          stock: '{sm: 1, md: 5, lg: 0}'
        },
        {
          name: 'Blue Haru white shirt',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0505/1057/products/science.jpg?v=1447789931',
          price: 20.00,
          stock: '{sm: 3, md: 0, lg: 10}'
        },
        {
          name: 'Red Haru white shirt',
          imageUrl: 'https://cdn.shopify.com/s/files/1/0505/1057/products/science.jpg?v=1447789931',
          price: 20.00,
          stock: '{sm: 0, md: 0, lg: 0}'
        }
    ];

    

    const creatingItems = items.map(itemObj => {
        return Item.create(itemObj);
    });


    return Promise.all(creatingItems);

};

db.sync({ force: true })
    .then(function () {
        return Promise.all([seedItems()]);
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        // process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });