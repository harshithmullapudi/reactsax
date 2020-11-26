import React, { useState } from 'react';
import Select from './select';

function SelectExample() {
  const [value, setValue] = useState(['Harshith']);

  return (
    <Select
      onChange={(e) => {
        setValue(e);
      }}
      placeholder="Name"
      value={value}
      color="success"
      state="success"
      data={[
        { label: 'Harshith', value: 'Harshith', group: 'Text' },
        { label: 'Rohith', value: 'Rohith', group: 'Text' },
        { label: 'Rupesh', value: 'Rupesh', group: 'Text2' },
      ]}
      name="select1"
    />
  );
}

export default SelectExample;
