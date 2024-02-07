import React, { useState } from 'react';
import styles from '../styles/Hamburger.module.css';

export default function Hamburger() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className={styles.nav}>
        <div className={styles.logo}>Logo</div>
        <label htmlFor="menu_toggle" className={styles.menu_icon} onClick={toggleMenu}>
          &#9776;
        </label>
        <input
          type="checkbox"
          id="menu_toggle"
          className={styles.menu_toggle}
          checked={menuOpen}
          onChange={toggleMenu}
        />
        <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownOpen : ''}`}>
          <div className={styles.dropdown_content}>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
