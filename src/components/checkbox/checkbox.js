import React from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import IconCheck from '../../icons/check';

import getColor from '../../util/index';

import './checkbox.scss';

function Checkbox(props) {
  const {
    checked,
    value,
    disabled,
    loading,
    labelBefore,
    color,
    icon,
    indeterminate,
    name,
    id,
    lineThrough,
    children,
  } = props;

  const getInput = () => {
    return (
      <input
        className="rs-checkbox"
        type="checkbox"
        checked={checked}
        id={id || name}
        name={name}
      />
    );
  };

  const getCheckbox = () => {
    return (
      <div className="rs-checkbox-mask">
        {!loading && !icon && <IconCheck indeterminate={indeterminate} />} {icon && { icon }}
      </div>
    );
  };

  const getConChecked = () => {
    return (
      <div className="rs-checkbox-con">
        {getInput()}
        {getCheckbox()}
      </div>
    );
  };

  const getLabel = () => {
    return (
      <label
        for={id || name}
        className={classnames('rs-checkbox-label', {
          lineThrough: lineThrough,
        })}
      >
        {children}
      </label>
    );
  };

  return (
    <div
      style={{
        '--rs-color': color ? getColor(color) : '',
      }}
      className={classnames(
        'rs-checkbox-content',
        { 'rs-checkbox--checked': checked },
        { 'rs-checkbox--disabled': disabled },
        { 'rs-checkbox--loading': loading },
        { 'rs-checkbox--label-before': labelBefore },

        // colors
        {
          [`rs-component--${color}`]: color,
        },
      )}
    >
      {getConChecked()}
      {getLabel()}
    </div>
  );
}

Checkbox.propTypes = {
  color: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light']),
  checked: t.bool,
  indeterminate: t.bool,
  value: t.string,
  disabled: t.bool,
  loading: t.bool,
  labelBefore: t.bool,
  icon: t.element,
  name: t.string,
  id: t.string,
  lineThrough: t.bool,
};

export default Checkbox;
