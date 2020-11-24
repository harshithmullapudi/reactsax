import React, { useRef } from 'react';
import classnames from 'classnames';

import './icons.scss';

function IconArrow(props) {
  const { less, ...restProps } = props;
  const iconRef = useRef(null);

  return (
    <i red={iconRef} className={classnames('rs-icon-arrow', { less: less })} {...restProps} />
  );
}

export default IconArrow;
