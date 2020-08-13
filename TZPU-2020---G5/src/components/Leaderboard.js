import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Leaderboard(props) {
  // const limit = 7;
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(0);
  useEffect(() => {
    fetchDataFromDB();
  }, []);

  let fetchDataFromDB = async () => {
    const res = await fetch(`http://localhost:3001/users`);
    const data = await res.json();
    setUsers(
      data.sort((user1, user2) =>
        user1.averageGrade * user1.completedTests <
        user2.averageGrade * user2.completedTests
          ? 1
          : -1
      )
    );
    setLoading(false);
  };
  const paginatedUsers = users.slice(
    (page - 1) * props.limit,
    page * props.limit
  );
  const position = users.findIndex(user => user.id === props.loggedUser.id);
  const obj = { ...users[0] };
  const obj1 = { ...paginatedUsers[position - 1] };
  const currentUser = { ...paginatedUsers[position] };
  const maxPoints = obj.averageGrade * obj.completedTests;
  const pointsToNextLevel =
    obj1.averageGrade * obj1.completedTests -
    currentUser.averageGrade * currentUser.completedTests;
  props.leaderboardCallback(position + 1, maxPoints, pointsToNextLevel);

  // let renderImage = pozicija => {
  //   if (pozicija === 1) {
  //     setImage("./medal.jfif");
  //     console.log(image);
  //   } else if (pozicija === 2) {
  //     setImage("./silvermedal.png");
  //     console.log(image);
  //   } else {
  //     setImage("./bronzemedal.jpg");
  //   }
  //   return image;
  // };

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <table className="table table-bordered table-hover table-sm">
            <caption>Leaderboard</caption>
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Points</th>
                <th scope="col">Trophey</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) =>
                user.id === props.loggedUser.id ? (
                  <tr className="table-warning" key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>
                      {(user.averageGrade * user.completedTests).toFixed(2)}
                    </td>
                    <td className="ml-3">
                      {index === 0 ? (
                        <img
                          src={require("./zlato.png")}
                          style={{ width: 30, height: 30 }}
                          className="rounded mr-2"
                          alt="goldmedal"
                        />
                      ) : index === 1 ? (
                        <img
                          src={require("./srebro.png")}
                          style={{ width: 30, height: 30 }}
                          className="rounded mr-2"
                          alt="goldmedal"
                        />
                      ) : index === 2 ? (
                        <img
                          src={require("./bronza.png")}
                          style={{ width: 30, height: 30 }}
                          className="rounded mr-2"
                          alt="goldmedal"
                        />
                      ) : null}
                    </td>
                  </tr>
                ) : (
                  <tr className="table-light" key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>
                      {(user.averageGrade * user.completedTests).toFixed(2)}
                    </td>
                    <td className="ml-3">
                      {index === 0 && page === 1 ? (
                        <img
                          src={require("./zlato.png")}
                          style={{ width: 30, height: 30 }}
                          className="rounded mr-2"
                          alt="goldmedal"
                        />
                      ) : index === 1 && page === 1 ? (
                        <img
                          src={require("./srebro.png")}
                          style={{ width: 30, height: 30 }}
                          className="rounded mr-2"
                          alt="goldmedal"
                        />
                      ) : index === 2 && page === 1 ? (
                        <img
                          src={require("./bronza.png")}
                          style={{ width: 30, height: 30 }}
                          className="rounded mr-2"
                          alt="goldmedal"
                        />
                      ) : null}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 40
            }}
          >
            <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={<Tooltip id={`tooltip`}>Previous page</Tooltip>}
            >
              <button
                className="btn btn-warning rounded-0"
                onClick={() => setPage(page <= 1 ? page : page - 1)}
              >
                -
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              key={"top"}
              placement={"top"}
              overlay={<Tooltip id={`tooltip`}>Next page</Tooltip>}
            >
              <button
                className="btn btn-warning rounded-0"
                onClick={() =>
                  setPage(
                    Math.ceil(users.length / props.limit) === page
                      ? page
                      : page + 1
                  )
                }
              >
                +
              </button>
            </OverlayTrigger>
          </div>
        </div>
      )}
    </div>
  );
}
