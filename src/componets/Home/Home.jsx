import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", inputValue);
    navigate("/game");
  };

  return (
    <div className="home">
      <form className="home__container" onSubmit={handleSubmit}>
        <p className="home__title">Welcome to Memory game</p>
        <input
          className="home__input"
          type="text"
          placeholder="enter your name"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
         <button type="submit" className={inputValue.length >= 3 ? "home__btn-show" : "home__btn"}>
            Play
          </button>
      </form>
    </div>
  );
};

export default Home;
