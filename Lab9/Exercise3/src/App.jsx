import React, { useState } from 'react';

function App() {
  // State for counter value initialized to 0
  const [counter, setCounter] = useState(0);

  // Handler for increment button
  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  // Handler for decrement button
  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  // Handler for reset button
  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Counter Application</h1>
        <p style={styles.subtitle}>Interactive counter with increment and decrement buttons</p>
      </header>

      <div style={styles.card}>
        <div style={styles.counterDisplay}>
          <h2 style={styles.label}>Current Count</h2>
          <div style={styles.counterValue}>{counter}</div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.buttonDecrement} onClick={handleDecrement}>
            Decrement
          </button>
          <button style={styles.buttonReset} onClick={handleReset}>
            Reset
          </button>
          <button style={styles.buttonIncrement} onClick={handleIncrement}>
            Increment
          </button>
        </div>

        <div style={styles.info}>
          <p>Click the buttons to change the counter value</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px 20px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '40px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '18px',
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    width: '100%',
  },
  counterDisplay: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  label: {
    color: '#667eea',
    fontSize: '24px',
    marginBottom: '16px',
    fontWeight: '600',
  },
  counterValue: {
    fontSize: '80px',
    fontWeight: 'bold',
    color: '#764ba2',
    lineHeight: '1',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    border: '3px solid #667eea',
  },
  buttonContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  buttonIncrement: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(40, 167, 69, 0.3)',
  },
  buttonDecrement: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(220, 53, 69, 0.3)',
  },
  buttonReset: {
    backgroundColor: '#667eea',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
  },
  info: {
    textAlign: 'center',
    color: '#666',
    fontSize: '14px',
    marginTop: '20px',
  },
};

export default App;
