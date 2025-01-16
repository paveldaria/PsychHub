import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import "./App.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <div className="app-container">
      {currentPage !== "login" && currentPage !== "register" && <Sidebar setCurrentPage={setCurrentPage} />}
      <div className="main-content">
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "register" && <Register setCurrentPage={setCurrentPage} />}
        {currentPage === "dashboard" && <Dashboard setCurrentPage={setCurrentPage} currentPage={currentPage}/>}
        {currentPage === "profile" && <Profile setCurrentPage={setCurrentPage} currentPage={currentPage} />}
      </div>
    </div>
  );
}
