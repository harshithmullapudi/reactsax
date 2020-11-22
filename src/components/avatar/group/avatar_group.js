import React from 'react';
import classnames from 'classnames';

import './avatar_group.scss';

function AvatarGroup(props) {
  const { float, children } = props;

  return (
    <div
      className={classnames('rs-avatar__group', {
        float: float,
      })}
    >
      {children}
    </div>
  );
}

export default AvatarGroup;
