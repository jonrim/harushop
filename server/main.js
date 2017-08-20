import chalk from 'chalk';

// Create a node server instance!
const server = require('http').createServer();

const createApplication = () => {
  const app = require('./app')();
  server.on('request', app); // Attach the Express application
}

const startServer = () => {

  const PORT = process.env.PORT;

  server.listen(PORT, () => {
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
  });

}

createApplication();
startServer();
