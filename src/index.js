import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Find this element in DOM template and inject our app
);
