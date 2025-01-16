import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    if (event) event.preventDefault(); 

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8082/user/login", userData)
      .then((response) => {
        if (response.status === 200) {
          const userId = response.data; 
          localStorage.setItem("userId", userId);
          setCurrentPage("dashboard");
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(
            "Registration failed. Please check your details and try again."
          ); 
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          alert("No response from server. Please try again later."); 
        } else {
          alert("An error occurred. Please try again."); 
        }
      });
  }

  return (
    <div className="login-container">
      <Logo />
      <form className="form" onSubmit={handleLogin}>
        <Input
          inputType="text"
          inputText="email"
          state={email}
          setState={setEmail}
        />
        <Input
          inputType="password"
          inputText="password"
          state={password}
          setState={setPassword}
        />
        <button type="submit" className="login-button">
          Log in
        </button>
        <Message setCurrentPage={setCurrentPage} />
      </form>
    </div>
  );
}

function Logo() {
  return <img src="./logo3.png" alt="PsychHub" className="logo" />;
}

function Input({ inputType, inputText, state, setState }) {
  return (
    <input
      type={inputType}
      placeholder={inputText}
      value={state}
      onChange={(e) => setState(e.target.value)}
      className="input"
    ></input>
  );
}

function Message({ setCurrentPage }) {
  return (
    <p style={{ fontSize: "14px" }}>
      Don't have an account?{" "}
      <span
        onClick={() => setCurrentPage("register")}
        style={{
          cursor: "pointer",
          color: "hsl(213, 93%, 17%)",
          fontWeight: "bold",
        }}
      >
        Sign up
      </span>
    </p>
  );
}
