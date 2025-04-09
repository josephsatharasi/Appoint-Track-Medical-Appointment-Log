import React, { useState, useEffect, useRef } from "react";
import "../styles/ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const predefinedAnswers = {
    "How can I book an appointment?":
      "To book an appointment, go to the 'Book Appointment' page and fill out the required information.",
    "How do I track my appointments?":
      "Use the 'Track Appointment' page to see all your upcoming and past appointments.",
    "Can I cancel an appointment?":
      "Yes, you can cancel your appointment from the 'Track Appointment' page.",
    "What services do you offer?":
      "We offer expert medical diagnosis, personalized treatment plans, and online booking.",
    "How do I reset my password?":
      "Click on 'Forgot Password' on the login page to receive reset instructions.",
  };

  const toggleChat = () => {
    setIsOpen((prev) => {
      if (prev) setMessages([]); // Reset chat on close
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
    if (e.button !== 0) return;
    const pos = wrapperRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({ x: e.pageX - pos.left, y: e.pageY - pos.top });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
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

  return (
    <div
      ref={wrapperRef}
      className={`chatbot-wrapper ${dragging ? "dragging" : ""}`}
      onMouseDown={handleMouseDown}
      style={{ left: position.x, top: position.y }}
    >
      <div className="chatbot-icon" onClick={toggleChat}>
        How can I help you?
      </div>

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
