import React from 'react';
import classnames from 'classnames';

import './icons.scss';

function IconPlus(props) {
  const { less, ...restProps } = props;

  return <i className={classnames('rs-icon-plus', { less: less })} {...restProps} />;
}

export default IconPlus;
