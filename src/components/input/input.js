import React from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import getColor from '../../util/index';

import './input.scss';

function Input(props) {
  const {
    state,
    color,
    border,
    shadow,
    block,
    square,
    label,
    labelPlaceholder,
    placeholder,
    iconAfter,
    Icon,
    visiblePassword,
    type,
    loading,
    value,
    progress,
    message,
    name,
  } = props;

  const getInput = () => {
    return (
      <input
        id={name}
        className={classnames(
          'rs-input',
          { 'rs-input--has-icon': !!Icon },
          { 'rs-input--has-icon--after': iconAfter },
        )}
        placeholder={placeholder}
        type={visiblePassword ? 'text' : type}
      />
    );
  };

  const getLabel = () => {
    return (
      <label
        htmlFor={name}
        className={classnames(
          'rs-input__label',
          { 'rs-input__label--placeholder': labelPlaceholder },
          { 'rs-input__label--hidden': value || type === 'date' || type === 'time' },
          { 'rs-input__label--label': label },
        )}
      >
        {label || labelPlaceholder}
      </label>
    );
  };

  const getPlaceholder = () => {
    return (
      <label
        htmlFor={name}
        className={classnames('rs-input__label', { 'rs-input__label--hidden': value !== '' })}
      >
        {placeholder}
      </label>
    );
  };

  const getLoading = () => {
    return <div className="rs-input__loading" />;
  };

  const getEffects = () => {
    return (
      <div className="rs-input__affects">
        <div className="rs-input__affects__1" />
        <div className="rs-input__affects__2" />
        <div className="rs-input__affects__3" />
        <div className="rs-input__affects__4" />
      </div>
    );
  };

  const getIcon = () => {
    return (
      <span className={classnames('rs-input__icon', { 'rs-input__icon--after': iconAfter })}>
        <Icon />
      </span>
    );
  };

  const getInputContent = () => {
    return (
      <div
        className={classnames(
          'rs-input-content',
          { [`rs-input-content--has-color`]: color },
          { [`rs-input-content--has-label`]: label || labelPlaceholder },
        )}
      >
        {getInput()}
        {label && labelPlaceholder && getPlaceholder()}
        {getLabel()}
        {Icon && getIcon()}
        {loading && getLoading()}
        {getEffects()}
      </div>
    );
  };

  const getProgressBar = () => {
    return (
      <div
        className={classnames(
          'rs-input__progress',
          { 'rs-input__progress--danger': progress < 33 },
          { 'rs-input__progress--warn': progress < 66 && progress > 33 },
          { 'rs-input__progress--success': progress > 66 },
        )}
      >
        <div
          className="rs-input__progress__bar"
          style={{
            width: progress,
          }}
        />
      </div>
    );
  };

  const getMessage = () => {
    return (
      <div className={classnames('rs-input__message', `rs-input__message--${color}`)}>
        {message}
      </div>
    );
  };

  return (
    <div
      style={{
        '--rs-color': color ? getColor(color) : '',
      }}
      className={classnames(
        'rs-input-parent',
        `rs-input-parent--state-${state}`,
        { 'rs-input-parent--border': !!border },
        { 'rs-input-parent--shadow': !!shadow },
        { [`rs-input-content--has-label`]: label || labelPlaceholder },
        { block: block },
        { square: square },

        // colors
        {
          [`rs-component--${color}`]: color,
        },
        { [`rs-component--is-color`]: color },
      )}
    >
      {getInputContent()}
      {progress > 0 && getProgressBar()}
      {getMessage()}
    </div>
  );
}

// Add generic input listerners
Input.propTypes = {
  placeholder: t.string,
  label: t.string,
  labelPlaceholder: t.string,
  color: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light', 'warn']),
  /* reactsax colors RGB HEX 	Change the background color of the component by changing its status. */
  state: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light', 'warn']),
  /* Add a progress bar starting in red and ending in green. */
  progress: t.number,
  loading: t.bool,
  square: t.bool,
  block: t.bool,
  type: t.string,
  border: t.bool,
  shadow: t.bool,
  iconAfter: t.bool,
  visiblePassword: t.bool,
  Icon: t.elementType,
  message: t.element,
};

Input.defaultProps = {};

export default Input;
