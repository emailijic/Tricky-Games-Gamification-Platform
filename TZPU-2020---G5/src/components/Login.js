import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/WelcomeScreenStyle.css";

export default function Login() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let login = async () => {
    if (email === "") {
      alert(`E-mail field is empty`);
      return;
    }
    if (password === "") {
      alert(`Password field is empty`);
      return;
    }
    await fetch(`http://localhost:3001/users`)
      .then(res => res.json())
      .then(data => {
        data.map(user => {
          if (user.email === email && user.password === password) {
            history.push({
              pathname: "/dashboard",
              state: { email: email, password: password, id: user.id }
            });
          }
        });
      });
    console.log("invalid email or pass");
  };
  return (
    <div>
      <div className="form-group ml-2">
        <label>Email address</label>
        <input
          type="text"
          className="form-control shadow"
          value={email}
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          style={{ width: 400 }}
        />
      </div>
      <div className="form-group ml-2">
        <label>Password</label>
        <input
          type="password"
          value={password}
          className="form-control shadow"
          placeholder="Enter password"
          onChange={e => setPassword(e.target.value)}
          style={{ width: 400 }}
        />
      </div>
      <div className="row pt-4">
        <div className="col-6">
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => login()}
            style={{ width: 180, marginLeft: 10 }}
          >
            Log in
          </button>
        </div>
        <div className="col-6">
          <button
            className="btn btn-secondary"
            style={{ width: 180, color: "black", marginLeft: 20 }}
            onClick={() => history.push("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
