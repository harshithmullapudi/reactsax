import React from 'react';
import classnames from 'classnames';

import './icons.scss';

function IconClose(props) {
  const { hover, ...restProps } = props;

  return <i className={classnames('rs-icon-close', `rs-icon-hover-${hover}`)} {...restProps} />;
}

export default IconClose;
