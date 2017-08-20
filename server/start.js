var path = require('path');

// Allow ES6 on the server-side
require('babel-register');
require('dotenv').config({
  path: path.join(__dirname, './env/' + (process.env.NODE_ENV || 'development') + '.env')
});
require('./main');
