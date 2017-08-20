'use strict'

import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from './middleware/promise'
import makeReducer from './makeReducer';

export default function configureStore (history, initialState) {

  const reducer = makeReducer();

  const middleware = [thunk, promise, routerMiddleware(history)]
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
  }

  const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  return createStore(reducer, initialState, enhancers)
}
