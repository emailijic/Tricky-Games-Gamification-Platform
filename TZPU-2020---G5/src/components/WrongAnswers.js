import React, { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/BorderStyle.scss";

export default function WrongAnswers(props) {
  const history = useHistory();
  console.log(props);
  return (
    <div style={{ color: "white", paddingTop: 50 }}>
      {props.myAnswers.map(answer => (
        <div>
          <p>❔ {answer.question}</p>
          <p>📖 {answer.trueAnswer}</p>
          <p>
            💡{answer.myAnswer}{" "}
            {answer.myAnswer === answer.trueAnswer ? (
              <Badge pill variant="success">
                ✓
              </Badge>
            ) : (
              <Badge pill variant="danger">
                ✘
              </Badge>
            )}
          </p>
        </div>
      ))}
      {/* {props.history.location.state.tests.map(test =>
					test.isAchieved ? (
						<h2>
							{test.name}{' '}
							<Badge pill variant='success'>
								✓
							</Badge>
						</h2>
					) : (
						<h2>
							{test.name}{' '}
							<Badge pill variant='danger'>
								✘
							</Badge>
						</h2>
					)
				)} */}
    </div>
  );
}
