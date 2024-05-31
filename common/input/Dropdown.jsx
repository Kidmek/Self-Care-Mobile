import React, { useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import inputStyle from './input.style';

export default function Dropdown({
  options,
  selected,
  setSelected,
  placeholder,
  onChange,
  label,
  error,
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={inputStyle.container}>
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <DropDownPicker
        listMode="SCROLLVIEW"
        style={inputStyle.input(error)}
        containerStyle={inputStyle.dropdownContainer}
        value={selected}
        items={options}
        setOpen={setOpen}
        open={open}
        onSelectItem={setSelected}
        onChangeValue={(value) => {
          if (onChange) {
            // onChange(value);
          }
        }}
        placeholder={placeholder}
        textStyle={inputStyle.label}
        labelStyle={inputStyle.labelStyle}
        placeholderStyle={inputStyle.placeholderStyle}
      />
    </View>
  );
}
