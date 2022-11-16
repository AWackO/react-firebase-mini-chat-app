import style from "../SignIn/SignIn.module.css";
import React from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { useState } from "react";

const SignIn = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert("Email or password is incorrect.");
      setErr(true);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <span>Mini Chat</span>
        <span>Sign In</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="enter your email" />
          <input type="password" placeholder="enter your password" />
          <button>Sign in with Email</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up here.</Link>
          </p>
          {err && <span>Something went wrong: {err}</span>}
        </form>
        <GoogleButton onClick={signInWithGoogle}>Sign in with Google</GoogleButton>
      </div>
    </div>
  );
};

export default SignIn;
