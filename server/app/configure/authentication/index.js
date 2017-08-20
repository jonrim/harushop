import path from 'path';
import session from 'express-session';
import passport from 'passport';
import request from 'request-promise';

const RedisStore = require('connect-redis')(session);

const ENABLED_AUTH_STRATEGIES = [
  'local'
];

module.exports = function (app) {

  app.use(session({
    store: new RedisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));

  // Initialize passport and also allow it to read
  // the request session information.
  app.use(passport.initialize());
  app.use(passport.session());


  // Enabled strategies get registered.
  ENABLED_AUTH_STRATEGIES.forEach(strategyName => {
    require(path.join(__dirname, strategyName))(app);
  });

}
