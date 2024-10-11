import { Ionicons } from '@expo/vector-icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

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
  type?: INPUT_TYPE.MULTI | INPUT_TYPE.EMAIL | INPUT_TYPE.PHONE;
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
  const isMulti = type === INPUT_TYPE.MULTI;
  const isEmail = type === INPUT_TYPE.EMAIL;
  const isPhone = type === INPUT_TYPE.PHONE;

  return (
    <View style={inputStyle.container}>
      {label && <Text style={inputStyle.label}>{label}</Text>}
      <View style={inputStyle.passContainer}>
        <TextInput
          // @ts-ignore
          style={inputStyle.input(error)}
          value={state}
          onChangeText={(value) => {
            setState(value, name);
          }}
          placeholder={placeholder}
          secureTextEntry={showPass}
          placeholderTextColor={COLORS.placeholder}
          // @ts-ignore
          keyboardType={isEmail || isPhone ? type : undefined}
          editable={!disabled}
          multiline={isMulti}
          numberOfLines={isMulti ? 4 : 1}
          maxLength={maxLength}
        />

        {!disabled && isPassword && (
          <TouchableOpacity
            onPress={() => {
              setShowPass(!showPass);
            }}>
            <Ionicons
              onPress={() => {
                setShowPass(!showPass);
              }}
              name={!showPass ? 'eye-off-outline' : 'eye-outline'}
              color={COLORS.black}
              size={SIZES.inputIcons * 1.2}
              style={[
                inputStyle.icon,
                {
                  marginHorizontal: -10,
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
      {typeof error == 'string' && <Text style={inputStyle.errorText}>{error}</Text>}
    </View>
  );
}
