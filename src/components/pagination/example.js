import React, { useState } from 'react';

import Pagination from './pagination';

function Example(props) {
  const { color, loadingItems } = props;
  const [page, setPage] = useState(2);

  return (
    <Pagination
      value={page}
      color={color}
      length={10}
      loadingItems={loadingItems}
      setValuePage={(val) => {
        if (val) {
          setPage(val);
        }
      }}
    />
  );
}

export default Example;
