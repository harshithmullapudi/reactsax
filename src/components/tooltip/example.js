import React, { useState } from 'react';

import Tooltip from './index';
// import Button from '../button/index';

function Example (props) {
  return (
    <>
      <Tooltip
        loading={true}
        right={true}
      >
        <button>Click me</button>
      </Tooltip>
    </>
  );
}

export default Example;
