import React from 'react';
import classnames from 'classnames';

import t from 'prop-types';

import getColor from '../../util/index';
import { loadAfterMount } from '../../util/dom_utils';

import './switch.scss';

function Switch(props) {
  const {
    color,
    loading,
    indeterminate,
    square,
    icon,
    onText,
    offText,
    circle,
    checked,
    disabled,
  } = props;

  const getCircle = () => {
    return <div className="rs-switch__circle">{circle}</div>;
  };

  const getTextOn = () => {
    return <div className="rs-switch__text on">{onText}</div>;
  };

  const getTextOff = () => {
    return <div className="rs-switch__text off">{offText}</div>;
  };

  const getBackground = () => {
    return <div className="rs-switch__background"></div>;
  };

  const getInput = () => {
    return (
      <input
        className="rs-switch__input"
        type="checkbox"
        disabled={disabled}
        checked={checked}
      ></input>
    );
  };

  return (
    <div
      className={classnames(
        'rs-switch',
        { [`rs-switch--loading`]: loading },
        { [`rs-switch--square`]: square },
        { [`rs-switch--indeterminate`]: indeterminate },
        { [`rs-switch--icon`]: icon },
        // colors
        `rs-component--${color}`,
      )}
      type="checkbox"
      style={{
        '--rs-color': color ? getColor(color) : '',
      }}
    >
      {getInput()}
      {getCircle()}
      {getTextOn()}
      {getTextOff()}
      {getBackground()}
    </div>
  );
}

Switch.propTypes = {
  color: t.string,
  loading: t.bool,
  indeterminate: t.bool,
  square: t.bool,
  icon: t.bool,
  onText: t.element,
  offText: t.element,
  circle: t.bool,
  checked: t.bool,
};

export default loadAfterMount(Switch);
