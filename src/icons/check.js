import React from 'react';
import classnames from 'classnames';

import './icons.scss';

function IconCheck(props) {
  const { indeterminate, ...restProps } = props;

  return (
    <i className={classnames('rs-icon-check', { indeterminate: indeterminate })} {...restProps}>
      <span>
        <div className="line1" /> <div className="line2" />
      </span>
    </i>
  );
}

export default IconCheck;
