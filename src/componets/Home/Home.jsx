import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import rules from "../../assents/img/rules.png";
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [activeRadio, setActiveRadio] = useState("");
  const [value, setValue] = useState(1);
  const [modal, setModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length >= 3) {
      setValue(e.target.value);
      console.log(setValue);
      localStorage.setItem("user", inputValue);
      navigate("/game");
      setActiveRadio();
    } else {
      setError(true);
    }
  };



  return (
    <div className="home">
      {modal ? (
        <div className="modal">
          <div className="modal__content">
            <div className="one_block">
              <div className="descr">
                <div className="img">
                  <img src={rules} alt="" />
                </div>
                <div className="text">
                  <p className="step">1 step</p>
                  <ul className="ul">
                    <li>Введите имя</li>
                    <li>Выберите режим</li>
                    <li>Нажмите играть</li>
                  </ul>
                </div>
              </div>
              <div className="rows">
                <div className="one"></div>
                <div className="two"></div>
                <div className="two"></div>
              </div>
            </div>
            <div className="one_block">
              <div className="descr">
                <div className="img">
                  <img src={rules} alt="" />
                </div>
                <div className="text">
                  <p className="step">2 step</p>
                  <ul className="ul">
                    <li>Найдите похожие карточки за короткое время</li>
                    <li>Лучший результат сохраниться</li>
                    <li>Результат считается: шаги * (минуты * 2 + секунды)</li>
                  </ul>
                </div>
              </div>
              <div className="rows">
                <div className="one"></div>
                <div className="one"></div>
                <div className="two"></div>
              </div>
            </div>
            <div className="one_block">
              <div className="descr">
                <div className="img">
                  <img src={rules} alt="" />
                </div>
                <div className="text">
                  <p className="step">3 step</p>
                  <ul className="ul">
                    <li>Данные о вашей игре будут сохранены в Leaderboard</li>
                    <li>
                      Вы можете фильтром выбрать режимы или фильтрации по шагам,
                      времени, скору
                    </li>
                    <li>Удачной игры</li>
                  </ul>
                </div>
              </div>
              <div className="rows">
                <div className="one"></div>
                <div className="one"></div>
                <div className="one"></div>
                <button className="ok" onClick={() => setModal(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="rules">
        <img src={rules} alt="" onClick={() => setModal(true)}/>
        <p>Click to me!!!</p>
      </div>
      <form className="home__container" onSubmit={handleSubmit}>
        <p className="home__title">Welcome to Memory game</p>
        <input
          className="home__input"
          type="text"
          placeholder="enter your name"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError(false);
          }}
        />
        {error ? <p className="error">Ведите больше 2 букв</p> : null}
        <div className="rabioMode">
          <div className="oneMode">
            <input
              type="radio"
              name="mode"
              id="oneMode"
              className="checkbox"
              value="oneMode"
              onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label htmlFor="oneMode">3x4</label>
          </div>
          <div className="oneMode">
            <input
              type="radio"
              name="mode"
              id="twoMode"
              className="checkbox"
              value="twoMode"
              onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label htmlFor="twoMode">4x5</label>
          </div>
          <div className="oneMode">
            <input
              type="radio"
              name="mode"
              id="threeMode"
              className="checkbox"
              value="threeMode"
              onChange={(e) => setActiveRadio(e.target.value)}
            />
            <label htmlFor="threeMode">5x6</label>
          </div>
        </div>
        <button
          type="submit"
          className={inputValue.length >= 3 ? "home__btn-show" : "home__btn"}
        >
          Play
        </button>
      </form>
    </div>
  );
};

export default Home;
