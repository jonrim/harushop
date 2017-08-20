import 'whatwg-fetch';
import {
  parseJSON,
  postJSON,
  checkStatus
} from '../../utils';

const BASE_URL = process.env.URL || `//localhost:${process.env.PORT}`;

export const fetchSession = () => {
  return fetch(`${BASE_URL}/session`, {credentials: 'same-origin'}).then(checkStatus);
}

export const tryLogin = (credentials) => {
  return fetch(`${BASE_URL}/login`, postJSON(credentials, {
    credentials: 'same-origin'
  }))
    .then(checkStatus);
}

export const tryLogout = () => {
  return fetch(`${BASE_URL}/logout`, {credentials: 'same-origin'}).then(checkStatus);
}

export default {
  fetchSession,
  tryLogin,
  tryLogout
};

