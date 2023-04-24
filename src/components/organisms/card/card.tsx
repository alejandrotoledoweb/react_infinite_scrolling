import React from "react";
import "./card.scss";
import classNames from "classnames";

interface CardProps {
  name: string;
  url: string;
}

export const Card: React.FC<CardProps> = ({ name, url }) => {
  return (
    <div className={classNames({ pokecard: true })}>
      <p>{name}</p>
      <img src={url} alt={url} className={classNames({ pokecard__image: true })} />
    </div>
  );
};
