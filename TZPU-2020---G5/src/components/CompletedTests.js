import React, { useEffect, useState } from "react";
import { Image, Toast } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../styles/BorderStyle.scss";
import "../styles/TextStyle.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import GiftModal from "./GiftModal";

export default function CompletedTests(props) {
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(true);
  const [percentage, setPercentage] = useState(
    (props.history.location.state.completedTests * 100) /
      (props.history.location.state.tests.length - 1)
  );
  const fill = 200 - percentage * 2;
  useEffect(() => {
    if (percentage === 100) setModalShow(true);
  }, []);
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
        style={{ backgroundColor: "#18530b", color: "white" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 pt-2">
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
                <Toast.Body style={{ color: "black" }}>
                  Here you can see all tests you have done. Lock medals are
                  waiting for you!
                </Toast.Body>
              </Toast>
            </div>
            <div className="col-12 col-md-8 pt-3">
              <h1 className="title">Completed tests</h1>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 ml-5" style={{ paddingTop: 150 }}>
              <div style={{ position: "relative" }}>
                <img
                  src={require("./gitboxx.png")}
                  style={{ width: 200, height: 200 }}
                />
                <img
                  src={require("./gitboxx.png")}
                  style={{
                    width: 200,
                    height: 200,
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                    clip: `rect(0px, 200px, ${fill}px, 0px)`,
                    filter: "grayscale(100%)"
                  }}
                />
              </div>
              <h1 className="ml-4">{percentage.toFixed(2)} %</h1>
            </div>
            <div className="pt-4">
              {props.history.location.state.tests.map(test =>
                test.name !== "createdProfile" ? (
                  test.isAchieved ? (
                    <div className="col-12">
                      <h2>
                        {test.name}{" "}
                        <Image
                          style={{
                            height: "4rem",
                            width: "4rem"
                          }}
                          src={require("../assets/2.png")}
                        />
                      </h2>
                    </div>
                  ) : (
                    <div className="col-12">
                      <h2>
                        {test.name}{" "}
                        <Image
                          style={{
                            height: "4rem",
                            width: "4rem",
                            filter: "grayscale(100%)"
                          }}
                          src={require("../assets/2.png")}
                        />
                      </h2>
                    </div>
                  )
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <GiftModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
