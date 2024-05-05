import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({ items, onValueChange, selectedValue, placeholder }) => {
  return (
    <RNPickerSelect
      items={items}
      onValueChange={onValueChange}
      value={selectedValue}
      placeholder= {placeholder}
    />
  );
};

export default Dropdown;
