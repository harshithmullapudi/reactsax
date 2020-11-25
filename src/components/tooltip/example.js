import React, { useState } from 'react';

import Tooltip from './index';
import Button from '../button/button';

function Example(props) {
  return (
    <>
      <Tooltip tooltip="This is a beautiful button">
        <Button>Hover me</Button>
      </Tooltip>
    </>
  );
}

export default Example;
