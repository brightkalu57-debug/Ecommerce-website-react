import { useState } from 'react';
import { ChatMessages } from './chatmessages';
import { InputComponent } from './InputComponent';
import { WelcomeMessage } from './WelcomeMessage';
import './App.css'; 

export function App() {
  const [Messages, setMessages] = useState([]);

  return (
    <div className="App">
      <WelcomeMessage />
      <ChatMessages
        Messages={Messages}
        setMessages={setMessages}
      />
      <InputComponent
        Messages={Messages}
        setMessages={setMessages}
      />
    </div>
  );
}

export default App
