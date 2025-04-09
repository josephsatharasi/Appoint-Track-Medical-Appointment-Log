import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 140 });
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const wrapperRef = useRef(null);

  const predefinedAnswers = {
    "How can I book an appointment?": "Go to the 'Book Appointment' page and fill out the form.",
    "How do I track my appointments?": "Check the 'Track Appointment' page for your details.",
    "Can I cancel an appointment?": "Yes, from the 'Track Appointment' page.",
    "What services do you offer?": "Expert diagnosis, treatment plans, and more.",
    "How do I reset my password?": "Click 'Forgot Password' on the login screen.",
  };

  const toggleChat = () => {
    setIsOpen((prev) => {
      if (prev) setMessages([]); // clear chat on close
      return !prev;
    });
  };

  const handleQuickQuestionClick = (question) => {
    setMessages((prev) => [...prev, { from: "user", text: question }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: predefinedAnswers[question] }]);
    }, 500);
  };

  const handleMouseDown = (e) => {
    if (e.target.classList.contains("chatbot-icon")) {
      setDragging(true);
      const rect = wrapperRef.current.getBoundingClientRect();
      setRel({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - rel.x,
      y: e.clientY - rel.y,
    });
    e.preventDefault();
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="chatbot-loader">
        <div className="loader-circle"></div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`chatbot-wrapper ${dragging ? "dragging" : ""}`}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div className="chatbot-icon" onClick={toggleChat}>How can I help you?</div>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="quick-questions">
            {Object.keys(predefinedAnswers).map((question, index) => (
              <button key={index} onClick={() => handleQuickQuestionClick(question)}>
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
