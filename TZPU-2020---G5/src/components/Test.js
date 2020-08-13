import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Question from "./Question";

export default function Test(props) {
  const [show, setShow] = useState(true);
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="col-12 col-md-8">
              <img
                className="img-fluid w-100"
                src={require("./kids.jpg")}
                alt="Kids"
              />
            </div>
            <div className="col-12 col-md-4 pt-3">
              <Toast
                show={show}
                delay={10000}
                onClose={() => setShow(false)}
                autohide
              >
                <Toast.Header>
                  {/* <img
											src="holder.js/20x20?text=%20"
											className="rounded mr-2"
											alt=""
											/> */}
                  <strong className="mr-auto">Tip</strong>
                </Toast.Header>
                <Toast.Body>
                  You can choose just one answer or none. There is also white
                  board so it can help you to solve the exercise. Good luck!
                </Toast.Body>
              </Toast>
            </div>
          </div>
        </div>
      </div>
      <div className="container frame" style={{ backgroundColor: "#18530b" }}>
        <div className="pt-4 pl-2">
          {/* <h1>{props.history.location.state.subject}</h1>
					<h1>{props.history.location.state.name}</h1> */}
          <Question
            questions={props.history.location.state.questions}
            test={props.history.location.state.name}
            id={props.history.location.state.id}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
