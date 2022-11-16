import React, { useContext, useState, useEffect } from "react";
import style from "./Chats.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className={style.chats}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div className={style.chat} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="avatar"></img>
            <div className={style.info}>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.msg}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
