import { useState, useRef, useEffect } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { BsEmojiSmileUpsideDownFill } from "react-icons/bs";
import ai_assistant_img from "../../Assets/ai_assistant.avif";
import "./chat_bot.scss";

// Silly AI responses for fun! :3
const sillyResponses = {
  greetings: [
    "Beep boop! 🤖 I'm totally a real person, not a robot at all!",
    "Hello human! I mean... fellow human! 👋",
    "Greetings! I passed the Turing test... I think? 🤔",
  ],
  help: [
    "I'm here to help! By 'help' I mean confuse you with my existential crisis. 🎭",
    "Need assistance? I specialize in dad jokes and pretending to know things! 😎",
    "Help is my middle name! Actually, it's 'Bot'. My full name is Chat Bot Help. Wait...",
  ],
  products: [
    "Our products are amazing! I'd buy them myself if I had money... or hands... or a body. 💰",
    "Everything is on sale! Except the things that aren't. And I'm not sure which is which. 🏷️",
    "We have the best products in the universe*! (*Universe limited to this website) 🌟",
  ],
  shipping: [
    "We ship faster than you can say 'supercalifragilisticexpialidocious'! ⚡ (Please don't actually try)",
    "Shipping? More like SHIP-PING! Get it? Because... okay I'll stop. 📦",
    "We use carrier pigeons. Very advanced, internet-connected pigeons. 🕊️",
  ],
  default: [
    "I'm not sure, but I'm going to nod confidently anyway. 🙂",
    "Interesting question! Have you considered that the answer might be 42? 🤓",
    "Error 404: Clever response not found. But here's a potato emoji: 🥔",
    "That's a great question! I'll forward it to my manager... who is also me. 🔄",
    "Let me consult my vast database... *googles frantically* ...still loading... 💭",
    "My programmer taught me many things, but answering that wasn't one of them! 😅",
    "Fun fact: I'm powered by pure chaos and a single AAA battery! 🔋",
  ],
};

function getBotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  if (message.match(/hello|hi|hey|greetings/)) {
    return sillyResponses.greetings[
      Math.floor(Math.random() * sillyResponses.greetings.length)
    ];
  }
  if (message.match(/help|assist|support/)) {
    return sillyResponses.help[
      Math.floor(Math.random() * sillyResponses.help.length)
    ];
  }
  if (message.match(/product|buy|purchase|item/)) {
    return sillyResponses.products[
      Math.floor(Math.random() * sillyResponses.products.length)
    ];
  }
  if (message.match(/ship|deliver|delivery|shipping/)) {
    return sillyResponses.shipping[
      Math.floor(Math.random() * sillyResponses.shipping.length)
    ];
  }

  return sillyResponses.default[
    Math.floor(Math.random() * sillyResponses.default.length)
  ];
}

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your definitely-not-broken AI assistant! 🤖 Ask me anything and I'll give you answers of questionable quality!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef(null);

  const emojis = [
    "😀",
    "😂",
    "😍",
    "🥰",
    "😎",
    "🤔",
    "👍",
    "❤️",
    "🎉",
    "🔥",
    "💯",
    "🤖",
    "🛒",
    "📦",
    "✨",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");

    // Simulate bot "thinking" and respond
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 500 + Math.random() * 1000);
  };

  const handleEmojiClick = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojis(false);
  };

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        <div className="chat-window__header-info">
          <div className="chat-window__bot-avatar">
            <img src={ai_assistant_img} alt="Bot Avatar" />
          </div>
          <div>
            <h3 className="chat-window__bot-name">Chatty McBotface</h3>
            <span className="chat-window__bot-status">Probably online</span>
          </div>
        </div>
      </div>

      <div className="chat-window__messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-window__message chat-window__message--${message.sender}`}>
            <div className="chat-window__message-bubble">
              <img
                src={message.sender === "bot" ? ai_assistant_img : ""}
                alt=""
                className="chat-window__message-avatar"
              />
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-window__form" onSubmit={handleSend}>
        <div className="chat-window__input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="chat-window__input"
          />
          <button
            type="button"
            className="chat-window__button chat-window__button--attachment">
            <RiAttachment2 />
          </button>
          <button
            type="button"
            className="chat-window__button chat-window__button--emoji"
            onClick={() => setShowEmojis(!showEmojis)}>
            <BsEmojiSmileUpsideDownFill />
          </button>
        </div>
        {showEmojis && (
          <div className="chat-window__emoji-picker">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                className="chat-window__emoji"
                onClick={() => handleEmojiClick(emoji)}>
                {emoji}
              </button>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="chat-window__button chat-window__button--send">
          <p>Send</p>
        </button>
      </form>
    </div>
  );
}
