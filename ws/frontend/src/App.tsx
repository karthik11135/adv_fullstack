import { useState, useEffect } from 'react';
import './App.css';

type eachMessge = {
  message: string;
  mine: boolean;
};

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<eachMessge[]>([]);
  const [myMessage, setMyMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    socket.onopen = () => {
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      setMessages((prev) => {
        return [...prev, JSON.parse(message.data)];
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div
      style={{
        margin: '100px',
        border: '2px solid black',
        textAlign: 'center',
      }}
    >
      <div>
        <h1>Messages</h1>
        {messages.map((message, index) => {
          return (
            <div
              style={{ textAlign: message.mine ? 'right' : 'left' }}
              key={index}
            >
              {message.message}
            </div>
          );
        })}
      </div>
      <div>
        <h1>Send data</h1>
        <input
          onChange={(e) => setMyMessage(e.target.value)}
          type="text"
        ></input>
        <button
          onClick={() => {
            socket?.send(myMessage);
          }}
        >
          Send to everyone
        </button>
      </div>
    </div>
  );
}

export default App;
