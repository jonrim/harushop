import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

export default function makeReducer() {
  return combineReducers({
    routing
  });
}
