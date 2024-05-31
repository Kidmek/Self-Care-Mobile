import React from 'react';
import { View, TouchableOpacity, Pressable, Text } from 'react-native';

import buttonStyle from './button.style';

import { COLORS } from '~/constants/theme';

export default function CustomButton({ title, onPress, disabled, pressable, color, textColor }) {
  const inside = () => {
    return <Text style={{ ...buttonStyle.text, color: textColor ?? 'white' }}>{title}</Text>;
  };
  return (
    <View>
      {!pressable ? (
        <TouchableOpacity
          style={{ ...buttonStyle.button, backgroundColor: color ?? COLORS.primary }}
          onPress={onPress}
          disabled={disabled}>
          <Text style={buttonStyle.text}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Pressable
          style={{ ...buttonStyle.button, backgroundColor: color ?? COLORS.primary }}
          onPress={onPress}
          disabled={disabled}>
          {inside()}
        </Pressable>
      )}
    </View>
  );
}
