import React from "react";
import "./Sidebar.css";

export default function Sidebar({ setCurrentPage }) {

  function handleLogoClick() {
    setCurrentPage("dashboard");
  }

  return (
    <div className="sidebar">
      <div className="sidebar-menu">

        <img src="./logo6.png" alt="PsychHub" className="logo"  onClick={handleLogoClick}/>

        <button
          className="sidebar-item"
          onClick={() => setCurrentPage("dashboard")}
        >
          Home
        </button>

        <button
          className="sidebar-item"
          onClick={() => setCurrentPage("profile")}
        >
          Profile
        </button>

        <button
          className="sidebar-item logout"
          onClick={() => setCurrentPage("login")}
        >
          Log out
        </button>

      </div>
    </div>
  );
}
