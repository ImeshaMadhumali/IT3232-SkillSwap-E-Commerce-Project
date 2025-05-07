import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <style>
        {`
          .nav-link {
            text-decoration: none;
            color: black;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .nav-link:hover {
            color: blue;
          }
        `}
      </style>

      <nav style={styles.navbar}>
        {/* Top row: Logo | Search (centered) | Icons (future) */}
        <div style={styles.topRow}>
          <div style={styles.leftSection}>
            <strong style={styles.logo}>SKILL SWAP</strong>
          </div>

          <div style={styles.centerSection}>
            <input
              type="text"
              placeholder="What service you need today..."
              style={styles.search}
            />
          </div>

          <div style={styles.rightSection}>
            {/* You can add notification/message icons here */}
            {/* <NotificationIcon /> */}
          </div>
        </div>

        {/* Second row: Navigation Links */}
        <div style={styles.links}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/community" className="nav-link">Community</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/tasks" className="nav-link">My Tasks</Link>
        </div>
      </nav>
    </>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 20px',
    backgroundColor: '#a5b4fc',
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  leftSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  centerSection: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  search: {
    padding: '5px',
    width: '100%',
    maxWidth: '400px',
    minWidth: '200px',
  },
  links: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
};

export default Navbar;