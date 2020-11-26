import React, { useState } from 'react';
import classnames from 'classnames';

import './table.scss';

function Table(props) {
  const {
    value,
    striped,
    
    footer,
    header,
    thead,
    tbody,
    notFound
  } = props;

const [colspan, setColSpan] = useState(undefined);

// mounted() {
//   const tds = (this.$refs as any).thead.querySelectorAll('th')
//   setColSPan(tds.length)
// }

const isMultipleSelected = () => {
  return _.isArray(value)
}

const selected = (val) => {
  if (isMultipleSelected) {
    selectedMultiple(val)
  } else {
    // this.$emit('input', val)
  }
}

const selectedMultiple = (val) => {
  const newVal = value
  if (value.includes(val)) {
    newVal.splice(value.indexOf(val), 1)
  } else {
    newVal.push(val)
  }
  // this.$emit('input', newVal)
}

// templates
const renderFooter = () => {
  return <footer className="rs-table__footer">{ footer }</footer>
}

const renderHeader = () => {
  return <header className="rs-table__header">{ header }</header>
}
const renderThead = () => {
  return <thead className="rs-table__thead">{thead}</thead>
}
const renderNotFound = () => {
  return <tbody className="rs-table_not-found">
    <tr>
      <td colSpan={colspan}>
        { notFound || 'No matching records found' }
      </td>
    </tr>
  </tbody>
}

const renderTbody = () => {
  return <tbody className="rs-table__tbody">{tbody}</tbody>
}

const renderTable = () => {
  return (
    <div className={classnames(
      'rs-table',
      { 'isSelectedValue': value},
      { 'striped': striped},
      { 'isMultipleSelected': isMultipleSelected()}
    )}>
      <table>
        {renderThead}
        {renderTbody}
        {renderNotFound} 
      </table>
    </div>
  )
}

  return (
    <div className="rs-table-content">
      { header && renderHeader() }
      { renderTable() }
      { footer && renderFooter() }  
    </div>
  );
}

export default Table;
