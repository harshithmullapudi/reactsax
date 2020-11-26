import React from 'react';

import Tooltip from './index';
import Button from '../button/button';

function Example() {
  return (
    <>
      <Tooltip tooltip="This is a beautiful button">
        <Button styleButton="flat">Hover me</Button>
      </Tooltip>
    </>
  );
}

export default Example;
