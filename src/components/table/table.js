import React, { useRef } from 'react';
import classnames from 'classnames';

import './table.scss';

function Table (props) {
  const { 
    header, 
    footer,
    value,
    striped,
    isMultipleSelected,
    colspan,
   } = props;

  const theadRef = useRef(null);
  const tbodyRef = useRef(null);

  const getHeader = () => {
    return <header className='rs-table__header'>{header}</header>;
  };

  const getFooter = () => {
    return <footer className='rs-table__footer'>{footer}</footer>;
  };

  const getThead = () => {
    return <thead className='rs-table__thead' ref={theadRef}></thead>;
  };

  const getTbody = () => {
    return <tbody className='rs-table__tbody' ref={tbodyRef}></tbody>;
  };

  const notFound = () => {
    return <tbody className="rs-table_not-found">
      <tr>
        <td colspan={colspan}>
          { notFound || 'No matching records found' }
        </td>
      </tr>
    </tbody>
  }

  const getTable = () => {
    return (
      <div
        className={classnames(
          'rs-table',
          { isSelectedValue: value },
          { striped: striped },
          { isMultipleSelected: isMultipleSelected },
        )}
      >
        <table>
          {getThead()}
          {getTbody()}
          {notFound()}
        </table>
      </div>
    );
  };

  return (
    <div className='rs-table-content'>
      {header && getHeader()}
      {getTable()}
      {footer && getFooter()}
    </div>
  );
}


export default Table;
