import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../styles/WelcomeScreenStyle.css";

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
          <h1 className="glow" style={{ paddingLeft: 60 }}>
            Congratulations!
          </h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#FFFDD0" }}>
        <div className="row justify-content-center">
          <h4 style={{ color: "	#DEB887", paddingLeft: 50 }}>
            Now when you are registered to Tricky Games, it's time to get the
            first achievement
          </h4>
          <img
            className="rotate"
            style={{ width: 200, height: 200 }}
            src={require("./puzla.png")}
            alt="puzzle"
          />
        </div>
      </Modal.Body>
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
