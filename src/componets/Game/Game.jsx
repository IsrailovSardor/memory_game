import React, { useEffect, useRef, useState } from "react";
import "./Game.scss";
import Card from "./Card";
import { Link } from "react-router-dom";

const uniqueCardsArray = [
  {
    type: "Tima",
    img: require(`../../assents/img/2.jpg`),
  },
  {
    type: "Aidar",
    img: require(`../../assents/img/1.jpg`),
  },
  {
    type: "Talga",
    img: require(`../../assents/img/3.jpg`),
  },
  {
    type: "Nurs",
    img: require(`../../assents/img/5.jpg`),
  },
  {
    type: "Oskon",
    img: require(`../../assents/img/6.jpg`),
  },
  {
    type: "Aman",
    img: require(`../../assents/img/7.jpg`),
  },
  {
    type: "Bakai",
    img: require(`../../assents/img/8.jpg`),
  },
  {
    type: "Nurik",
    img: require(`../../assents/img/9.jpg`),
  },
  {
    type: "Erjan",
    img: require(`../../assents/img/10.jpg`),
  },
  {
    type: "Sardor",
    img: require(`../../assents/img/11.jpg`),
  },
];
function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

const Game = () => {
  // CARDS------------------------------------------------------------------------------------------------------------------------
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const mode = localStorage.getItem("mode");
  const actualCards = uniqueCardsArray.slice(0, mode / 2);
  const [cards, setCards] = useState(() =>
    shuffleCards(actualCards.concat(actualCards))
  );

  const userName = localStorage.getItem("user");
  const colors = ["#FDF6F6", "#B3DBC0", "#F9BA32", "#FE0000"];
  const [pauseModal, setPauseModal] = useState(false);
  const timeout = useRef(null);
  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const localDate = () => {
    const currentName = localStorage.getItem("user");
    const scorePlus = moves * itogTime;
    const date = minNule * 60 * 1000 + secNule * 1000 + msNule;
    const itog = {
      name: currentName,
      moves: moves,
      score: scorePlus,
      timeSpan: date,
      mode: mode,
      id: 0,
    };
    let score = JSON.parse(localStorage.getItem("score"));
    score = score ? score : [];
    const names = score.map((user) => user.name);
    !names.includes(currentName) && score.push(itog);
    score = score.map((user) => {
      if (
        user.name === currentName &&
        user.moves >= moves &&
        user.score >= scorePlus
      ) {
        return {
          ...user,
          moves: moves,
          score: scorePlus,
          timeSpan: date,
          mode: mode,
        };
      } else {
        return user;
      }
    });
    localStorage.setItem("score", JSON.stringify(score));
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === actualCards.length) {
      setShowModal(true);
      clearInterval(inter);
      localDate();
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 1000);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
    if (updateMs == 0) {
      timerStart();
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(shuffleCards(actualCards.concat(actualCards)));
    timerReset();
  };

  // TIMER------------------------------------------------------------------------------------------------------------------------
  const [timer, setTimer] = useState({ ms: 0, s: 0, m: 0 });
  const [inter, setInterv] = useState();
  const [status, setStatus] = useState(true);

  const timerStart = () => {
    run();
    setStatus(false);
    setInterv(setInterval(run, 10));
    setPauseModal(false);
  };
  const timerStop = () => {
    clearInterval(inter);
    setStatus(true);
    setPauseModal(true);
  };
  const timerReset = () => {
    clearInterval(inter);
    setStatus(0);
    setTimer({ ms: 0, s: 0, m: 0 });
    setPauseModal(false);
  };

  var updateMs = timer.ms,
    updateS = timer.s,
    updateM = timer.m;

  const run = () => {
    if (updateS === 60) {
      updateM++;
      updateS = 0;
    }
    if (updateMs === 100) {
      updateS++;
      updateMs = 0;
    }
    updateMs++;
    return setTimer({ ms: updateMs, s: updateS, m: updateM });
  };
  const itogTime = timer.m * 2 + timer.s;
  const minNule = timer.m >= 10 ? timer.m : "0" + timer.m;
  const secNule = timer.s >= 10 ? timer.s : "0" + timer.s;
  const msNule = timer.ms >= 10 ? timer.ms : "0" + timer.ms;

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
          <p>Mode: {mode == 12 ? 3 : mode / 4}x{4}</p>
          <p className="game__info-moves">Moves: {moves}</p>
          <div className="game__info-timer">
            {timer.m === 0 ? (
              ""
            ) : (
              <p className="s">
                {minNule} <span>m</span>
              </p>
            )}
            <p className="s">
              {secNule} <span>s</span>
            </p>
            <p className="s">
              {msNule} <span>ms</span>
            </p>
            {status ? (
              <button onClick={timerStart} className="start">
                Start
              </button>
            ) : (
              <button onClick={timerStop} className="stop">
                Stop
              </button>
            )}
          </div>
          <button className="game__info-btn" onClick={handleRestart}>
            Restart
          </button>
        </div>
        <div
          className="game__cards"
          style={{
            gridTemplateColumns: `repeat(${mode == 12 ? 4 : mode / 4}, 1fr)`,
          }}
        >
          {pauseModal ? (
            <div className="pauseModal">
              <p className="pauseText">STOP GAME</p>
            </div>
          ) : null}
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      {showModal ? (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__text">
              <p>
                Your Score: &#10240;
                {moves * itogTime}
              </p>
              <p>Names:&#10240;{userName}</p>
              <p>Moves:&#10240;{moves}</p>
              <p>
                Timer: &#10240;
                {timer.m === 0 ? "" : <span className="h">{minNule}:</span>}
                <span className="s">{secNule}:</span>
                <span className="ms">{msNule}</span>
              </p>
              <div className="btns">
                <button className="button" onClick={handleRestart}>
                  Restart
                </button>
                <Link to="/leaderboard" className="button">
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Game;
