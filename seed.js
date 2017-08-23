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
          imageUrls: "https://i.gyazo.com/ded971f5828df9741bb080b1515b08c0.png,https://i.gyazo.com/220fd07dd52c1443201565e15913b4c0.jpg,https://i.gyazo.com/0d2d3ba740378137d8b4b80a6bcf0337.jpg,https://i.gyazo.com/1d9d22af84db10e0b1402ee4ec423091.jpg,https://i.gyazo.com/55e3ffd1eb4a0a2e1ef0d44d6b432a1a.png",
          price: 20.00,
          stock: '{sm: 0, md: 5, lg: 10}'
        },
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