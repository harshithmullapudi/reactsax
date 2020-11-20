import React from 'react';
import classnames from 'classnames';

import t from 'prop-types';

import getColor from '../../util/index';

import './radio.scss';

function Radio (props) {
  const { color, disabled, loading, value, labelBefore, name, children, Icon, isChecked } = props;

  const getLabel = () => {
    return (
      <label className='rs-radio__label' for={name}>
        {children}
      </label>
    );
  };

  const radioInput = () => {
    return <input type='radio' id={name} name={name} checked={isChecked} value={value}></input>;
  };

  const radioEffect = () => {
    return (
      <span className='rs-radio__effect'>
        <span className='rs-radio__effect__icon'>
          {Icon && <Icon />}
        </span>
        <span className='rs-radio__effect__loading'></span>
      </span>
    );
  };

  const getRadio = () => {
    return (
      <div className='rs-radio'>
         {radioInput()}
        {radioEffect()}
      </div>
    );
  };

  return (
    <div
      style={{
        '--rs-color': color ? getColor(color) : '',
      }}
      className={classnames(
        'rs-radio-content',
        { disabled: disabled },
        { loading: loading },
        { active: isChecked },

        // colors
        `rs-component--${color}`,
      )}
    >
      {labelBefore && getLabel()}
      {getRadio()}
      {!labelBefore && getLabel()}
    </div>
  );
}

Radio.propTypes = {
  color: t.oneOf(['primary', 'success', 'danger', 'warn', 'dark', 'warn']),
  disabled: t.bool,
  loading: t.bool,
  value: t.string,
  labelBefore: t.bool,
  Icon: t.elementType,
  isChecked: t.bool,
};

Radio.defaultProps = {
  color: 'primary',
};

export default Radio;
