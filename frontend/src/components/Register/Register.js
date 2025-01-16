import axios from "axios";
import { useState } from "react";
import "./Register.css";

export default function Register({ setCurrentPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8082/user/register", userData)
      .then((response) => {
        if (response.status === 201) {
          setCurrentPage("login");
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
      <div className="form">
        <Input
          inputType="text"
          inputText="name"
          state={name}
          setState={setName}
        />
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
        <button className="login-button" onClick={handleSignUp}>
          Sing up
        </button>
        <Message setCurrentPage={setCurrentPage} />
      </div>
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
      Already got an account?{" "}
      <span
        onClick={() => setCurrentPage("login")}
        style={{
          cursor: "pointer",
          color: "hsl(213, 93%, 17%)",
          fontWeight: "bold",
        }}
      >
        Log in
      </span>
    </p>
  );
}
