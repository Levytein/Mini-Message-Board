import { toZonedTime , format } from 'date-fns-tz';
import './MessageList.scss';
function MessageList({messages}){;

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
    return(
        <>
        <ul>
        {messages.map((message, index) => {
              console.log('Message:', message);
              console.log('Posted:', message.posted);
              console.log('Time Zone:', message.time_zone);
  
              return (
                
                <li className="userMessageContainer" key={index} style={{animationDelay: `${index * .2}s`}}>
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
        </>
    );
}
export default MessageList;