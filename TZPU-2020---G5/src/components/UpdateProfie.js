import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/BorderStyle.scss";

export default function UpdateProfie(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [school, setSchool] = useState("");
  const [razred, setRazred] = useState("");
  console.log(props.location.state.id);

  let update = async () => {
    await fetch(`http://localhost:3001/users/${props.location.state.id}`)
      .then(res => res.json())
      .then(async data => {
        const user = await data;
        const uname = username === "" ? user.username : username;
        const sch = school === "" ? user.school : school;
        const grade = razred === "" ? user.grade : razred;
        await axios.put(
          `http://localhost:3001/users/${props.location.state.id}/`,
          {
            email: user.email,
            password: user.password,
            username: uname,
            completedTests: 0,
            averageGrade: 1,
            school: sch,
            grade: grade,
            achievments: user.achievments
          }
        );
      })
      .then(() =>
        history.push({
          pathname: "/dashboard",
          state: { id: props.location.state.id, xp: 1 }
        })
      );
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img className="img-fluid w-100" src={require("./kids.jpg")} />
          </div>
        </div>
      </div>
      <div
        className="container frame vh-100"
        style={{ backgroundColor: "#18530b" }}
      >
        <div
          className="row justify-content-center"
          style={{ color: "white", paddingTop: 120 }}
        >
          <div className="w-50 h-100">
            <h1 className="text-center">Update Profile</h1>
            <div className="form-group pt-3">
              <label>Update username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                placeholder="Update username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group pt-3">
              <label>Update school</label>
              <input
                type="text"
                className="form-control"
                value={school}
                placeholder="Update school"
                onChange={e => setSchool(e.target.value)}
              />
            </div>
            <div className="form-group pt-3">
              <label>Update grade</label>
              <input
                type="text"
                className="form-control"
                value={razred}
                placeholder="Update grade"
                onChange={e => setRazred(e.target.value)}
              />
            </div>
            <div className="form-group pt-3">
              <Button
                className="btn btn-warning w-100 vh-50"
                onClick={() => update()}
              >
                UPDATE
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
