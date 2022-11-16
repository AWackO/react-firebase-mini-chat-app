import React, { useContext } from "react";
import "./App.css";

import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={currentUser ? <Home /> : <SignIn />} />
          <Route path="signIn" index element={<SignIn />} />
          <Route path="signUp" index element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
