import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDigitalOcean,
  faGithubAlt,
  faGolang,
  faLinkedinIn,
  faNodeJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer p-8 bg-base-200 text-base-content">
        <div>
          <p>Chronicle</p>
          <p>
            Made by Christopher Oswald<sup>(beast)</sup>
          </p>
        </div>
        <div>
          <span className="footer-title">Links</span>
          <a
            href="https://github.com/cesoun"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithubAlt} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/christopher-oswald-611b981b8/"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn
          </a>
        </div>
        <div>
          <span className="footer-title">Powered By</span>
          <a
            href="https://golang.org"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGolang} /> Golang
          </a>
          <a
            href="https://nodejs.org"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faNodeJs} /> NodeJS
          </a>
          <a
            href="https://reactjs.org"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faReact} /> React
          </a>
          <a
            href="https://www.digitalocean.com/?refcode=e0b8480270bf&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"
            target="_blank"
            className="link link-hover"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faDigitalOcean} /> DigitalOcean
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
