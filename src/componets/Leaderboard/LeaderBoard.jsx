import React, { useState } from "react";
import img from "../../assents/img/fon.jpg";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assents/img/logo-leader.svg";
import "./LeaderBoard.scss";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const data = [
  { id: 0, label: "timeSpan" },
  { id: 1, label: "score" },
  { id: 2, label: "moves" },
];

const mode = [
  { id: 0, label: "5x4" },
  { id: 1, label: "4x4" },
  { id: 2, label: "4x3" },
];

const LeaderBoard = () => {
  const parseScore = JSON.parse(localStorage.getItem("score"))
    ? JSON.parse(localStorage.getItem("score"))
    : [];

  const userName = localStorage.getItem("user");

  const [activSort, setActivSort] = useState(2);

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => setOpen(!isOpen);
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    setOpen(!isOpen);
    setActivSort(id);
  };

  const [isOpens, setOpens] = useState(false);
  const [itemss, setItems] = useState(mode);
  const [selectedItems, setSelectedItems] = useState(null);
  const toggleDropdowns = () => setOpens(!isOpens);
  const handleItemClicks = (id) => {
    selectedItems == id ? setSelectedItems(null) : setSelectedItems(id);
    setOpens(!isOpens);
  };

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
          <div className="dropdown_block">
            <div className="dropdown">
              <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedItem
                  ? items.find((item) => item.id == selectedItem).label
                  : "Сортировка по"}
                <ArrowDropUpIcon className={`icon ${isOpen && "open"}`} />
              </div>
              <div className={`dropdown-body ${isOpen && "open"}`}>
                {items.map((item) => (
                  <div
                    className="dropdown-item"
                    onClick={(e) => handleItemClick(e.target.id)}
                    id={item.id}
                  >
                    <span
                      className={`dropdown-item-dot ${
                        item.id == selectedItem && "selected"
                      }`}
                    ></span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="dropdown">
              <div className="dropdown-header" onClick={toggleDropdowns}>
                {selectedItems
                  ? itemss.find((item) => item.id == selectedItems).label
                  : "Выберите режим"}
                <ArrowDropUpIcon className={`icon ${isOpens && "open"}`} />
              </div>
              <div className={`dropdown-body ${isOpens && "open"}`}>
                {itemss.map((item) => (
                  <div
                    className="dropdown-item"
                    onClick={(e) => handleItemClicks(e.target.id)}
                    id={item.id}
                  >
                    <span
                      className={`dropdown-item-dot ${
                        item.id == selectedItems && "selected"
                      }`}
                    ></span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
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
                            {activSort === 2 ? (
                              <>
                                <p>score: {user.score}</p>
                                <p>
                                  time: {m.toString().padStart(2, "0")}:
                                  {s.toString().padStart(2, "0")}:
                                  {ms.toString().padStart(3, "0")}
                                </p>
                                <p>moves: {user.moves}</p>
                              </>
                            ) : (
                              <>
                                {activSort == 1 ? (
                                  <p>score: {user.score}</p>
                                ) : null}
                                {activSort == 0 ? (
                                  <p>
                                    time: {m.toString().padStart(2, "0")}:
                                    {s.toString().padStart(2, "0")}:
                                    {ms.toString().padStart(3, "0")}
                                  </p>
                                ) : null}
                                {activSort == 2 ? (
                                  <p>moves: {user.moves}</p>
                                ) : null}
                              </>
                            )}
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
