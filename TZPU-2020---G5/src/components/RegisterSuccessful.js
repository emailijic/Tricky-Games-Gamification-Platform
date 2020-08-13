import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterSuccessfulStyle.css";

export default function RegisterSuccessful(props) {
  const history = useHistory();

  let register = () => {
    axios
      .post("http://localhost:3001/users", {
        email: props.history.location.state.email,
        password: props.history.location.state.password,
        username: props.history.location.state.username,
        completedTests: 0,
        averageGrade: 1,
        school: "",
        grade: "",
        achievments: [
          { name: "createdProfile", isAchieved: true },
          { name: "Matematika 5", isAchieved: false },
          { name: "Geografija 5", isAchieved: false },
          { name: "Istorija 5", isAchieved: false },
          { name: "Engleski A1", isAchieved: false },
          { name: "Matematika 6", isAchieved: false },
          { name: "Srpski 7", isAchieved: false },
          { name: "Biologija 7", isAchieved: false },
          { name: "Geografija 8", isAchieved: false }
        ]
      })
      .then(resp => {
        history.push({
          pathname: "/dashboard",
          state: {
            email: props.history.location.state.email,
            password: props.history.location.state.password,
            id: resp.data.id,
            fromRegister: true
          }
        });
      })
      .catch(error => {
        console.log(error);
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
      <div className="row justify-content-center pt-5 mt-5">
        <h1>
          Congratulations! You have successfully made the <br /> first step. Now
          when you are registered to Tricky Games,
          <br /> it's the time to get the first achievement
        </h1>
      </div>
      <div className="row justify-content-center pt-1">
        <button
          style={{ width: 160 }}
          className="btn btn-success"
          onClick={() => register()}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
