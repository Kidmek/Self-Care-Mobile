import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

import { SIZES } from '~/constants/theme';

type Params = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
};
export default function TabIcon({ name, color }: Params) {
  return (
    <View>
      <Ionicons name={name} color={color} size={SIZES.tabIcons} />
    </View>
  );
}
