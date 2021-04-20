export const apiBaseUrl = 'http://mono-car-catalog.duckdns.org/api';

export const postOptions = JSON.stringify({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
});

export const getOptions = JSON.stringify({
  method: 'GET',
});
