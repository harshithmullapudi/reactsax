import React, { useState, useRef, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import classnames from 'classnames'
import './group.scss';

function Group(props) {
  const {headerSlot, children, open} = props;

  const [ group, setGroup ] = useState(true);
  const [ openState, setOpenState ] = useState(false);
  const contentRef= useRef(null);
  const currentRef= useRef(null);

  if (currentRef.current.querySelector('.active') || open) {
    setOpenState(true);
  }

  useEffect(() => {
    const h = contentRef.current.scrollHeight
      const parent = currentRef.current.parentElement;
      console.log('[are', parent);
      if (parent.group) {
        if (open) {
          parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight + h - 1}px`
        } else {
          parent.$refs.content.style.height = `${parent.$refs.content.scrollHeight - h + 1}px`
        }
      }
  }, [open])
  
  const handleClickItem = (id) => {
    // (this.$parent as any).handleClickItem(id)
  }
  const beforeEnter = (el) => {
    el.style.height = 0
  }

  const enter = (el, done) => {
    const h = el.scrollHeight
    el.style.height = h - 1 + 'px'

    done()
  }

  const leave = (el, done) => {
    el.style.minHeight = '0px'
    el.style.height = '0px'
  }

  const getHeader = () => {
    return (
      <div className="rs-sidebar__group__header" onClick={() => {setOpenState(!openState)}}>
        {headerSlot}
      </div>
    )
  }

  const getContent = () => {
    return (
      <div className="rs-sidebar__group__content" ref={contentRef} name="show" value={openState}>
        {children}
      </div>
    )
  }

  const getTransition = () => {
    return (
      <Transition beforeEnter={beforeEnter} enter={enter} leave={leave}>
        {getContent}
      </Transition>
    )
  }

  return (
    <div className={classnames(
      'rs-sidebar__group',
      { open: openState }
    )}>
      {getHeader()}
      {getTransition()}
    </div>
  );
}

export default Group;