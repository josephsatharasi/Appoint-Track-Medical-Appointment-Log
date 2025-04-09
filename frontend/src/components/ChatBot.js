import React, { useState, useRef, useEffect } from "react";
import "..styles/ChatBot.css";

const predefinedQA = {
  "What is AppointTrack?": "AppointTrack is a medical appointment tracking app that helps you manage, book, and monitor your appointments easily.",
  "How to book an appointment?": "Login to your dashboard and click on 'Book Appointment' to schedule your visit.",
  "Can I cancel an appointment?": "Yes, go to 'Track Appointments' and click on the appointment you want to cancel.",
  "What if two appointments clash?": "You’ll be redirected to the 'Appointment Conflict Page' to reschedule.",
  "Do I get reminders?": "Yes, AppointTrack provides upcoming appointment summaries and status filters.",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: "70%", left: "80%" });
  const chatRef = useRef();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleDragStart = (e) => {
    setIsDragging(true);
    chatRef.current.startX = e.clientX;
    chatRef.current.startY = e.clientY;
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - chatRef.current.startX;
    const dy = e.clientY - chatRef.current.startY;
    setPosition((prev) => ({
      top: `${parseInt(prev.top) + dy}px`,
      left: `${parseInt(prev.left) + dx}px`,
    }));
    chatRef.current.startX = e.clientX;
    chatRef.current.startY = e.clientY;
  };

  const handleDragEnd = () => setIsDragging(false);

  const handleQuestionClick = (question) => {
    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: predefinedQA[question] || "I'm not sure about that." },
      ]);
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: "bot", text: "Hi! How can I help you today?" }]);
    }
  }, [isOpen]);

  return (
    <div
      className="chatbot-wrapper"
      style={{ top: position.top, left: position.left }}
      ref={chatRef}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      <div className="chatbot-icon" onClick={toggleChat}>
        {isOpen ? "×" : "How can I help you?"}
      </div>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="quick-questions">
            {Object.keys(predefinedQA).map((q, i) => (
              <button key={i} onClick={() => handleQuestionClick(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
