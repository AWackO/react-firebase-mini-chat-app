import style from "./SignUp.module.css";
import addFile from "../../img/add-file.svg";
import React, { useState } from "react";
import { db, auth, storage } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + date}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercentage(percent);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName: username,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: username,
                email,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
            }
          });
        }
      );
    } catch (err) {
      alert("User or email already exists");
      setErr(true);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <span>Mini Chat</span>
        <span>Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="enter your name" />
          <input type="email" placeholder="enter your email" />
          <input type="password" placeholder="enter your password" />
          <input type="file" id="file" accept="/image/*" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={addFile} alt="add file" />
            <span>Add profile picture</span>
          </label>
          {percentage > 0 && <span>{percentage}% uploaded</span>}
          <button>Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/signin">Sign In here.</Link>
        </p>
        {err && <span>Something went wrong: {err}</span>}
      </div>
    </div>
  );
};
export default SignUp;
