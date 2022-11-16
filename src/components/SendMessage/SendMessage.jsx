import React, { useContext, useState } from "react";
import style from "./SendMessage.module.css";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import addFile from "../../img/add-file.svg";

const SendMessage = () => {
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                msg,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          msg,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        msg,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        msg,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setMsg("");
    setImg(null);
  };

  const handleKey = (event) => {
    if (event.code === "Enter") handleSend();
  };

  return (
    <div className={style.message}>
      <input type="text" placeholder="Type something..." onChange={(event) => setMsg(event.target.value)} value={msg} onKeyDown={handleKey} />
      <div className={style.send}>
        <input type="file" id="file" onChange={(event) => setImg(event.target.files[0])} style={{ display: "none" }} />
        <label htmlFor="file">
          <img src={addFile} alt="" />
        </label>
        <button type="submit" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMessage;
