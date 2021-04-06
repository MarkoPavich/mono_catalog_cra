export const apiBaseUrl = 'http://localhost:8000/api';

export const postOptions = JSON.stringify({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});

export const getOptions = JSON.stringify({
  method: 'GET',
});
