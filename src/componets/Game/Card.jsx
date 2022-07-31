import classNames from "classnames";
import React from "react";
import { ReactComponent as Puzle } from "../../assents/img/logo-card.svg";
const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {

  const hamdleFlipClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
    className={classNames("card", {
      "is-flipped": isFlipped,
      "is-inactive": isInactive
    })}
    onClick={hamdleFlipClick}
    >
      <div className="icon_show">
        <Puzle className="color" />
      </div>
      <div className="icon_hide">
        <img src={card.img} alt="" className="color" />
      </div>
    </div>
  );
};

export default Card;
