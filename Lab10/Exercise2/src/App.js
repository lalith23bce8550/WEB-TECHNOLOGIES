import React from 'react';
import ListComponent from './components/ListComponent';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        <p className="subtitle">Manage your tasks efficiently</p>
        <ListComponent />
      </div>
    </div>
  );
}

export default App;
