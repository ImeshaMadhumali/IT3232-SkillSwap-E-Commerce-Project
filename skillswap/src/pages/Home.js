import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

function HomePage() {
  const categories = [
    'Content writing',
    'Assignment Guidance',
    'Video Editing',
    'Web developing',
    'Mobile App developing',
  ];

  return (
    <div style={{ backgroundColor: '#a5b4fc', minHeight: '100vh', padding: '20px' }}>
      {/* Navbar */}
      <Navbar />

      {/* Login/Register Buttons aligned to nav links row */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '10px',
        marginTop: '-40px', // pull up to nav level
        marginBottom: '20px',
      }}>
        <Link to="/login">
          <button style={buttonStyle}>Login</button>
        </Link>
        <Link to="/register">
          <button style={buttonStyle}>Register</button>
        </Link>
      </div>

      {/* Main Content */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontWeight: 'bold' }}>Meet our higher scored service providers...</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div></div>
          <span style={{ cursor: 'pointer' }}>Show All</span>
        </div>

        <div style={{ display: 'flex', marginTop: '20px', gap: '40px' }}>
          {/* Service Categories */}
          <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {categories.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Featured Providers */}
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={providerCardStyle}></div>
            <div style={providerCardStyle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#f3f4f6',
  border: '1px solid #ccc',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '500',
};

const providerCardStyle = {
  width: '200px',
  height: '200px',
  backgroundColor: '#e5e7eb',
  borderRadius: '8px',
};

export default HomePage;
