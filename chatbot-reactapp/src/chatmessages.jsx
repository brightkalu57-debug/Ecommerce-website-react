import { useEffect } from 'react'
import { useRef } from 'react'
import { ChatMessage } from './chatmessage'

export function ChatMessages({ Messages, setMessages }) {
    const MessagesContainer = useRef(null);
    useEffect(() => {
      const MessagesElem = MessagesContainer.current;
      if (MessagesElem) {
        MessagesElem.scrollTop = MessagesElem.scrollHeight;
      }
    }, [Messages]);
    return (
      <div
        ref={MessagesContainer}
        className="All-ChatMessages"
      >
        {Messages.map((Message) => {
          return (
            <ChatMessage
              message={Message.message}
              sender={Message.sender}
              key={Message.id}
            />
          );
        })}
      </div>
    );
  }