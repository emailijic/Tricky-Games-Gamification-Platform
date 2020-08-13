import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles/WelcomeScreenStyle.css";
import {
  Card,
  ListGroupItem,
  ListGroup,
  ProgressBar,
  Button,
  Image,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

export default function Profile(props) {
  const history = useHistory();
  const [completed, setCompleted] = useState(0);
  useEffect(() => checkCompletionOfProfile(), []);

  let checkCompletionOfProfile = () => {
    if (props.loggedUser.username) setCompleted(completed => completed + 25);
    if (props.loggedUser.school) setCompleted(completed => completed + 25);
    if (props.loggedUser.grade) setCompleted(completed => completed + 25);
    if (props.loggedUser.photo) setCompleted(completed => completed + 25);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Card.Title className="glow">
        <h1>Welcome, {props.loggedUser.username} </h1>
      </Card.Title>
      <Image
        className="my-4"
        style={{ height: 200, width: "auto" }}
        variant="top"
        src="https://www.lagotaquecolma.net/images/autores/default.png"
        roundedCircle
      />
      <ListGroup className="list-group-flush mb-3 w-100">
        <ListGroupItem variant="success">
          Username: {props.loggedUser.username}
        </ListGroupItem>
        <ListGroupItem variant="success">
          {" "}
          School: {props.loggedUser.school}
        </ListGroupItem>
        <ListGroupItem variant="success">
          Grade: {props.loggedUser.grade}
        </ListGroupItem>
      </ListGroup>
      <Card.Body className="w-100 p-0 mb-3">
        <ProgressBar striped variant="success" now={completed} />
        <br />
        <OverlayTrigger
          key={"top"}
          placement={"top"}
          overlay={
            <Tooltip id={`tooltip`}>
              In order to get more points, complete your profile
            </Tooltip>
          }
        >
          <Button
            className="btn btn-warning w-100"
            onClick={() =>
              history.push({
                pathname: "/updateProfile",
                state: { id: props.loggedUser.id }
              })
            }
          >
            Update profile
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </div>
  );
}
