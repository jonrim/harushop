import React from 'react';
import Promise from 'bluebird';
import { Route, IndexRoute } from 'react-router';
import {
  Shop
} from 'components'

const getRoutes = (store) => {
  return (
    <Route component={Shop} path='/' />
  );
};

export default getRoutes;
