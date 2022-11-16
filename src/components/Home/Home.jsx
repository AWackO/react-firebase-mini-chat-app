import React, { useState } from "react";
import style from "../Home/Home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import ChatWindow from "../ChatWindow/ChatWindow";
import rightArrow from "../../img/rightArrow.svg";

const Home = () => {
  const [showSidebar, setShowsidebar] = useState(true);

  return (
    <>
      <div className={style.home}>
        <div className={style.container}>
          <button className={style.menu} id="menu"></button>
          <label className={style.arrowLabel} htmlFor="menu">
            <img className={style.arrowImg} src={rightArrow} alt="show menu" onClick={() => setShowsidebar(!showSidebar)} />
          </label>
          {showSidebar && <Sidebar props={setShowsidebar} />}
          <ChatWindow />
        </div>
      </div>
    </>
  );
};

export default Home;
