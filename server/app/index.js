import path from 'path';
import chalk from 'chalk';
import express from 'express';
import configure from './configure';
import apiRouter from './api';
import secrets_prod from '../../secrets_prod';
import secrets from '../../secrets';

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
? secrets_prod.STRIPE_SECRET_KEY_LIVE
: secrets.STRIPE_SECRET_KEY_TEST;

var stripe = require("stripe")(STRIPE_SECRET_KEY);

const db = require('./db');
const Item = db.model('item');
const app = express();

module.exports = function () {

  configure(app);

  // Route Definition
  app.use('/api', apiRouter());

  /*
   Middleware to catch URLs resembling file extensions
   e.g: .js, .html, .css
   Allows for proper 404s instead of the wildcard catching
   URLs that bypass express.static because the provided file
   does not exist.
   */


  app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
      res.status(404).end();
    } else {
      next(null);
    }
  });

  app.get('/bundle.js', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../public/bundle.js'));
  });

  app.get('/db', (req, res) => {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      client.query('SELECT * FROM users', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.render('pages/db', {results: result.rows} ); }
      });
    });
  });

  app.get('/items', (req, res) => {
    Item.findAll()
    .then(items => {
      res.json(items);
    });
  })

  app.get('*', (req, res) => {
    res.sendFile(app.get('indexHTMLPath'));
  });

  app.post('/save-stripe-token', (req, res, next) => {
    stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      source: req.body.source,
      description: req.body.fullName + ' - ' + req.body.street + ' ' + req.body.city + ', ' + req.body.state + ' ' + req.body.zip,
      destination: req.body.destination,
      receipt_email: req.body.email
    })
  })

  // Error catching
  app.use((err, req, res, next) => {
    console.log(chalk.yellow(' ------ERROR THROWN-------'));
    console.error(chalk.red(err.stack));
    console.log(chalk.yellow(' ------ERROR THROWN-------'));
    res
    .status(err.status || 500)
    .json({
      error_code: err.status || 500,
      message: err.message || 'Internal server error.'
    });
  });

  return app;
}
