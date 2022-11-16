import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SignOut from "../SignOut/SignOut";
import style from "./Navbar.module.css";

const Navbar = ({ setShowSidebar }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={style.navbar}>
      <span className={style.name}>Mini Chat App</span>
      <div className={style.user}>
        <img src={currentUser.photoURL} alt="profile" />
        <span>{currentUser.displayName}</span>
        <SignOut />
      </div>
    </div>
  );
};

export default Navbar;
