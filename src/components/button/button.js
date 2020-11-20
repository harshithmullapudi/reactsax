import React from 'react';
import classnames from 'classnames';
import t from 'prop-types';

import getColor from '../../util/index';

import './button.scss';

function Button(props) {
  const {
    children,
    componentColor,
    size,
    color,
    active,
    disabled,
    icon,
    circle,
    square,
    loading,
    upload,
    block,
    styleButton,
    ...restProps
  } = props;

  const isPrimary = color === 'primary';
  const isDefault = styleButton === undefined;

  // console.log(getColor(color), color);

  return (
    <button
      style={{
        '--rs-color': color ? getColor(color) : '',
      }}
      className={classnames(
        'rs-button',
        `rs-button--size-${size}`,
        { [`rs-button--${componentColor}`]: componentColor },
        { [`rs-button--fff`]: color === '#fff' },
        { [`rs-button--active`]: !!active },
        { [`rs-button--active-disabled`]: !!disabled },
        { [`rs-button--icon`]: !!icon },
        { [`rs-button--circle`]: !!circle },
        { [`rs-button--square`]: !!square },
        { [`rs-button--loading`]: !!loading },
        { [`rs-button--upload`]: !!upload },
        { [`rs-button--block`]: !!block },

        // colors
        {
          [`rs-button--primary`]: isPrimary,
        },
        {
          [`rs-button--${color}`]: !isPrimary,
        },

        {
          [`rs-button--default`]: isDefault,
        },
        {
          [`rs-button--${styleButton}`]: !isDefault,
        },
      )}
      {...restProps}
    >
      <div className="rs-button__content">{children}</div>
      {loading && <div className="rs-button__loading" />}
    </button>
  );
}

Button.propTypes = {
  color: t.oneOf(['primary', 'secondary', 'success', 'danger', 'warn', 'dark', 'light']),
  styleButton: t.oneOf([
    'flat',
    'border',
    'gradient',
    'transparent',
    'dashed',
    'shadow',
    'relief',
    'floating',
  ]),
  size: t.oneOf(['xl', 'large', 'default', 'small', 'mini']),
  active: t.bool,
  upload: t.bool,
  href: t.string,
  blank: t.bool,
  Icon: t.elementType,
  circle: t.bool,
  square: t.bool,
  block: t.bool,
};

Button.defaultProps = {
  color: 'primary',
};

export default Button;
