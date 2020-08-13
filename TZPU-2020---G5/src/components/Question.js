import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CanvasDraw from "react-canvas-draw";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  ProgressBar,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import WrongAnswers from "./WrongAnswers";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";

export default function Question(props) {
  const history = useHistory();
  const [answer, setAnswer] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState(props.questions.length);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [brush, setBrush] = useState("#444");
  const [canvas, setCanvas] = useState(null);
  const [reviewAnswers, setReviewAnswers] = useState(false);
  const [myAnswers, setMyAnswers] = useState([]);
  const [modalShow, setModalShow] = useState(true);

  let next = () => {
    setCurrentQuestion(currentQuestion + 1);
    setMyAnswers([
      ...myAnswers,
      {
        myAnswer: answer,
        trueAnswer: props.questions[currentQuestion].correctAnswer,
        question: props.questions[currentQuestion].question
      }
    ]);
    if (answer === props.questions[currentQuestion].correctAnswer)
      setCorrectAnswers(correctAnswers + 1);

    // if (currentQuestion === numOfQuestions) setModalShow(true);
  };

  let finishTest = async () => {
    await fetch(`http://localhost:3001/users/${props.id}`)
      .then(res => res.json())
      .then(async data => {
        const user = await data;
        const ocena = correctAnswers > 0 ? correctAnswers * 2 : 1;
        const newAve =
          (user.averageGrade * user.completedTests + ocena) /
          (user.completedTests + 1);

        const achievments = user.achievments.map(achievment =>
          achievment.name === props.test
            ? { name: achievment.name, isAchieved: true }
            : achievment
        );
        await axios.put(`http://localhost:3001/users/${props.id}/`, {
          email: user.email,
          password: user.password,
          username: user.username,
          completedTests:
            user.completedTests === achievments.length - 1
              ? user.completedTests
              : user.completedTests + 1,
          averageGrade: newAve,
          school: user.school,
          grade: user.grade,
          achievments: achievments
        });
      })
      .then(() =>
        history.push({
          pathname: "/dashboard",
          state: { id: props.id, xp: 3 }
        })
      );
  };

  return (
    <div>
      {currentQuestion < numOfQuestions ? (
        <div>
          <div className="row justify-content-start pl-3">
            <ProgressBar
              striped
              animated
              variant="success"
              now={currentQuestion * 20}
              className="w-75"
            />
          </div>
          <h1 className="pt-4" style={{ color: "white" }}>
            {props.questions[currentQuestion].question}
          </h1>
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6">
                {props.questions[currentQuestion].answers.map(item => (
                  <h2
                    key={item.answer}
                    className="pl-5"
                    style={{ color: "white", marginTop: 50, marginLeft: 10 }}
                  >
                    <input
                      style={{
                        height: "20px",
                        width: "20px",
                        verticalAlign: "middle"
                      }}
                      type="radio"
                      value={item.answer}
                      name="test"
                      onClick={e => setAnswer(e.target.value)}
                    />{" "}
                    {item.answer}
                  </h2>
                ))}
              </div>

              <CanvasDraw
                ref={canvasDraw => setCanvas(canvasDraw)}
                style={{
                  boxShadow:
                    "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                }}
                brushColor={brush}
                brushRadius={5}
                lazyRadius={0}
                canvasHeight={450}
                canvasWidth={500}
              />
            </div>
            <div
              className="row justify-content-end mr-1"
              style={{ paddingRight: 2 }}
            >
              <ButtonToolbar
                className="mb-5"
                aria-label="Toolbar with Button groups"
              >
                <ButtonGroup aria-label="First group" className="mr-5">
                  <Button
                    onClick={() => setBrush("#444")}
                    //style={{ backgroundColor: '#444', color: 'white' }}
                    variant="dark rounded-0"
                  >
                    Black
                  </Button>
                  <Button
                    onClick={() => setBrush("red")}
                    //style={{ backgroundColor: 'red', color: 'white' }}
                    variant="danger rounded-0"
                  >
                    Red
                  </Button>
                  <Button
                    onClick={() => setBrush("green")}
                    //	style={{ backgroundColor: 'green', color: 'white' }}
                    variant="success rounded-0"
                  >
                    Green
                  </Button>
                  <Button
                    variant="primary rounded-0"
                    onClick={() => setBrush("blue")}
                    //	style={{ backgroundColor: 'blue', color: 'white' }}
                  >
                    Blue
                  </Button>
                </ButtonGroup>
                <ButtonGroup
                  aria-label="Second group"
                  style={{ paddingLeft: 89 }}
                >
                  <Button
                    variant="light rounded-0"
                    onClick={() => canvas.undo()}
                  >
                    Undo
                  </Button>
                  <Button
                    variant="light rounded-0"
                    onClick={() => canvas.clear()}
                  >
                    Clear
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
            <div className="row justify-content-end">
              <OverlayTrigger
                key={"top"}
                placement={"top"}
                overlay={<Tooltip id={`tooltip`}>Next question</Tooltip>}
              >
                <Button
                  className="btn btn-warning w-50 vh-75 pt-2 mr-2 mb-4"
                  onClick={() => next()}
                >
                  NEXT
                </Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <MyVerticallyCenteredModal
            correctAnswers={correctAnswers}
            test={props.test}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div class="container mb-5">
            <h3 style={{ color: "white" }}>
              Number of correct answers: {correctAnswers} / {numOfQuestions}
            </h3>

            {correctAnswers > 0 ? (
              <h3 style={{ color: "white" }}>Grade: {correctAnswers * 2}</h3>
            ) : (
              <h3 style={{ color: "white" }}>Grade: 1</h3>
            )}
            <div class="row justify-content-center" style={{ marginLeft: 180 }}>
              <div class="col-12 col-md-6 pt-4">
                <OverlayTrigger
                  key={"top"}
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip`}>Go back to home page</Tooltip>
                  }
                >
                  <Button
                    className="btn btn-warning w-50 vh-75"
                    onClick={() => finishTest()}
                  >
                    FINISH
                  </Button>
                </OverlayTrigger>{" "}
              </div>
              <div class="col-12 col-md-6 pt-4">
                <OverlayTrigger
                  key={"top"}
                  placement={"top"}
                  overlay={<Tooltip id={`tooltip`}>See your answers</Tooltip>}
                >
                  <Button
                    className="btn btn-warning w-50 vh-75"
                    onClick={() => setReviewAnswers(!reviewAnswers)}
                  >
                    REVIEW ANSWERS
                  </Button>
                </OverlayTrigger>
              </div>
            </div>
            {reviewAnswers ? <WrongAnswers myAnswers={myAnswers} /> : null}
          </div>
        </div>
      )}
    </div>
  );
}
