import React, { useContext } from "react";
import style from "./ChatWindow.module.css";
import { ChatContext } from "../../context/ChatContext";
import ChatMessage from "../ChatMessage/ChatMessage";
import SendMessage from "../SendMessage/SendMessage";

const ChatWindow = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={style.chat}>
      <div className={style.header}>
        <span>{data.user?.displayName}</span>
      </div>
      <ChatMessage />
      <SendMessage />
    </div>
  );
};

export default ChatWindow;
