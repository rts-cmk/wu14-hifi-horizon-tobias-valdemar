import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";
import "./chat_bot.scss";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chat-bot">
      <ChatBubble onClick={toggleChat} isOpen={isOpen} />
      {isOpen && <ChatWindow onClose={toggleChat} />}
    </div>
  );
}
