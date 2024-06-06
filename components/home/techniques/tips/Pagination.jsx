import React from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '~/constants/theme';

export default function Pagination({ length, active }) {
  return (
    <View style={styles.container}>
      {Array.from(Array(length).keys()).map((i) => {
        return <View key={i} style={styles.single(active === i)} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SIZES.small,
    flex: 1,
    alignSelf: 'center',
    marginTop: SIZES.xSmall,
  },
  single: (active) => {
    return {
      padding: SIZES.xxSmall,
      backgroundColor: active ? COLORS.uiElementColors.text.primary : COLORS.gray2,
      borderRadius: SIZES.xxLarge,
    };
  },
});
