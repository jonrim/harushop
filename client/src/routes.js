import React from 'react';
import Promise from 'bluebird';
import { Route, IndexRoute } from 'react-router';
import {
  Shop
} from 'components'
import {
  Layout,
  NavbarLayout
} from './containers';

const getRoutes = (store) => {
  return (
    <Route component={NavbarLayout} path='/'>
      <IndexRoute component={Shop} />
    </Route>
  );
};

export default getRoutes;
