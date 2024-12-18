import { useEffect, useState } from 'react';
import styles from './Form.module.scss';

function Form({createMessage,setCreateMessage,setFetchTrigger}) {


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
  
    // Get input values
    const user = e.target.user.value;
    const message = e.target.message.value;
    // Send data to the backend
    const response = await fetch('http://localhost:5000/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, message}),
    });
  
    if (response.ok) {
      const result = await response.text();
      console.log(result); // e.g., "Form submitted successfully!"
    } else {
      console.error('Error submitting form');
    }
    setCreateMessage(!createMessage);
    setFetchTrigger((prev)=> prev + 1);
  };
  /*useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);
    */
  return (
    <div>
      <form method='POST' onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type='text' name="user" id="user" />
        <label>Message:</label>
        <input type='text' name="message" id="message" />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Form;
