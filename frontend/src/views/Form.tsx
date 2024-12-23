import { useEffect, useState } from 'react';
import styles from './Form.module.scss';

function Form({createMessage,setCreateMessage,setFetchTrigger}) {

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    const localTime = new Date().toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    // Get input values
    const user = e.target.user.value;
    const message = e.target.message.value;
    // Send data to the backend
    const response = await fetch('http://localhost:5000/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, message,posted:localTime,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone}),
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

  const handleExit =(e) =>{
    console.log("buttonClicked");
    setCreateMessage(!createMessage);
  };
  /*useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);
    */
  return (
    <div className={styles.formContainer} >
      <div className={styles.overlay}></div>
      <form method='POST' onSubmit={handleSubmit}>
        <button type="button" onClick={handleExit} className={styles.exitButton}>X</button>
        <div className={styles.usernameInput}>
        <label>Username:</label>
        <input type='text' name="user" id="user" required  />
        </div>
        <div className={styles.messageInput}>
        <label>Message:</label>
        <textarea name="message" id="message" placeholder='Enter your message here!' maxLength={100} required />
          
        </div>
        <button className={styles.submitButton}type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Form;
