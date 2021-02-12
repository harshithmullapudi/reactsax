import React from 'react';
import t from 'prop-types';

import './styles.scss';

function Row(props) {
  const {
    children,
    w,
    justify,
    align,
    direction
  } = props;

  return (
    <div
      style={{
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction
      }}
      className="rs-row"
    >
     { children }
    </div>
  );
}

Row.propTypes = {
  justify: t.string,
  direction: t.string,
  w: t.number,
  align: t.string,
};

export default Row;
