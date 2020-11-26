import React, { useState, useRef } from 'react';
import classnames from 'classnames';

import './table_td.scss';

function TableTd(props) {
  const {
    children,
    data,
    expand,
    isSelected,
    notClickSelected,
    openExpandOnlyTd
  } = props;

  const [ expandVar, setExpandVar] = useState(false)
  const [ instanceExpand, setInstanceExpand] = useState(null)
  
  const currentRef = useRef(null);

  const insertAfter = (element) => {
    if (currentRef.current.nextSibling) {
      currentRef.current.parentNode.insertBefore(element, this.$el.nextSibling)
    } else {
      currentRef.current.parentNode.appendChild(element)
    }
  }

  // const handleChangeData = () => {
  //   currentRef.current.style.removeProperty(`--vs-color`)
  //   if (instanceExpand) {
  //     this.instanceExpand.$data.hidden = true
  //     this.instanceExpand = null
  //     this.expand = false
  //   }
  // }

  // handleClickHasExpand() {
  //   if (instanceExpand) {
  //     this.instanceExpand.$data.hidden = !this.instanceExpand.$data.hidden
  //     this.instanceExpand = null
  //     // this.expand = false
  //   } else {
  //     const colspan = this.$parent.$el.querySelectorAll('thead th').length
  //     const trExpand = Vue.extend(expand)
  //     this.instanceExpand = new trExpand()
  //     this.instanceExpand.$props.colspan = colspan
  //     this.instanceExpand.$slots.default = this.$slots.expand
  //     this.instanceExpand.vm = this.instanceExpand.$mount()
  //     this.instanceExpand.$data.hidden = false
  //     this.insertAfter(this.instanceExpand.vm.$el)
  //     // this.expand = true
  //   }
  // }

  return (
    <td 
      onClick={(evt) => {
        if (expand) {
          if (
            (openExpandOnlyTd ? evt.target.nodeName == 'TD' : true) &&
            !evt.target.className.includes('isEdit')) {
            handleClickHasExpand(h)
          }
        }

        if (evt.target.nodeName == 'TD' && !notClickSelected) {
          currentRef.current.selected(this.data)
          // this.$emit('selected', this.data)
        }
        // this.$emit('click', evt)
      }}
      className={classnames(
        'rs-table__tr',
        { 'selected': isSelected },
        { 'isExpand': instanceExpand },
        { 'expand': expand }
      )}
    >
      {children}
    </td>
  );
}

export default TableTd;
