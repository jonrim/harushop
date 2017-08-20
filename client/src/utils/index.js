export function parseJSON(response) {
  return response.text()
  .then(text => text ? JSON.parse(text) : {})
}

export const parseData = res => res.data

export function postJSON(body, options) {
  return {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  };
}

export function putJSON(body, options) {
  return {
    ...options,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  };
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
