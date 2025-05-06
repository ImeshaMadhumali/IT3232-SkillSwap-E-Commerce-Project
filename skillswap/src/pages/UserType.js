// src/pages/UserTypeSelectionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelectionPage = () => {
  const navigate = useNavigate();
  
  const handleNext = (userType) => {
    // Save user type to localStorage or state management
    localStorage.setItem('userType', userType);
    
    // Navigate to the categories selection page
    navigate('/setup/categories');
  };
  
  // Inline CSS styles
  const styles = {
    setupContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#a3ffb9', // Light green background
      padding: '20px',
    },
    setupCard: {
      backgroundColor: '#b4c5ff', // Light blue background for the card
      borderRadius: '8px',
      padding: '40px',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    setupTitle: {
      fontSize: '24px',
      marginBottom: '8px',
      color: '#333',
    },
    setupSubtitle: {
      fontSize: '18px',
      marginBottom: '40px',
      color: '#333',
    },
    userTypeOptions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '60px',
    },
    userTypeOption: {
      backgroundColor: '#e0e0e0', // Light gray for option boxes
      borderRadius: '8px',
      padding: '30px 20px',
      width: '180px',
      textAlign: 'center',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.2s, transform 0.2s',
      ':hover': {
        backgroundColor: '#d0d0d0',
        transform: 'translateY(-3px)',
      },
    },
    userTypeOptionHover: {
      backgroundColor: '#d0d0d0',
      transform: 'translateY(-3px)',
    },
    setupNavigation: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    setupNextButton: {
      backgroundColor: '#e0e0e0',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s',
    },
    setupNextButtonHover: {
      backgroundColor: '#d0d0d0',
    },
  };

  return (
    <div style={styles.setupContainer}>
      <div style={styles.setupCard}>
        <h1 style={styles.setupTitle}>Welcome to Skill Swap</h1>
        <p style={styles.setupSubtitle}>Let's set you up!</p>
        
        <div style={styles.userTypeOptions}>
          <div 
            style={styles.userTypeOption}
            onClick={() => handleNext('provider')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#d0d0d0';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e0e0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            I am skill provider
          </div>
          
          <div 
            style={styles.userTypeOption}
            onClick={() => handleNext('client')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#d0d0d0';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e0e0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            I am client
          </div>
        </div>
        
        <div style={styles.setupNavigation}>
          <button 
            style={styles.setupNextButton}
            onClick={() => navigate('/setup/categories')}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#d0d0d0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e0e0';
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelectionPage;