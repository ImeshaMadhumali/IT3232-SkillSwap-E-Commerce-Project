import React, { useState } from 'react';
import { login } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    try {
      const result = await login(email, password);
      setLoading(false);
      
      if (result.success) {
        setLoggedIn(true);
        // Navigate to the UserType selection page after successful login
        navigate('/usertype');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error. Please try again later.');
      console.error('Login error:', err);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement your forgot password logic here
    console.log('Forgot password clicked');
  };

  return (
    <form style={styles.authForm} onSubmit={handleSubmit}>
      <h2 style={styles.title}>Skill Swap</h2>
      
      {error && <div style={styles.errorMessage}>{error}</div>}
      
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
          placeholder="Enter your password"
          required
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#a5b4fc'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>
      
      <div style={styles.formGroup}>
        <button 
          onClick={handleForgotPassword} 
          type="button"
          style={styles.forgotPassword}
        >
          Forgot password?
        </button>
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
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <div style={styles.registerLink}>
        Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
      </div>
      <div style={styles.sociallogin}>
        <button 
          type="button" 
          style={{...styles.socialButton, ...styles.googleButton}}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
        >
          Login with Google
        </button>
        <button 
          type="button" 
          style={{...styles.socialButton, ...styles.facebookButton}}
          onMouseOver={(e) => e.target.style.backgroundColor = '#324b81'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b5998'}
        >
          Login with Facebook
        </button>
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
  inputFocus: {
    borderColor: '#a5b4fc',
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(165, 180, 252, 0.3)',
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
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: '#6366F1',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0',
    marginLeft: 'auto',
    display: 'block',
    textAlign: 'right',
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
  btnSubmitHover: {
    backgroundColor: '#818cf8',
  },
  btnSubmitDisabled: {
    backgroundColor: '#c7d2fe',
    cursor: 'not-allowed',
  },
  registerLink: {
    margin: '20px 0',
    fontSize: '14px',
    color: '#4b5563',
    textAlign: 'center',
    width: '100%',
  },
  link: {
    color: '#6366F1',
    textDecoration: 'none',
    fontWeight: '500',
  },
  sociallogin: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px',
    marginTop: '15px',
  },
  socialButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    color: '#333',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    color: '#ffffff',
  }
};

export default Login;