import { BsChatFill } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";
import "./chat_bot.scss";

export default function ChatBubble({ onClick, isOpen }) {
  return (
    <button
      className={`chat-bubble ${isOpen ? "quit" : ""}`}
      onClick={onClick}
      aria-label="Open chat">
      {isOpen ? <HiMiniXMark size={30} /> : <BsChatFill size={30} />}
    </button>
  );
}
