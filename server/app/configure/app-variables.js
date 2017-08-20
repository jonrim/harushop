import path from 'path';
import chalk from 'chalk';
import util from 'util';

const rootPath = path.join(__dirname, '../../../');
const indexPath = path.join(rootPath, './client/build/index.html');


const logMiddleware = (req, res, next) => {
  util.log(('---NEW REQUEST---'));
  console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST', req.method, req.path));
  console.log(util.format(chalk.yellow('%s: %s'), 'QUERY', util.inspect(req.query)));
  console.log(util.format(chalk.cyan('%s: %s'), 'BODY', util.inspect(req.body)));
  next();
}

module.exports = function (app) {
  app.setValue('projectRoot', rootPath);
  app.setValue('indexHTMLPath', indexPath);
  app.setValue('log', logMiddleware);
}
