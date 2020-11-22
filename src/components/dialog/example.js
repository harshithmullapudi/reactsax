import React, { useState } from 'react';

import Dialog from './index';
import Button from '../button/index';

function Example (props) {
  const [state, setState ] = useState(false);
  return (
    <>
      <Button onClick={() => setState(true)}>Show</Button>
      {state && <Dialog />}
    </>
  );
}

export default Example;