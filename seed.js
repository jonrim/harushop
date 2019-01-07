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
          name: 'The Official Clothing Line of Haru®',
          imageUrls: 'https://vangogh.teespring.com/v3/image/oWJ_JXcnuF6mW8JDWXpC96hEAww/560/560.jpg ',
          price: 18.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru®',
          imageUrls: 'https://vangogh.teespring.com/v3/image/xn2L46eqORhmIlxpBzAqyZ25jhA/560/560.jpg',
          price: 25.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru®',
          imageUrls: 'https://vangogh.teespring.com/v3/image/0oblv7nT-lpJGCVEu_rx1fzukaQ/560/560.jpg',
          price: 35.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru® [Vector]',
          imageUrls: 'https://vangogh.teespring.com/v3/image/2ys-IfcmgKGPsThd6VtqNNpNjkM/560/560.jpg',
          price: 18.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru® [Vector]',
          imageUrls: 'https://vangogh.teespring.com/v3/image/RqUcWsv22w_yQ6OW6tApKhmKje8/560/560.jpg',
          price: 35.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru® [Vector]',
          imageUrls: 'https://vangogh.teespring.com/v3/image/sUDbHAYRbl2mD0s3z2H4N9yBZ9c/560/560.jpg',
          price: 25.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Triple Haru® Beach Towel',
          imageUrls: 'https://vangogh.teespring.com/v3/image/y_xgxLlQOShsHS5bWZ5n57KaLOk/560/560.jpg',
          price: 27.99,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The First Haru® Socks',
          imageUrls: 'https://vangogh.teespring.com/v3/image/ODkxfcYp9CWTiDitduGcYc4NS1Q/560/560.jpg',
          price: 15.99,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: `Haru's Tongue`,
          imageUrls: 'https://vangogh.teespring.com/v3/image/sMRBIJQKmqkfHEXslbXWw33Hvl0/560/560.jpg',
          price: 20.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru®',
          imageUrls: 'https://vangogh.teespring.com/v3/image/bQ45O_Yf041Dmd4noXBTfJZC4No/560/560.jpg',
          price: 35.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
        },
        {
          name: 'The Official Clothing Line of Haru®',
          imageUrls: 'https://vangogh.teespring.com/v3/image/cYE8ihgU-lFyRD5pAoj0ghfEXPo/560/560.jpg',
          price: 18.00,
          stock: '{sm: 0, md: 5, lg: 10}',
          description: 'Simple in design, easy to style and a real outline of Haru the Shiba Inu',
          productDetails: 'Top quality American Apparel brand, 100% Cotton, Seamless Collar, Double needle sleeve and bottom hems'
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