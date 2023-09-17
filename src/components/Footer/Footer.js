import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer id="footer">
            <div className="footer-section">
                <h3>FutureSports</h3>
                <p>Leading sports analytics and news. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="#about">About Us</a></li>
                    <li><a href="./legal/terms-and-Conditions.html" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></li>
                    <li><a href="./legal/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
