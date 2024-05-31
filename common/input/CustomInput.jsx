import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import inputStyle from './input.style';

import { INPUT_TYPE } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';
export default function CustomInput({
  label,
  state,
  setState,
  placeholder,
  isPassword,
  error,
  name,
  type,
}) {
  const [showPass, setShowPass] = useState(isPassword ?? false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <View style={inputStyle.container}>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          // is24Hour
          // dateFormat="longdate"
          onChange={(_, value) => {
            setShowDatePicker(false);
            setState(value.toDateString(), name);
          }}
        />
      )}
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <View style={inputStyle.passContainer}>
        <TextInput
          style={inputStyle.input(error)}
          value={state}
          onChangeText={(value) => setState(value.trim(), name)}
          placeholder={placeholder}
          secureTextEntry={showPass}
          placeholderTextColor={COLORS.placeholder}
          keyboardType={type}
          editable={type !== INPUT_TYPE.DATE}
        />
        {(isPassword || type === INPUT_TYPE.DATE) && (
          <TouchableOpacity
            onPress={() => {
              if (type === INPUT_TYPE.DATE) {
                console.log('first');

                setShowDatePicker(true);
              } else {
                setShowPass(!showPass);
              }
            }}>
            <Ionicons
              name={
                type === INPUT_TYPE.DATE
                  ? 'calendar'
                  : !showPass
                    ? 'eye-off-outline'
                    : 'eye-outline'
              }
              color={COLORS.black}
              size={SIZES.inputIcons}
              style={inputStyle.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {typeof error == 'string' && <Text style={inputStyle.errorText}>{error}</Text>}
    </View>
  );
}
