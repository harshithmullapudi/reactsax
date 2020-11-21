import React from 'react';
import classnames from 'classnames';

import t from 'prop-types';

import './card.scss';

function Card (props) {
  const { type, text, title, buttons, interactions, image } = props;

  const getTitle = () => {
    return <div className='rs-card__title'>{title}</div>;
  };

  const getText = () => {
    return (
      <div className='rs-card__text'>
        {title && getTitle()}
        {text}
      </div>
    );
  };

  const getButtons = () => {
    return <div className='rs-card__buttons'>{buttons}</div>;
  };

  const getInteractions = () => {
    return <div className='rs-card__interactions'>{interactions}</div>;
  };

  const getImage = () => {
    return (
      <div className='rs-card__img'>
        {image}
        {interactions && getInteractions()}
      </div>
    );
  };

  const getCard = () => {
    return (
      <div className='rs-card'>
        {image && getImage()}
        {text && getText()}
        {buttons && getButtons()}
      </div>
    );
  };

  return <div className={classnames('rs-card-content', `type-${type}`)}>{getCard()}</div>;
}

Card.propTypes = {
  type: t.string,
  text: t.string,
  title: t.string,
  buttons: t.element,
  interactions: t.element,
  image: t.element,
};

Card.defaultProps = {
  type: 1,
};


export default Card;
