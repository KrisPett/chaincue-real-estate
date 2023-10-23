"use client"

import React, {useState} from 'react';
import Select, {OnChangeValue, OptionsOrGroups} from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MultipleSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState<OnChangeValue<unknown, false>>([]);

  const colourOptions: OptionsOrGroups<any, any> = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleChange = (selectedValues: OnChangeValue<unknown, false>) => {
    setSelectedOptions(selectedValues);
  };

  return (
      <div>
        <Select
            instanceId={1}
            defaultValue={[colourOptions[0], colourOptions[1]]}
            isMulti
            name="colors"
            options={colourOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
      </div>
  );
};

export default MultipleSelect;
