import React from 'react';

// eslint-disable-next-line
import styles from './Footer.css';

let actualDate = new Date();
let year = actualDate.getFullYear();

const Footer = () => {
  return (
    <footer>
        <p>Centro de masajes &copy; {year}</p>
    </footer>
  )
};

export default Footer;
