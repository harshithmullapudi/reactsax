import React, { useState } from 'react';

import Loading from './loading';
import Button from '../../components/button/index';

function Example(props) {
  const [state, setState] = useState(false);
  const [percent, setPercent] = useState(0);

  const clickedButton = () => {
    setState(true);
    setTimeout(() => {
        setPercent(percent + 10)
    }, 50)
    setTimeout(() => {
        setState(false);
    }, 200000)
  }

  return (
    <>
      <Button onClick={clickedButton}>Open Loading</Button>
      {state && (
        <Loading
            text="Loading..."
            progress="25"
            isVisible
            type="corners"
            percent="30"
            corners
            target
        />
      )}
    </>
  );
}

export default Example;
