import React, { useState, useRef } from "react";
import "../styles/ChatBot.css";

const faq = [
  { question: "How do I book an appointment?", answer: "Go to the homepage and click on 'Book Appointment'." },
  { question: "How can I track my appointment?", answer: "Use the 'Track Appointment' tab in the navigation bar." },
  { question: "Can I edit or cancel an appointment?", answer: "Yes, from the 'Track Appointment' page, click on an appointment to view options." },
  { question: "What kind of services are offered?", answer: "We provide expert medical consultations, diagnosis, and personalized treatment plans." },
  { question: "Is my data secure?", answer: "Absolutely. Your information is securely stored and only accessible to authorized personnel." }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const botRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const handleMouseDown = (e) => {
    pos.current.offsetX = e.clientX - botRef.current.getBoundingClientRect().left;
    pos.current.offsetY = e.clientY - botRef.current.getBoundingClientRect().top;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const x = e.clientX - pos.current.offsetX;
    const y = e.clientY - pos.current.offsetY;
    botRef.current.style.left = `${x}px`;
    botRef.current.style.top = `${y}px`;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleQuestionClick = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div
      className={`chatbot-container ${isOpen ? "open" : ""}`}
      ref={botRef}
      onMouseDown={handleMouseDown}
    >
      {!isOpen ? (
        <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
          How can I help you?
        </div>
      ) : (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>AppointTrack Assistant</span>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="chatbot-content">
            {faq.map((item, index) => (
              <button
                key={index}
                className="question-button"
                onClick={() => handleQuestionClick(item.answer)}
              >
                {item.question}
              </button>
            ))}
            {selectedAnswer && <div className="bot-answer">{selectedAnswer}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
