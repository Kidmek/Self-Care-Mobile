import React from 'react';
import { View, Text } from 'react-native';

import { COLORS } from '~/constants/theme';

export default function Toast({ toast }) {
  return (
    <View
      style={[
        {
          paddingHorizontal: 20,
          paddingVertical: 12.5,
          borderRadius: 50,
          opacity: 0.85,
        },
        toast?.type === 'danger'
          ? { backgroundColor: 'red' }
          : toast?.type === 'success'
            ? { backgroundColor: 'green' }
            : toast?.type === 'warning'
              ? { backgroundColor: 'orange' }
              : { backgroundColor: 'black' },
      ]}>
      <Text style={{ color: COLORS.lightWhite }}>{toast.message}</Text>
    </View>
  );
}
