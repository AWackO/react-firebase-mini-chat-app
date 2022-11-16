import React from "react";
import style from "./Message.module.css";
import { useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView(true, { behavior: "smooth" });
  }, [message]);

  return (
    <div ref={ref} className={`${style.message} ${message.senderId === currentUser.uid ? "" : style.owner}`}>
      <div className={style.info}>
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className={style.content}>
        <p>{message.msg}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
