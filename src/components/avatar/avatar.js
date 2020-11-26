import React from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import getColor from '../../util/index';
import { loadAfterMount } from '../../util/dom_utils';

import './avatar.scss';

function Avatar(props) {
  const {
    color,
    history,
    historyGradient,
    circle,
    square,
    icons,
    size,
    loading,
    text,
    writing,
    badgePosition,
    badge,
    renderBadge,
  } = props;

  const getLoading = () => {
    return (
      <div className="rs-avatar__loading">
        <div className="rs-avatar__loading__animate" />
      </div>
    );
  };

  const getText = () => {
    const newText = text.trim();
    let getLetters = [text];
    if (newText.length > 5) {
      getLetters = newText.split(/\s/g).map((item) => {
        return item[0];
      });
    }

    return getLetters;
  };

  const getAvatar = () => {
    return (
      <div
        className={classnames('rs-avatar', {
          [`rs-avatar--letter--${text}`]: text,
        })}
      >
        {text && getText()}
      </div>
    );
  };

  const getWriting = () => {
    return (
      <div className="rs-avatar__points">
        <div className="rs-avatar__points__point" />
        <div className="rs-avatar__points__point" />
        <div className="rs-avatar__points__point" />
      </div>
    );
  };

  const getBadge = () => {
    return (
      <div
        className={classnames(
          'rs-avatar__badge',
          {
            isSlot: typeof badge !== 'boolean',
          },
          { writing: writing },
          badgePosition,
        )}
      >
        {writing ? getWriting() : renderBadge ? renderBadge() : <></>}
      </div>
    );
  };

  const getIcons = () => {
    return <div className="rs-avatar__icons">{icons}</div>;
  };

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        '--rs-color': color ? getColor(color) : '',
      }}
      className={classnames(
        'rs-avatar-content',
        {
          history: history,
          'history--gradient': historyGradient,
          'rs-avatar-content--circle': circle,
          'rs-avatar-content--square': square,
          'rs-avatar-content--hasIcons': icons,
          [`rs-avatar-content--size`]: size,
        },
        // colors
        { [`rs-component--${color}`]: color },
        { [`rs-component--is-color`]: color },
      )}
    >
      {loading && getLoading()}
      {getAvatar()}
      {badge && getBadge()}
      {icons && getIcons()}
    </div>
  );
}

Avatar.propTypes = {
  color: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light']),
  size: t.string,
  badge: t.bool,
  upload: t.bool,
  renderBadge: t.func,
  circle: t.bool,
  square: t.bool,
  writing: t.bool,
  history: t.bool,
  historyGradient: t.bool,
  loading: t.bool,
  text: t.string,
  icons: t.element,
};

export default loadAfterMount(Avatar);
