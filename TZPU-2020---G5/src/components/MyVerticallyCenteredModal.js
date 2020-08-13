import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ backgroundColor: "#FFFDD0" }} closeButton>
        <Modal.Title
          style={{
            fontSize: 50,
            fontColor: "white",
            borderColor: "#18530b"
          }}
          id="contained-modal-title-vcenter"
        >
          {props.correctAnswers > 2 ? (
            <div className="container">
              <div className="row justify-content-center">
                <img
                  src={require("./mari.png")}
                  style={{ height: 400 }}
                  className="d-block w-100"
                />
              </div>
              <div className="row pt-5">
                <h3>You've just gained one coin!</h3>
                <img
                  src={require("./coin.png")}
                  style={{ msLineBreak: 50, height: 200, width: 200 }}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <Modal.Body>
              <div className="row justify-content-center">
                <img
                  src={require("./moja.png")}
                  style={{ height: 400 }}
                  className="d-block w-100"
                  alt=""
                />
              </div>{" "}
            </Modal.Body>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer style={{ backgroundColor: "#FFFDD0" }}>
        <Button
          type="button"
          className="btn btn-success w-25 mt-4"
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
