import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="l-footer">
      <div className="l-footer-txt-box">
        <span>© Marko Pavić</span>
        <a href="https://www.marko-pavic.tk">www.marko-pavic.tk</a>
      </div>
      <div className="l-footer-txt-box">
        <a href="mailto:marko.pavic667@gmail.com">
          <strong>eMail: </strong>marko.pavic667@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/MarkoPavich">
          <strong>linkedIn: </strong>www.linkedin.com/in/MarkoPavich
        </a>
      </div>
    </footer>
  );
}

export default Footer;
