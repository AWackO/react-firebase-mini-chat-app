import React from "react";
import Chats from "../Chats/Chats";
import Navbar from "../Navbar/Navbar";
import UserSearch from "../UserSearch/UserSearch";

import style from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Navbar />
      <UserSearch />
      <Chats />
    </div>
  );
};

export default Sidebar;
