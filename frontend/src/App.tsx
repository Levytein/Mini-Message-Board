import { useEffect, useState } from 'react';
import './App.scss';
import Form from './views/Form';
import Pagination from './views/Pagination';
import MessageList from './views/messageList';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const [createMessage,setCreateMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/?page=${currentPage}&limit=${6}`
        );
        const data = await response.json();
  
        setMessages(data.messages); 
  
        setTotalPages(data.totalPages); 
        setTotalCount(data.totalCount); 
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
  
    fetchMessages();
  }, [fetchTrigger,currentPage]);

  function showMessageForm(){
    setCreateMessage(!createMessage);

  }
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  




  
  


  return (
    <div className={!isDarkMode ? "container darkTheme" : "container lightTheme"}>
      {createMessage && <Form createMessage={createMessage} setCreateMessage={setCreateMessage} setFetchTrigger={setFetchTrigger} />}
      <div className="header">
        <div className="newMsgContainer">
        <h1>Mini Message Board</h1>
 
        </div>
      <div className="themeSwitcherContainer">
      <button className="themeSwitcher" onClick={toggleTheme}>{isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 23" width="40px" height="40px" fill="gold">
  <circle cx="12" cy="12" r="5" />
  <g stroke="gold" stroke-width="2" stroke-linecap="round">
    <line x1="12" y1="1" x2="12" y2="5" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="5" y2="12" />
    <line x1="19" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </g>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 23" width="40px" height="40px" fill="white">
  <path d="M21.77 15.3a9 9 0 1 1-9.06-12.3 1 1 0 0 1 .9.6 1 1 0 0 1-.19 1.08A7 7 0 0 0 18 16a1 1 0 0 1 1.9.51 1 1 0 0 1-.13.79Z" />
</svg>}</button>
      <button className="newMessageButton" onClick={showMessageForm}>Message</button>
      
    
      </div>
      </div>
      <MessageList messages={messages} key={currentPage}  />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
