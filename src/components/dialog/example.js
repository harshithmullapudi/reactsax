import React, { useState } from 'react';

import Dialog from './index';
import Button from '../button/button';

function Example(props) {
  const [state, setState] = useState(false);
  return (
    <>
      <Button onClick={() => setState(true)}>Show</Button>
      {state && (
        <Dialog
          blur
          visible
          header={
            <h4 className="not-margin">
              Welcome to <b>Vuesax</b>
            </h4>
          }
          content={
            <p>
              It generates a Dialog with the rs-dialog component, this component is very
              customizable since it provides a slot to put and make any type of interface to the
              user's need
            </p>
          }
        />
      )}
    </>
  );
}

export default Example;
