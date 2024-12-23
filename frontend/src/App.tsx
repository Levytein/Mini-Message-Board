import { useEffect, useState } from 'react';
import './App.scss';
import Form from './views/Form';
import { toZonedTime , format } from 'date-fns-tz';
import Pagination from './views/Pagination';

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
  
        setMessages(data.messages); // Set the messages for the current page
        setTotalPages(data.totalPages); // Set total pages for pagination
        setTotalCount(data.totalCount); // Set total number of messages
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
  const getRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360); 
    const hue2 = Math.floor(Math.random() * 360); 
    return {background: `linear-gradient(90deg, hsl(${hue}, 80%, 50%),  hsl(${hue2}, 60%, 60%)`};
  };




  function formattedDate(date:string, timeZone:string) {

  
    try {
      const zonedDate = toZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone); 
      const formatted = format(zonedDate, 'MM/dd/yyyy hh:mm a');
      console.log('Formatted Date:', formatted);
      return formatted;
    } catch (err) {
      console.error('Error in formattedDate:', err);
      return 'Invalid Date';
    }
  }
  


  return (
    <div className={!isDarkMode ? "container darkTheme" : "container lightTheme"}>
      {createMessage && <Form createMessage={createMessage} setCreateMessage={setCreateMessage} setFetchTrigger={setFetchTrigger} />}
      <div className="header">
        <div className="newMsgContainer">
        <h1>Mini Message Board</h1>
 
        </div>
      <div className="themeSwitcherContainer">
      <button className="themeSwitcher" onClick={toggleTheme}>{isDarkMode ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40px" height="40px" fill="gold">
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
</svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40px" height="40px" fill="white">
  <path d="M21.77 15.3a9 9 0 1 1-9.06-12.3 1 1 0 0 1 .9.6 1 1 0 0 1-.19 1.08A7 7 0 0 0 18 16a1 1 0 0 1 1.9.51 1 1 0 0 1-.13.79Z" />
</svg>}</button>
      <button className="newMessageButton" onClick={showMessageForm}>New Message</button>
      
    
      </div>
      </div>
      <ul>
      {messages.map((message, index) => {
            console.log('Message:', message);
            console.log('Posted:', message.posted);
            console.log('Time Zone:', message.time_zone);

            return (
              <li className="userMessageContainer" key={index}>
                <div className="userIcon" style={getRandomHSL()}>

                </div>
                <div className="speechBubble" >
                    
                <div className="userInfo">
                  <p className="userName">{message.username}</p>
                  <p className="datePosted">
                    {formattedDate(message.posted, message.time_zone)}
                  </p>
                </div>
                <div className="message">{message.message}</div>
                </div>
              </li>
            );
          })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
