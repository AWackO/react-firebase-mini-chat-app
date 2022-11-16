import React from "react";
import style from "./SignOut.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const SignOut = () => {
  return (
    <div>
      <button className={style.btn} onClick={() => signOut(auth)}>
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
