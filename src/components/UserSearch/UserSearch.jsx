import React, { useContext, useState } from "react";
import style from "./UserSearch.module.css";
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const userQuery = query(collection(db, "users"), where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const chatId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", chatId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", chatId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [chatId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
      alert("User does not exist. Please enter the exact username.");
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className={style.search}>
      {err && <span>Something went wrong: {err}</span>}
      <div className={style.form}>
        <input
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          title="Username must be exact"
        />
      </div>
      {user && (
        <div className={style.chat} onClick={handleSelect}>
          <img src={user.photoURL} alt="userPhoto" />
          <div className={style.info}>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
