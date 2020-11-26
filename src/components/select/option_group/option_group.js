import React from 'react';
import classnames from 'classnames';

import './option_group.scss';

function OptionGroup(props) {
  const { title, children } = props;

  return (
    <div className={classnames('rs-select__option-group')}>
      <h5>{title}</h5>
      {children}
    </div>
  );
}

export default OptionGroup;
