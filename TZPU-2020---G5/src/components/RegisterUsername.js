import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/WelcomeScreenStyle.css";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

export default function RegisterUsername(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // console.log(props.history.location.state.email);
  }, []);

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
      <div className="row justify-content-center">
        <div style={{ width: 400, height: 400, marginTop: 40 }}>
          <div className="form-group">
            <h1>Username</h1>
            <input
              type="text"
              className="form-control shadow mt-3"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-block mt-4"
            onClick={() => {
              if (username === "" || undefined) {
                alert(`Username field can't be empty!`);
              } else {
                history.push({
                  pathname: "/registerSuccessful",
                  state: {
                    email: props.history.location.state.email,
                    password: props.history.location.state.password,
                    username: username
                  }
                });
                // setModalShow(true);
              }
            }}
          >
            Next
          </button>
          {/* <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          /> */}
          {/* {showPopup ? (
            <Popup
              text="Congratulations! You have finished your registration"

              // closePopup={500}
            />
          ) : null} */}
        </div>
      </div>
    </div>
  );
}
