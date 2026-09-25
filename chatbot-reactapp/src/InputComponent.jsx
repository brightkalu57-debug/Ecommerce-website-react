import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import LoadingGif  from './assets/loading.gif';

export function InputComponent({ Messages, setMessages }) {
    const [InputedValue, setInputedValue] = useState('');

    function InputValue(event) {
      setInputedValue(event.target.value);
    }

    async function sendMessage(event) {
      if (
        InputedValue !== '' &&
        (event.key === 'Enter' || event.type === 'click')
      ) {
        const NewMessages = [
          ...Messages,
          {
            message: InputedValue,
            sender: 'user',
            id: crypto.randomUUID(),
          },
        ];

        setMessages(NewMessages);

        setMessages([
          ...NewMessages,
          {
            message: (
              <img
                className="loadingimg"
                src={LoadingGif}
              />
            ),
            sender: 'robot',
            id: crypto.randomUUID(),
          },
        ]);
        const response = await Chatbot.getResponseAsync(InputedValue);
        setMessages([
          ...NewMessages,
          {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID(),
          },
        ]);

        setInputedValue('');
      }
    }

    return (
      <div className="chatbot-input-container">
        <input
          className="chatbot-input"
          value={InputedValue}
          onChange={InputValue}
          onKeyDown={sendMessage}
          placeholder="Send message to Chatbot"
        />
        <button
          className="chatbot-send-button"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    );
  }