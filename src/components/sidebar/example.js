import React, { useState } from 'react';

import Sidebar from './base/index';
import Group from './group/index';
import Item from './item/index';
import Button from '../button/button';
import Avatar from '../avatar/avatar'
import IconArrow from '../../icons/arrow';

import './example.scss'

function Example(props) {
  const [active, setActive] = useState('home');

  const footer= () => {
    return (
      <div justify="space-between">
        <Avatar color="primary" text="Harshith" />
      </div>
    )
  }

  const Icon = () => {
    return <IconArrow />
  }

  return (
    <div className="container">
      <div className="inside">
        <Sidebar
          absolute
          v-model="active"
          open
          footerSlot={footer}
        >
            <Item id="home" icon={Icon()}>
              Home
            </Item>
            <Item id="market" icon={Icon()}>
              Market Overview
            </Item>
            <Item id="Music">
              Music
            </Item>
            <Item id="donate">
              Donate
            </Item>
            <Item id="drink">
              Drink
            </Item>
            <Item id="shopping">
              Shopping
            </Item>
            <Item id="chat">
              Chat
            </Item>
          </Sidebar>
      </div>
    </div>  
  );
}

export default Example;
