import './Form.scss'; 

interface FormProps {
  createMessage: boolean;
  setCreateMessage: (value: boolean) => void;
  setFetchTrigger: (value: number | ((prev: number) => number)) => void;
}

function Form({ createMessage, setCreateMessage, setFetchTrigger }: FormProps) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const localTime = new Date().toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    // Get input values
    const form = e.target as HTMLFormElement;
    const user = (form.elements.namedItem('user') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    // Send data to the backend
    const response = await fetch(`${baseUrl}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, message,posted:localTime,timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone}),
    });
  
    if (response.ok) {
      const result = await response.text();
      console.log(result); 
    } else {
      console.error('Error submitting form');
    }
    setCreateMessage(!createMessage);
    setFetchTrigger((prev)=> prev + 1);
  };

  const handleExit =() =>{
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
    <div className='formContainer' >
      <div className='overlay'></div>
      <form method='POST' onSubmit={handleSubmit}>
        <button type="button" onClick={handleExit} className='exitButton'>X</button>
        <div className='usernameInput'>
        <label>Username:</label>
        <input type='text' name="user" id="user" required  />
        </div>
        <div className='messageInput'>
        <label>Message:</label>
        <textarea name="message" id="message" placeholder='Enter your message here!' maxLength={100} required />
          
        </div>
        <button className='submitButton' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Form;
