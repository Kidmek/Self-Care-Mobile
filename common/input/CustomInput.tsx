import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  Pressable,
} from 'react-native';

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
  disabled,
}: any) {
  const [showPass, setShowPass] = useState(isPassword ?? false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isDate = () => {
    return type === INPUT_TYPE.DATE;
  };
  const isTime = () => {
    return type === INPUT_TYPE.TIME;
  };
  return (
    <View style={inputStyle.container}>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode={isDate() ? 'date' : 'time'}
          // is24Hour
          // dateFormat="longdate"
          onChange={(_, value) => {
            setShowDatePicker(false);
            setState(
              isDate()
                ? value?.toDateString()
                : value?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              name
            );
          }}
        />
      )}
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <View style={inputStyle.passContainer}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            if (isDate() || isTime()) {
              setShowDatePicker(true);
            }
          }}>
          <TextInput
            // @ts-ignore
            style={inputStyle.input(error)}
            value={state}
            onChangeText={(value) => setState(value, name)}
            placeholder={placeholder}
            secureTextEntry={showPass}
            placeholderTextColor={COLORS.placeholder}
            keyboardType={type}
            editable={!disabled && !isDate() && !isTime()}
            multiline={type === INPUT_TYPE.MULTI}
            numberOfLines={type === INPUT_TYPE.MULTI ? 4 : 1}
          />
        </Pressable>

        {!disabled && (isPassword || isTime() || isDate()) && (
          <TouchableOpacity
            onPress={() => {
              if (isDate() || isTime()) {
                console.log('first');

                setShowDatePicker(true);
              } else {
                setShowPass(!showPass);
              }
            }}>
            <Ionicons
              name={
                isDate()
                  ? 'calendar'
                  : isTime()
                    ? 'time'
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
