'use strict';
var db = require('./_db');

require('./models/item')(db);

module.exports = db;