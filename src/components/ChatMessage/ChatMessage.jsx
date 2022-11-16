import style from "./ChatMessage.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import Message from "../Message/Message";

const ChatMessage = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <div className={style.messages}>
      {messages.map((msg) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default ChatMessage;
