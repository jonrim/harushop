import path from 'path';
import express from 'express';

module.exports = function (app) {

  const root = app.getValue('projectRoot');

  const npmPath = path.join(root, './node_modules');
  const semanticPath = path.join(root, './semantic/dist');
  const buildPath = path.join(root, './client/build');

  app.use(express.static(npmPath));
  app.use(express.static(semanticPath));
  app.use(express.static(buildPath));

}
