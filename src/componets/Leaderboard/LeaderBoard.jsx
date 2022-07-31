import React from "react";
import img from "../../assents/img/fon.jpg";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assents/img/logo-leader.svg";
import "./LeaderBoard.scss";

const LeaderBoard = () => {
  const parseScore = JSON.parse(localStorage.getItem("score"))
    ? JSON.parse(localStorage.getItem("score"))
    : [];

  const userName = localStorage.getItem("user");

  // const timerNumber =  parseScore[0].time.replace(/[\s.:,%]/g, '')
  // const nubmer = Number(timerNumber)
  return (
    <div className="leaderboard">
      <div className="leaderboard__container">
        <div className="leaderboard__logo">
          <Logo className="img" />
          <p>Leaderboards</p>
        </div>
        <div className="leaderboard__info">
          <div className="info__header">
            <p>
              <span>#</span> Your results
            </p>
            <Link to="/" className="back">
              Home
            </Link>
          </div>
          <div className="info__footer">
            {parseScore.length > 0 ? (
              <>
                {parseScore
                  .sort((a, b) => a.timeSpan - b.timeSpan)
                  .map((user, index) => {
                    const m = Math.floor(user.timeSpan / 1000 / 60);
                    const wholeMinutsInMs = user.timeSpan - m * 1000 * 60;
                    const s = Math.floor(wholeMinutsInMs / 1000);
                    const ms = user.timeSpan - m * 1000 * 60 - s * 1000;

                    return (
                      <div
                        className={`info__user ${
                          userName === user.name ? "blue_mode" : "white_mode"
                        }`}
                        key={index}
                      >
                        <div className="user__number">
                          <p>{1 + index}</p>
                        </div>
                        <div className="user__name">
                          <div className="user__name-one">
                            <img src={img} alt="" />
                            <p className="name">{user.name}</p>
                          </div>
                          <div className="user__name-two">
                            <p>score: {user.score}</p>
                            <p>
                              time: {m.toString().padStart(2, "0")}:
                              {s.toString().padStart(2, "0")}:
                              {ms.toString().padStart(3, "0")}
                            </p>
                            <p>moves: {user.moves}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              <div className="info__empty">
                <p>No results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
