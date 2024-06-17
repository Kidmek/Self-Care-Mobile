import React, { useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import inputStyle from './input.style';

export default function Dropdown({
  options,
  selected,
  setSelected,
  placeholder,
  label,
  error,
  multiple,
  zIndex,
  setValue,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={inputStyle.container}>
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <DropDownPicker
        listMode="SCROLLVIEW"
        style={inputStyle.input(error)}
        value={selected}
        items={options}
        setOpen={setOpen}
        setValue={typeof setValue == 'function' ? setValue : undefined}
        open={open}
        onSelectItem={setSelected}
        placeholder={placeholder}
        textStyle={inputStyle.label}
        labelStyle={inputStyle.labelStyle}
        placeholderStyle={inputStyle.placeholderStyle}
        multiple={multiple}
        zIndex={zIndex && zIndex.normal}
        zIndexInverse={zIndex && zIndex.inverse}
        max={2}
        mode="BADGE"
        disabled={disabled}
        showArrowIcon={!disabled}
      />
      {typeof error == 'string' && <Text style={inputStyle.errorText}>{error}</Text>}
    </View>
  );
}
