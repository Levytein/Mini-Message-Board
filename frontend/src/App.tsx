import { useEffect, useState } from 'react';
import './App.scss';
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div>
      <h1>React + Express Development</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
