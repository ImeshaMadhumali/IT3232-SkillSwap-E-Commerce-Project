import React, { useState } from 'react';
import { register } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';

function Register({ setIsLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Added useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    const result = await register(name, email, password);
    setLoading(false);
    
    if (result.success) {
      setSuccess('Registration successful! You can now login.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate('/login'); // Navigate to the login page
      }, 2000);
    } else {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <form style={styles.authForm} onSubmit={handleSubmit}>
      <h2 style={styles.title}>Create an Account</h2>
      
      {error && <div style={styles.errorMessage}>{error}</div>}
      {success && <div style={styles.successMessage}>{success}</div>}
      
      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#a5b4fc'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#a5b4fc'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label htmlFor="password" style={styles.label}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#a5b4fc'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>
      
      <div style={styles.formGroup}>
        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#a5b4fc'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>
      
      <button 
        type="submit" 
        style={{
          ...styles.btnSubmit,
          ...(loading ? styles.btnSubmitDisabled : {})
        }}
        disabled={loading}
        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#818cf8')}
        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#a5b4fc')}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      {/* Link to Login page */}
      <div style={styles.loginLink}>
        Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
      </div>
    </form>
  );
}

// Inline styles
const styles = {
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '350px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '25px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#4b5563',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  errorMessage: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
    width: '100%',
    textAlign: 'center',
  },
  successMessage: {
    backgroundColor: '#D1FAE5',
    color: '#10B981',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
    width: '100%',
    textAlign: 'center',
  },
  btnSubmit: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#a5b4fc',
    borderRadius: '6px',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  btnSubmitDisabled: {
    backgroundColor: '#c7d2fe',
    cursor: 'not-allowed',
  },
  loginLink: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#4b5563',
    textAlign: 'center',
  },
  link: {
    color: '#6366F1',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Register;
