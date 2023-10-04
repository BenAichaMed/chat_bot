import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8000/ws/1");

    newSocket.onmessage = (event) => {
      const receivedMessage = event.data;
      if (!messages.includes(receivedMessage)) {
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   `Bot:${receivedMessage}`,
        // ]);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    };

    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.trim() !== "") {
      socket.send(message);
      // setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
      setMessages((prevMessages) => [...prevMessages, message]);

      setMessage("");
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
