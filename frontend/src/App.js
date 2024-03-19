import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'; // Import useState and useEffect from 'react'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from backend
    fetch('/api/hello')
      .then(response => response.text())
      .then(data => {
        setMessage(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
      <h1>Hello World from frontend!</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;
