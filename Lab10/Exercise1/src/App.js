import React from 'react';
import FormComponent from './components/FormComponent.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>User Registration Form</h1>
        <p className="subtitle">Please fill in your information below</p>
        <FormComponent />
      </div>
    </div>
  );
}

export default App;
