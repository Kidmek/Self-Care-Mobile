import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';

import inputStyle from './input.style';

import { INPUT_TYPE } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';
type Props = {
  label?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>> | ((v?: string, name?: string) => any);
  placeholder?: string;
  error?: string;
  name?: string;
  type: INPUT_TYPE.DATE | INPUT_TYPE.TIME;
  disabled?: boolean;
  maxLength?: number;
};
export default function CustomDateTimeInput({
  label,
  state,
  setState,
  placeholder,
  error,
  name,
  type,
  disabled,
  maxLength,
}: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const isDate = type === INPUT_TYPE.DATE;

  const handleManualInputChange = (value: string) => {
    if (value.length <= 10) {
      // Ensure only numbers and dashes can be entered
      let cleanValue = value.replace(/[^0-9-]/g, '');

      if (value.at(-1) === '-') {
        cleanValue = cleanValue.slice(0, -1);
      }
      // Auto-insert dashes while typing
      if (cleanValue.length > 4 && cleanValue[4] !== '-') {
        cleanValue = cleanValue.slice(0, 4) + '-' + cleanValue.slice(4);
      }
      if (cleanValue.length > 7 && cleanValue[7] !== '-') {
        cleanValue = cleanValue.slice(0, 7) + '-' + cleanValue.slice(7);
      }

      setState(cleanValue, name);
    }
  };
  return (
    <View style={inputStyle.container}>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode={isDate ? 'date' : 'time'}
          onChange={(_, value) => {
            if (!value) {
              return;
            }
            setShowDatePicker(false);
            setState(
              // @ts-ignore
              isDate
                ? value.toISOString()?.split('T')[0]
                : value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              name
            );
          }}
          maximumDate={isDate ? new Date() : undefined}
        />
      )}
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <View style={inputStyle.passContainer}>
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            if (!isDate) {
              setShowDatePicker(true);
            }
          }}>
          <TextInput
            // @ts-ignore
            style={inputStyle.input(error)}
            value={state}
            onChangeText={(value) => {
              if (isDate) {
                handleManualInputChange(value);
              } else {
                setState(value, name);
              }
            }}
            placeholder={placeholder}
            placeholderTextColor={COLORS.placeholder}
            // @ts-ignore
            keyboardType={isDate ? 'numeric' : undefined}
            editable={!disabled && isDate}
            maxLength={maxLength}
            selection={{ start: state.length, end: state?.length }}
          />
        </Pressable>

        {!disabled && (
          <TouchableOpacity
            onPress={() => {
              setShowDatePicker(true);
            }}>
            <Ionicons
              name={isDate ? 'calendar' : 'time'}
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
