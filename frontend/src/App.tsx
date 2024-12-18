import { useEffect, useState } from 'react';
import './App.scss';
import Form from './views/Form';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [createMessage,setCreateMessage] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  function showMessageForm(){
    setCreateMessage(!createMessage);

  }

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessages(data.messages))
      .catch((err) => console.error('Error fetching data:', err));
  }, [fetchTrigger]);

  return (
    <div className="container">
      {createMessage && <Form createMessage={createMessage} setCreateMessage={setCreateMessage} setFetchTrigger={setFetchTrigger} />}
      <div className="header">
      <h1>Mini Message Board</h1>
      <button onClick={showMessageForm}>New Message</button>
      </div>
      <ul>
      {messages.map((message,index) =>(
 
        <li key={index}>
          <div className="userInfo"><p className="userName">{message.user}</p><p className="datePosted">{message.added}</p></div>
          <div>{message.message}</div>
          </li>
        
      ))}
      </ul>
    </div>
  );
}

export default App;
