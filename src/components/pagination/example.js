import React, { useState } from 'react';

import Pagination from './index';

function Example(props) {
  const [page, setPage] = useState(2);
  return (
    <Pagination
        val={page}
        setValuePage={(val) => { setPage(val) }}
    />
  );
}

export default Example;
