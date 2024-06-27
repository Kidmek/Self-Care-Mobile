import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

import inputStyle from './input.style';

import { INPUT_TYPE } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';
type Props = {
  label?: string;
  state?: string;
  setState: Dispatch<SetStateAction<string>> | ((v?: string, name?: string) => any);
  placeholder?: string;
  isPassword?: boolean;
  error?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  maxLength?: number;
};
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
  maxLength,
}: Props) {
  const [showPass, setShowPass] = useState(isPassword ?? false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isDate = () => {
    return type === INPUT_TYPE.DATE;
  };
  const isTime = () => {
    return type === INPUT_TYPE.TIME;
  };
  const isMulti = () => {
    return type === INPUT_TYPE.MULTI;
  };
  const isEmail = () => {
    return type === INPUT_TYPE.EMAIL;
  };
  const isPhone = () => {
    return type === INPUT_TYPE.PHONE;
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
              // @ts-ignore
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
            // @ts-ignore
            keyboardType={isEmail() || isPhone() ? type : undefined}
            editable={!disabled && !isDate() && !isTime()}
            multiline={isMulti()}
            numberOfLines={isMulti() ? 4 : 1}
            maxLength={maxLength}
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
