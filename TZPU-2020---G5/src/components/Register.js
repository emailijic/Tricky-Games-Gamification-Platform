import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/WelcomeScreenStyle.css";

export default function Register() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let validate = async () => {
    if (email === "") {
      alert(`E-mail field is empty`);
      return;
    }
    if (password === "") {
      alert(`Password field is empty`);
      return;
    }
    await fetch(`http://localhost:3001/users/`)
      .then(res => res.json())
      .then(async data => {
        const user = await data.filter(user => user.email === email)[0];
        if (user) {
          alert(`User already exists!`);
          return;
        } else {
          history.push({
            pathname: "/registerUsername",
            state: { email: email, password: password }
          });
        }
      });
  };

  return (
    <div
      className="container-fluid vh-100"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="row justify-content-end pt-2 pr-4">
        <div className="col-0">
          <img
            className="rotate"
            style={{ width: 70, height: 70 }}
            src={require("./puzzleicon.png")}
            alt="puzzle icon"
          />
        </div>
      </div>
      <div className="row justify-content-end pt-1 pr-2">
        <div className="col-0">
          <h6>Tricky games</h6>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <div style={{ width: 400, height: 400 }}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <label>Email adress</label>
            <input
              type="text"
              className="form-control shadow"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control shadow"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-block"
            onClick={() => validate()}
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered? <a href="/">sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
