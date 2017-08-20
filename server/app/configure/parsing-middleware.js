import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

module.exports = function (app) {

  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

}
