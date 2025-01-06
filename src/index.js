import React from 'react';
import ReactDOM from 'react-dom/client'; // Change here
import App from './App'; // Ensure you're importing your App component
import './style.css'; // Import your CSS styles

const root = ReactDOM.createRoot(document.getElementById('root')); // Updated method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
