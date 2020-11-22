import React, { useRef } from 'react';

function Tr (props) {
  const { colSpan } = props;

  const contentRef = useRef(null);

  const getSubContent = () => {
    return <div className='rs-table__expand__td__content__sub'></div>;
  };

  const getContent = () => {
    return (
      <div className='rs-table__expand__td__content' ref={contentRef}>
        {getSubContent()}
      </div>
    );
  };

  const getTd = () => {
    return (
      <td className='rs-table__expand__td' colSpan={colSpan}>
        {getContent()}
      </td>
    );
  };

  const getExpand = () => {
    return <tr className='rs-table__tr__expand'>{getTd()}</tr>;
  };

  return <div>{getExpand}</div>;
}

export default Tr;
