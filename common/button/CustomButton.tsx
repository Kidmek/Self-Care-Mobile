import React from 'react';
import { View, TouchableOpacity, Pressable, Text } from 'react-native';

import buttonStyle from './button.style';

import { COLORS } from '~/constants/theme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  pressable?: boolean;
  color?: string;
  textColor?: string;
};

export default function CustomButton({
  title,
  onPress,
  disabled,
  pressable,
  color,
  textColor,
}: Props) {
  const inside = () => {
    return <Text style={{ ...buttonStyle.text, color: textColor ?? 'white' }}>{title}</Text>;
  };
  const style = () => {
    return {
      ...buttonStyle.button,
      backgroundColor: disabled ? COLORS.gray : color ?? COLORS.primary,
    };
  };
  return (
    <View>
      {!pressable ? (
        <TouchableOpacity style={style()} onPress={onPress} disabled={disabled}>
          <Text style={buttonStyle.text}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Pressable style={style()} onPress={onPress} disabled={disabled}>
          {inside()}
        </Pressable>
      )}
    </View>
  );
}
