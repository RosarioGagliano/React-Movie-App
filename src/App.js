/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);
    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("login");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Details do not match");
      setError("Email o Password errate");
    }
  };

  const Logout = () => {
    setUser({
      name: "",
      email: "",
    });
    setError("");
  };
  return (
    <div className="App">
      {user.email != "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
          <button>
            <Link to={"/home"} style={{ color: "white" }}>
              Movie
            </Link>
          </button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
