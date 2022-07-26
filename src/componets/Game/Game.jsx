import React, { useState } from "react";
import { ReactComponent as Puzle } from "../../assents/img/logo-card.svg";
import "./Game.scss";
import img from "../../assents/img/Bulbasaur.png";
const Game = () => {
  const colors = ["#FDF6F6", "#B3DBC0", "#F9BA32", "#FE0000"];
  // userNmae
  const userName = localStorage.getItem("user");

  const cards = [
    {
      name: "Bulbasaur",
      img: require("../../assents/img/Bulbasaur.png"),
      id: 0,
    },
    {
      name: "ButterFree",
      img: require("../../assents/img/ButterFree.png"),
      id: 1,
    },
    {
      name: "Charmander",
      img: require("../../assents/img/Charmander.png"),
      id: 2,
    },

    {
      name: "Pickachu",
      img: require("../../assents/img/Pickachu.png"),
      id: 3,
    },
    {
      name: "Pidgetto",
      img: require("../../assents/img/Pidgetto.png"),
      id: 4,
    },
    {
      name: "Squirtle",
      img: require("../../assents/img/Squirtle.png"),
      id: 5,
    },
  ];

  const shuffleCards = shuffle(cards).concat(shuffle(cards));
  function shuffle(array) {
    let r = [...array];
    return r.sort(() => Math.random() - 0.5);
  }
  return (
    <div className="game">
      <div className="colors">
        {colors.map((color, index) => (
          <div
            className={color}
            key={color + index}
            style={{
              height: "100%",
              width: "20px",
              background: `${color}`,
              transform: "translateY(-100%)",
              animation: "showColor 1s 1 forwards",
              animationDelay: `${1 / (index + 2)}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="game__container">
        <div className="game__info">
          <p className="game__info-user">{userName}</p>
          <p className="game__info-moves">Moves: 0</p>
          <p className="game__info-moves">Timer: 00:00</p>
          <button className="game__info-btn">Restart</button>
        </div>
        <div className="game__cards">
          {shuffleCards.map((card, index) => (
            <div
              className="card"
              key={index}
            >
              <div className="icon_show">
                <Puzle className="color" />
              </div>
              <div className="icon_hide">
                <img src={card.img} alt="" className="color" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
