


import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import classnames from 'classnames';

import './navbar_item.scss';

function Group(props) {

  const currentRef = useRef(null);
  const { active, to, id, href, target, children } = props;
  const history = useHistory();

//   @Watch('active')
//   handleWatchActive() {
//     this.handleLine()
//   }

  const handleLine = () => {
    if (active) {
        const parent = currentRef.current.parentElement;
        const left = (currentRef).offsetLeft
        parent.setLeftLine(left)
        const width = (currentRef).scrollWidth
        parent.setWidthLine(width)
    }
  }

  const handleClick = () => {
    if (to) {
      history.push(to)
    } else if (href) {
      window.open(href, target)
    }
  }

  const handleActive = () => {
    const parent = currentRef.current.parentElement;
    console.log(parent)
    parent.setModel(id)
    handleLine()
  }

  return (
    <button 
        ref={currentRef}
        className={classnames(
            'rs-navbar__item',
            { 'active': active },
        )}
        onClick={() => {
            // this.$emit('click', evt)
            handleLine()
            handleClick()
            handleActive()
        }}
    >
        {children}
    </button>
  );
}

export default Group;
