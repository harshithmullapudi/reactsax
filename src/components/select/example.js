import React, { useState } from 'react';
import Select from './select';

function SelectExample() {
  const [value, setValue] = useState(['Harshith']);
  console.log(value);

  return (
    <Select
      onChange={(e) => {
        setValue(e);
      }}
      placeholder="Name"
      value={value}
      data={[
        { label: 'Harshith', value: 'Harshith' },
        { label: 'Rohith', value: 'Rohith' },
        { label: 'Rupesh', value: 'Rupesh' },
      ]}
      name="select1"
    />
  );
}

export default SelectExample;
