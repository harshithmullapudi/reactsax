import React, { useState } from 'react';

import Navbar from './base/index';
import Group from './group/index';
import Item from './item/index';
import Button from '../button/button';

function Example(props) {
  const [active, setActive] = useState('home');

const leftSlot= () => {
    return (
        <a href="/">Reactsax</a>
    )
}

const rightSlot = () => {
    return (
        <Button flat>Login</Button>
    )
}

  return (
    <Navbar center-collapsed v-model="active" leftSlot={leftSlot()} rightSlot={rightSlot()}>
      <Item active={active === 'guide'}>
      Guide
      </Item>
      <Item active={active === 'docs'}>
      Documents
      </Item>
      <Item active={active === 'components'} id="components">
      Components
      </Item>
      <Item active={active === 'license'} id="license">
      license
      </Item>
    </Navbar>
  );
}

export default Example;
