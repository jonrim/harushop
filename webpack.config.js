const env = process.env.NODE_ENV || 'development';

module.exports = require('./cfg/' + env + '.js');