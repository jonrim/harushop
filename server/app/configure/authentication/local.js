import passport from 'passport';
import request from 'request-promise';

const LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, db) {

  // When passport.authenticate('local') is used, this function will receive
  // the email and password to run the actual authentication logic.
  const strategyFn = (username, password, done) => {
    request({
      uri: process.env.DAB_DB + '/api/users/master/login',
      qs: {
        access_token: process.env.ACCESS_TOKEN
      },
      method: 'POST',
      json: true,
      body: {
        username,
        password
      }
    })
    .then(user => {
      if (!user) {
        done(null, false)
      } else {
        // Properly authenticated
        done(null, user)
      }
    })
    .catch(done);
  }

  passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, strategyFn))

  // A POST /login route is created to handle login
  app.post('/login', (req, res, next) => {

    const authCb = (err, user) => {

      if (err) return next(err)

      if (!user) {
        const error = new Error('Invalid login credentials.')
        error.status = 401
        return next(error)
      }

      // req.login will establish our session
      req.login(user, loginErr => {
        if (loginErr) return next(loginErr)
        // We respond with a response object that has user with id and email
        res.status(200).send({
          user
        })
      })
    }

    passport.authenticate('local', authCb)(req, res, next)

  })
}
